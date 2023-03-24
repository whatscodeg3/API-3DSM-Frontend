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
    const [selectedCell, setSelectedCell] = useState(null);
    const [contentToModal, setContent] = useState();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({cpf: { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    

    useEffect(() => {
        async function loadData() {
            const clientResponse = await apiClient.get("/client/query");
            const purchasesResponse = await apiPurchases.get(`/api/purchases/${1}`);
            setPurchases(purchasesResponse.data);
            setClients(clientResponse.data);
        }
        loadData();
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
        setContent(event.value)
        setVisible(true)
    }
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title>Listagem de Vendas</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um CPF'/>
                    {loading && <ProgressSpinner/>}
                    {!loading && <DataTable
                        value={purchases} 
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                        cellSelection selectionMode="single"
                        onCellSelect={showModal}
                        isDataSelectable={isCellSelectable}
                        filters={filters}
                        emptyMessage='No found.'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                    >
                        <Column 
                            field="" 
                            body="Clique Aqui" 
                            align="center" 
                            header="Ver mais" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="cpf" 
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="payment_value" 
                            align="center" 
                            header="Valor Total" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="" 
                            align="center" 
                            header="Parcelas" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                    </DataTable>}
                    <Dialog 
                        visible={visible}
                        onHide={() => setVisible(false)}
                    >
                        <p>{contentToModal}</p>
                    </Dialog>
            </Container>
        </>
    )

}

export default ListagemVendas;