import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title } from "./defaultStyles"

//Self Components
import SearchField from '../../components/organisms/SearchField';

//Prime React Components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'


//API's
import { apiClient, apiPurchases } from '../../services/api';


function ListagemVendas(){
    const [loading, setLoading] = useState(true);
    const [ purchases, setPurchases] = useState([]);
    const [ clients, setClients] = useState([]);
    const [ dataToTable, setDataToTable]  = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);
    const [modal, setModal] = useState();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({cpf: { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    

    useEffect(() => {
        async function loadData() {
            // const clientResponse = await apiClient.get("/client/query");
            const purchasesResponse = await apiPurchases.get(`/api/purchases`);
            setPurchases(purchasesResponse.data);
            // setClients(clientResponse.data);
        }
        
        loadData();
        console.log(purchases)
        setLoading(false);

    }, []);

    const isCellSelectable = (event) => (event.data.field === 'quantity' || event.data.field === 'category' ? false : true);
    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['cpf'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    //continuar função
    const showModal = (event) =>{
            setVisible(true)
            setModal()



        // setModal(event.value)
        // setVisible(true)
    };
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Listagem de Vendas</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um CPF'/>
                {loading && <ProgressSpinner/>}
                {!loading && 
                    <DataTable
                        value={dataToTable} 
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                        cellSelection selectionMode="single"
                        onCellSelect={showModal}
                        isDataSelectable={isCellSelectable}
                        filters={filters}
                        emptyMessage='Sem informações'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                    >
                        <Column 
                            field="purchaseID" 
                            body="Clique Aqui" 
                            align="center" 
                            header="Ver mais" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="clientCpf" 
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="purchaseValue" 
                            align="center" 
                            header="Valor Total" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="installmentsQuantity" 
                            align="center" 
                            header="Parcelas" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                    </DataTable>
                }
                <Dialog visible={visible} onHide={() => setVisible(false)}><Title>Informações de venda</Title></Dialog>
            </Container>
        </>
    )

}

export default ListagemVendas;