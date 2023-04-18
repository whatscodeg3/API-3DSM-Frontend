import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserDelete, ContainerUserUpdate, InputField, InputFieldMask, StyledInput, ImageBack, ButtonVerde, ButtonVermelho } from "./defaultStyles"

//Self Components
import SearchField from '../../components/organisms/SearchField';

//Prime React Components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'

// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiClient, apiPurchases } from '../../services/api';

const ListaClienteUsuario: React.FC = () => {
    const { register, handleSubmit, setValue, setFocus} = useForm();
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [titleContent, setTitleContent] = useState<JSX.Element>();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({'cpf': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    ////////////////////////////////////////////// Codigo ddo filto da tabela e isCell pra bloquear poder clicar nos lugares que nao deve

    useEffect(() => {
        async function loadData() {
            const clientResponse = await apiClient.get("/client/query");
            //const purchasesResponse = await apiPurchases.get(`/api/purchases`);
            //setPurchases(purchasesResponse.data);
            setClients(clientResponse.data);
        }
        loadData(); 
        setLoading(false);
    }, []);
    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        
        let _filters = { ...filters };

        _filters['cpf'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event) => (event.data.field === 'cpf' || event.data.field === 'fullName' || event.data.field === 'email' || event.data.field === 'telephone' ? false : true);

    //////////////////////////////////////////////

    ////////////////////////////////////////////// Função chamada para excluir

    const excluir = (clientID: any) => {

        async function confirmDelete(){
            await apiClient.delete(`/client/delete/${clientID}`); 
            const clientUpdate = await apiClient.get("/client/query");
            setClients(clientUpdate.data)
        }
        confirmDelete()
        setModalContent(<></>)
        setTitleContent(<></>)
        window.alert("Exclusão realizada")

        setVisible(false)
    }

    //////////////////////////////////////////////

    const onSubmit = async (value: any) => {
        let formatJson = {
          fullName: value["fullName"],
          email: value["email"],
          telephone: value["telephone"],
          birthDate: value["birthDate"],
          address: {
            id: value["addressId"],
            cep: value["cep"],
            publicPlace: value["publicPlace"] + " " + value["numero"],
            neighborhood: value["neighborhood"],
            city: value["city"],
            state: value["state"],
            complement: value["complement"],
          },
        }
        const Id = value["clientId"]
        const response = await apiClient.get("/client/query")

        let valido = true

        try{
            if(valido == true){
              await apiClient.put(`/client/update/${Id}`, formatJson)
              window.alert("Atualizado com Sucesso!")
            }
        } catch(error) {
          if(error.response.data["cpf"] == undefined){
            window.alert("Email Inválido !")
          }else{
            window.alert("Cpf Inválido !")
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

    const showModal = (event: any) =>{

        const Client = event.rowData

        if (event.field == "delete"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem' color="#696969">
                    Tem certeza que deseja excluir {Client.fullName} ?
                </Title>
            );
            setTitleContent(titleContent);

            let contentToModal: JSX.Element = (
                <ContainerUserDelete>
                    <div>
                        <ButtonVerde onClick={() => {excluir(Client.id)}}>Confirmar</ButtonVerde>
                    </div>
                    <div>
                        <ButtonVermelho>Cancelar</ButtonVermelho>
                    </div>
                </ContainerUserDelete>
            );
            setModalContent(contentToModal)

        } else if (event.field == "update"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem'>
                    Informações de {Client.fullName}
                </Title>
            );
            setTitleContent(titleContent)

            let contentToModal: JSX.Element = ( 
                <ContainerUserUpdate>
                    <StyledInput>
                        <InputField style={{ width: '400px' }} name="fullname" placeholder="Nome Completo" {...register("fullName")}/>
                        <InputField style={{ width: '400px' }} name="email" placeholder="Email" {...register("email")}/>
                        <InputField style={{ width: '400px' }} name="telephone" placeholder="Telefone" {...register("telephone")}/>
                        <InputField style={{ width: '400px' }} type="date" name="birthDate" placeholder="Data de Nascimento" {...register("birthDate")}/>
                        <InputFieldMask style={{ width: '400px' }} mask="99999-999" name="cep" placeholder="CEP" {...register("cep")} onBlur={checkCEP}/>
                    </StyledInput>
                    <div>
                    </div>
                    <StyledInput>
                        <InputField style={{ width: '400px' }} name="publicPlace" placeholder="Logradouro(rua, avenida, ...)" {...register("publicPlace")}/>
                        <InputField style={{ width: '400px' }} name="state" placeholder="Estado" {...register("state")}/>
                        <InputField style={{ width: '400px' }} name="neighborhood" placeholder="Bairro" {...register("neighborhood")}/>
                        <InputField style={{ width: '400px' }} name="city" placeholder="Cidade" {...register("city")}/>
                        <InputField style={{ width: '400px' }} name="numero" placeholder="Número *" {...register("numero")}/>
                        <InputField style={{ width: '400px' }} name="complement" placeholder="Complemento" {...register("complement")}/>
                    </StyledInput>
                    <input type="hidden" name="clientId" value={Client.id} {...register("clientId")} />
                    <input type="hidden" name="address" value={Client.address.id} {...register("addressId")} />
                    <button type="submit" onClick={handleSubmit(onSubmit)}>Cadastrar</button>
                </ContainerUserUpdate>
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
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um CPF'/>
                {loading && <ProgressSpinner/>}
                {!loading && 
                    <DataTable
                        value={clients}
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
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
                            header="Nome Completo" 
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
                <Link to={"/"} style={{ textDecoration: "none" }}>
					<ImageBack src={IconBack} alt="IconBack" />
				</Link>
            </Container>
        </>
    )

}

export default ListaClienteUsuario;