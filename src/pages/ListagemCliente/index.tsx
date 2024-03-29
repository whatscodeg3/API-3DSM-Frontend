import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserDelete, ContainerUserUpdate, ContainerUserInfo, InputField, InputFieldMask, StyledInput, ImageBack, ButtonVerde, ButtonVermelho, ButtonSubmit } from "./defaultStyles"

//Self Components
import SearchField from '../../components/organisms/SearchField';

//Prime React Components
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'

// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiClient, apiPurchases } from '../../services/api';
import ToastProps from "../../interfaces/selfInterfaces";

const ListaCliente: React.FC<ToastProps> = (props) => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");
    const { register, handleSubmit, setValue, setFocus} = useForm();
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [titleContent, setTitleContent] = useState<JSX.Element>();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>({'fullName': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    ////////////////////////////////////////////// Codigo do filto da tabela e isCell pra bloquear poder clicar nos lugares que nao deve
    useEffect(() => {


        async function loadData() {
            const clientResponse = await apiClient.get("/client/query", {
                headers: {
                    Authorization: `Bearer ${tokenClient}`
                },
            });

            //const purchasesResponse = await apiPurchases.get(`/api/purchases`);
            //setPurchases(purchasesResponse.data);
            setClients(clientResponse.data);
        }
        loadData(); 
        setLoading(false);
    }, []);
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
   
        
        let _filters: any = { ...filters };

        _filters['fullName'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event) => (event.data.field === 'cpf' || event.data.field === 'fullName' || event.data.field === 'email' || event.data.field === 'telephone' ? false : true);

    //////////////////////////////////////////////

    ////////////////////////////////////////////// Função chamada para excluir

    const excluir = (clientID: any) => {

        async function confirmDelete(){
            await apiClient.delete(`/client/delete/${clientID}`, {
                headers: {
                    Authorization: `Bearer ${tokenClient}`,
                },
            }); 
            const clientUpdate = await apiClient.get("/client/query", {
                headers: {
                    Authorization: `Bearer ${tokenClient}`,
                },
            });
            setClients(clientUpdate.data)
        }
        confirmDelete()
        setModalContent(<></>)
        setTitleContent(<></>)
        props.toastContent({severity:'success', summary: 'Sucesso', detail: 'Cliente deletado com sucesso!', life: 3000})

        setVisible(false)
    }

    //////////////////////////////////////////////

     ////////////////////////////////////////////// Função que faz o Update e traz o endereço baseado no Cep

    const onSubmit = async (value: any) => {
        let formatJson = {
          fullName: value["fullName"],
          email: value["email"],
          telephone: value["telephone"],
          birthDate: value["birthDate"],
          address: {
            id: value["addressId"],
            cep: value["cep"],
            publicPlace: value["publicPlace"],
            number: value["numero"],
            neighborhood: value["neighborhood"],
            city: value["city"],
            state: value["state"],
            complement: value["complement"],
          },
        }
        const Id = value["clientId"]
        let valido = true

        try{
            if(valido == true){
                await apiClient.put(`/client/update/${Id}`, formatJson,{
                    headers: {
                        Authorization: `Bearer ${tokenClient}`,
                    },
                })
                props.toastContent({severity:'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso!', life: 3000})
                setModalContent(<></>)
                setTitleContent(<></>)
                setVisible(false)
                location.reload()
            }
        } catch(error) {
            if(error.response.data["cpf"] == undefined) {
                    props.toastContent({severity:'error', summary: 'Erro', detail: 'Email inválido!', life: 3000});
                } else if (error.response.data["email"] == undefined) {
                    props.toastContent({severity:'error', summary: 'Erro', detail: 'CPF inválido!', life: 3000});
                }
        }
    }

    const checkCEP = (value:any) => {
        const cep = value.target.value.replace(/\D/g, "");
        fetch(`http://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setValue("publicPlace", data.logradouro);
          setValue("state", data.uf);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setFocus("numero");
        });
    };

     //////////////////////////////////////////////

    ////////////////////////////////////////////// Codigo do modal que aparece ao selecionar um campo, com os if e codigo dentro deles, determinando o que aparece em cada campo selecionado

    const showModal = (event: any) =>{
        const Client = event.rowData

         if (event.field == "update"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem'>
                    Informações de {Client.fullName}
                </Title>
            );
            setTitleContent(titleContent)

            let contentToModal: JSX.Element = ( 
                <ContainerUserUpdate onSubmit={handleSubmit(onSubmit)}>
                    <StyledInput>
                        <InputField style={{ width: '400px' }} id="myInput" name="fullname" placeholder={`Nome completo: ${Client.fullName}`}{...register("fullName")}/>
                        <InputField style={{ width: '400px' }} name="email" placeholder={`Email: ${Client.email}`} {...register("email")}/>
                        <InputField style={{ width: '400px' }} name="telephone" placeholder={`Telefone: ${Client.telephone}`} {...register("telephone")}/>
                        <InputField style={{ width: '400px' }} type="date" name="birthDate" defaultValue={Client.birthDate} {...register("birthDate")}/>
                        <InputFieldMask style={{ width: '400px' }} mask="99999-999" name="cep" placeholder={`Cep: ${Client.address.cep}`} {...register("cep")} onBlur={checkCEP}/>
                        <InputField style={{ width: '400px' }} name="publicPlace" placeholder={`Logradouro: ${Client.address.publicPlace}`} {...register("publicPlace")}/>
                    </StyledInput>
                    <div>
                    </div>
                    <StyledInput>
                        <InputField style={{ width: '400px' }} name="state" placeholder={`Estado: ${Client.address.state}`}  {...register("state")}/>
                        <InputField style={{ width: '400px' }} name="neighborhood" placeholder={`Bairro: ${Client.address.neighborhood}`}  {...register("neighborhood")}/>
                        <InputField style={{ width: '400px' }} name="city" placeholder={`Cidade: ${Client.address.city}`}  {...register("city")}/>
                        <InputField style={{ width: '400px' }} name="numero" placeholder="Número *" {...register("numero")}/>
                        <InputField style={{ width: '400px' }} name="complement" placeholder={`Complemento: ${Client.address.complement}`} {...register("complement")}/>
                        <input type="hidden" name="clientId" value={Client.id} {...register("clientId")} />
                        <input type="hidden" name="address" value={Client.address.id} {...register("addressId")} />
                        <ButtonSubmit type="submit">Atualizar</ButtonSubmit>
                    </StyledInput>
                </ContainerUserUpdate>
            )
            setModalContent(contentToModal)

        } else if (event.field == "delete"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem' color="#696969">
                    Deseja excluir {Client.fullName} ?
                </Title>
            );
            setTitleContent(titleContent);

            let contentToModal: JSX.Element = (
                <ContainerUserDelete>
                    <div>
                        <ButtonVerde onClick={() => {excluir(Client.id)}}>Sim</ButtonVerde>
                    </div>
                    <div>
                        <ButtonVermelho>Não</ButtonVermelho>
                    </div>
                </ContainerUserDelete>
            );
            setModalContent(contentToModal)

        } else if (event.field == "address"){

        let titleContent: JSX.Element = ( 
            <Title height='2rem'>
                Informações de {Client.fullName}
            </Title>
        );
        setTitleContent(titleContent)

        let contentToModal: JSX.Element = ( 
            <ContainerUserInfo>
                    <div>
                        <label>Cep</label>
                        <input type="text" value={Client.address.cep} disabled />
                    </div>
                    <div>
                        <label>Logradouro</label>
                        <input type="text" value={Client.address.publicPlace} disabled />
                    </div>
                    <div>
                        <label>Estado</label>
                        <input type="text" value={Client.address.state} disabled />
                    </div>
                    <div>
                        <label>Bairro</label>
                        <input type="text" value={Client.address.neighborhood} disabled />
                    </div>
                    <div>
                        <label>Cidade</label>
                        <input type="text" value={Client.address.city} disabled />
                    </div>
                    <div>
                        <label>Complemento</label>
                        <input type="text" value={Client.address.complement} disabled />
                    </div>
                </ContainerUserInfo>
        )
        setModalContent(contentToModal)
        }
    setVisible(true)

    };
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Listagem de Clientes</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um Nome'/>
                {loading && <ProgressSpinner/>}
                {!loading && 
                    <DataTable
                        value={clients}
                        paginator rows={25} rowsPerPageOptions={[25, 50, 100]} 
                        cellSelection 
                        selectionMode="single"
                        onCellSelect={showModal}
                        isDataSelectable={isCellSelectable}
                        filters={filters}
                        emptyMessage='Sem informações'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                    >
                        <Column 
                            field="cpf"
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="fullName"
                            align="center" 
                            header="Nome"
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="email"
                            align="center" 
                            header="Email" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="telephone"
                            align="center" 
                            header="Telefone" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="address"
                            body="Endereço"
                            align="center" 
                            header="Endereço" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="update"
                            body="Editar" 
                            align="center" 
                            header="Edição" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="delete"
                            body="Excluir" 
                            align="center" 
                            header="Exclusão" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                    </DataTable>
                }
                <Dialog 
                    visible={visible} 
                    onHide={() => {setVisible(false);setModalContent(<></>);setTitleContent(<></>)}} 
                    style={{ minWidth: '50vw' }}
                    header={titleContent}
                    headerStyle={{textAlign:"center"}}
                    closeOnEscape={true}
                >
                    <hr/>
                    {modalContent}
                </Dialog>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
					<ImageBack src={IconBack} alt="IconBack" />
				</Link>
            </Container>
        </>
    )

}

export default ListaCliente;