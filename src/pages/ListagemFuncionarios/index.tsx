import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserDelete, ContainerUserUpdate, ContainerUserInfo, InputField, InputFieldMask, StyledInput, ImageBack, ButtonVerde, ButtonVermelho, ButtonSubmit, Select } from "./defaultStyles"

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

const ListaFuncionarios: React.FC<ToastProps> = (props) => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");
    const { register, handleSubmit, setValue, setFocus} = useForm();
    const [loading, setLoading] = useState(true);
    const [funcs, setFuncs] = useState([]);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [titleContent, setTitleContent] = useState<JSX.Element>();
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(true);
    const [permissao, setPermissao] = useState();
    const [tempPerm, setTempPerm] = useState();
    const [filters, setFilters] = useState<DataTableFilterMeta>({'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    ////////////////////////////////////////////// Codigo do filto da tabela e isCell pra bloquear poder clicar nos lugares que nao deve
    useEffect(() => {


        async function loadData() {
            const employeeResponse = await apiClient.get("/employee", {
                headers: {
                    Authorization: `Bearer ${tokenClient}`
                },
            });
            setFuncs(employeeResponse.data);
        }
        loadData(); 
        setLoading(false);
    }, []);
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
   
        
        let _filters: any = { ...filters };
        _filters['name'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event) => (event.data.field === 'cpf' || event.data.field === 'name' || event.data.field === 'email' ? false : true);


    //////////////////////////////////////////////

    ////////////////////////////////////////////// Função chamada para excluir

    const excluir = (funcId: any) => {

        async function confirmDelete(){
            await apiClient.delete(`/employee/${funcId}`, {
                headers: {
                    Authorization: `Bearer ${tokenClient}`,
                },
            }); 
            const employeesUpdate = await apiClient.get("/employee", {
                headers: {
                    Authorization: `Bearer ${tokenClient}`,
                },
            });
            setFuncs(employeesUpdate.data)
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

        if(value['role'] == 'Selecionar Permissão'){
            props.toastContent({severity:'error', summary: 'Falha!', detail: 'Selecione uma permissão valida!', life: 3000})
        
        } else { 
            let format_json = {
                role: value['role']
            }
            const Id = value["id"]
    
            let valido = true
            try{
                if(valido == true){
                    // tem q ser patch pra só alterar oq eu quiser
                    await apiClient.put(`/employee/replacement/${Id}`, format_json,{
                        headers: {
                            Authorization: `Bearer ${tokenClient}`,
                        },
                    })
                    props.toastContent({severity:'success', summary: 'Sucesso', detail: 'Funcionário atualizado com sucesso!', life: 3000})
                    setModalContent(<></>)
                    setTitleContent(<></>)
                    setVisible(false)
                    location.reload()
                }
            } catch(error) {
                props.toastContent({severity:'error', summary: 'Falha!', detail: 'Erro ao atualizar o funcionário!', life: 3000})
            }

        }
       
    }


    ////////////////////////////////////////////// Codigo do modal que aparece ao selecionar um campo, com os if e codigo dentro deles, determinando o que aparece em cada campo selecionado

    const showModal = (event: any) =>{
        const Employee = event.rowData

         if (event.field == "update"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem'>
                    Permissões de {Employee.name}
                </Title>
            );
            setTitleContent(titleContent)

            let contentToModal: JSX.Element = ( 
                <ContainerUserUpdate onSubmit={handleSubmit(onSubmit)}>   

                    <StyledInput>
                        <Select name='role' required {...register("role")}>
                            <option>Selecionar Permissão</option>
                            <option value={"Comercial"}>Comercial</option>
                            <option value={"Financeiro"}>Financeiro</option>
                            <option value={"Administrador"}>Administrador</option>
                        </Select>
                       
                        <input type="hidden" name="id" value={Employee.id} {...register("id")} />
                        <ButtonSubmit type="submit">Atualizar</ButtonSubmit>
                    </StyledInput>
                    
                </ContainerUserUpdate>
            )
    
            setModalContent(contentToModal)

        } else if (event.field == "delete"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem' color="#696969">
                    Deseja excluir {Employee.name} ?
                </Title>
            );
            setTitleContent(titleContent);

            let contentToModal: JSX.Element = (
                <ContainerUserDelete>
                    <div>
                        <ButtonVerde onClick={() => {excluir(Employee.id)}}>Sim</ButtonVerde>
                    </div>
                    <div>
                        <ButtonVermelho onClick={() => {
                            setModalContent(<></>)
                            setTitleContent(<></>)
                            setVisible(false)
                        }}>Não</ButtonVermelho>
                    </div>
                </ContainerUserDelete>
            );
            setModalContent(contentToModal)

        }
    setVisible(true)

    };
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Controle de Funcionários</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um Nome'/>
                {loading && <ProgressSpinner/>}
                {!loading && 
                    <DataTable
                        value={funcs}
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
                            field="name"
                            align="center" 
                            header="Nome"
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="cpf"
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="email"
                            align="center" 
                            header="Email" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="update"
                            body="Editar" 
                            align="center" 
                            header="Editar Permissões" 
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

export default ListaFuncionarios;