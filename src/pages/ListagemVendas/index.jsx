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
    const [modalContent, setModalContent] = useState();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({'client.cpf': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    
    useEffect(() => {
        async function loadData() {
            // const clientResponse = await apiClient.get("/client/query");
            const purchasesResponse = await apiPurchases.get(`/api/purchases`);
            setPurchases(purchasesResponse.data);
            // setClients(clientResponse.data);
        }
        loadData(); 
        setLoading(false);
    }, []);
    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        
        let _filters = { ...filters };

        _filters['client.cpf'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event) => (event.data.field === 'paymentValue' || event.data.field === 'installment.length' ? false : true);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    const priceBodyTemplate = (purchases) => {
        return formatCurrency(purchases.paymentValue);
    };
    
    function formatField(event){
        let kk =  event.value.toLocaleString()
    
        return kk

    }


    //continuar função
    const showModal = (event) =>{
        setVisible(true)
        let installmentsFromEvent = event.props.rowData.installment
        let content = installmentsFromEvent.map((installment) => {
            return {
                    id: installment.id, paymentDate: installment.paymentDate.toLocaleString(), installmentValue: installment.installmentValue, isInstallmentPayed: false
                    }
        })
        if (event.field == "id"){
            content = 
                <DataTable 
                    value={event.props.rowData.installment}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="" align="center" header="Parcela" headerStyle={{color:'#F18524'}}></Column>
                    <Column field="paymentDate" dataType="date"  align="center" header="Data de Vencimento" headerStyle={{color:'#F18524'}}></Column>
                    <Column field="category" body="" align="center" header="Data de Pagamento" headerStyle={{color:'#F18524'}}></Column>
                </DataTable>;

        }
    

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
                        value={purchases}
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                        cellSelection 
                        selectionMode="single"
                        onCellClick={showModal}
                        isDataSelectable={isCellSelectable}
                        filters={filters}
                        emptyMessage='Sem informações'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                    >
                        <Column 
                            field="id"
                            body="Clique Aqui" 
                            align="center" 
                            header="Ver mais" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="client.cpf"
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="paymentValue"
                            body={priceBodyTemplate}
                            align="center" 
                            header="Valor Total" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="installment.length"
                            align="center" 
                            header="Parcelas" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                    </DataTable>
                }
                <Dialog 
                    visible={visible} 
                    onHide={() => {setVisible(false);setModalContent('')}} 
                    style={{ minWidth: '50vw' }}
                    header={<Title height='2rem'>Informações de venda</Title>}
                    headerStyle={{textAlign:"center"}}
                    closeOnEscape={true}
                >
                    <hr/>
                    {modalContent}
                </Dialog>
            </Container>
        </>
    )

}

export default ListagemVendas;