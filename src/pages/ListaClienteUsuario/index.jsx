import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserInfo, ImageBack, ButtonVerde, ButtonVermelho } from "./defaultStyles"

//Self Components
import SearchField from '../../components/organisms/SearchField';

//Prime React Components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button';


// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiClient, apiPurchases } from '../../services/api';


function ListaClienteUsuario(){
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [modalContent, setModalContent] = useState();
    const [titleContent, setTitleContent] = useState();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({'cpf': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    console.log("#########")
    console.log(clients)
    console.log("#########")

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

    const excluir = (clientID) => {

        async function confirmDelete(){
            await apiClient.delete(`/client/delete/${clientID}`); 
            const clientUpdate = await apiClient.get("/client/query");
            setClients(clientUpdate.data)
        }
        confirmDelete()
        setModalContent('')
        setTitleContent('')
        window.alert("Exclusão realizada")

        setVisible(false)
    }

    const showModal = (event) =>{

        const Client = event.rowData
        
        if (event.field == "delete"){
            let titleContent = 
                <Title height='2rem'>
                    Tem certeza que deseja excluir {Client.fullName} ?
                </Title>;
            setTitleContent(titleContent)
            let contentToModal = 
                <ContainerUserInfo>
                    <div>
                        <ButtonVerde onClick={() => {excluir(Client.id)}}>Confirmar</ButtonVerde>
                    </div>
                    <div>
                        <ButtonVermelho>Cancelar</ButtonVermelho>
                    </div>
                </ContainerUserInfo>;
            setModalContent(contentToModal)
        } else if (event.field == "update"){
            let titleContent = 
                <Title height='2rem' color="#696969">
                    Informações de {Client.fullName}
                </Title>;
            setTitleContent(titleContent)
            let contentToModal = 
                    <Column 
                        field="id" 
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Parcela" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
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
                    onHide={() => {setVisible(false);setModalContent('');setTitleContent('')}} 
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