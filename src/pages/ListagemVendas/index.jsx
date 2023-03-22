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


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";  
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  



function ListagemVendas(){
    const [ products, setProducts] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);
    const [contentToModal, setContent] = useState();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState({cpf: { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        setProducts(data);
    }, []);

    const data = [
        {
            code: 1,
            cpf: "haha",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 2,
            cpf: "kkk",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 3,
            cpf: "ll",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 1,
            cpf: "haha",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 2,
            cpf: "kkk",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 3,
            cpf: "ll",
            category: "jjjj",
            quantity: 5
        },        {
            code: 1,
            cpf: "haha",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 2,
            cpf: "kkk",
            category: "jjjj",
            quantity: 5
        },
        {
            code: 3,
            cpf: "ll3", 
            category: "jjjj",
            quantity: 5
        }
    ]

    const isCellSelectable = (event) => (event.data.field === 'quantity' || event.data.field === 'category' ? false : true);
    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['cpf'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const showModal = (event) =>{
        setContent(event.value)
        setVisible(true)
    }
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title>Listagem de Vendas</Title>
                <SearchField  value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Digite um CPF'/>
                    <DataTable
                        value={products} 
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                        cellSelection selectionMode="single"
                        onCellSelect={showModal}
                        isDataSelectable={isCellSelectable}
                        filters={filters}
                        emptyMessage='No found.'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                    >
                        <Column field="code" header="Ver mais" headerStyle={{color:'#F18524'}}></Column>
                        <Column field="cpf" header="CPF" headerStyle={{color:'#F18524'}}></Column>
                        <Column field="category" header="Valor Total" headerStyle={{color:'#F18524'}}></Column>
                        <Column field="quantity" header="Parcelas" headerStyle={{color:'#F18524'}}></Column>
                    </DataTable>
                    <Dialog 
                        visible={visible}
                        onHide={() => setVisible(false)}

                    ><p>{contentToModal}</p></Dialog>
            </Container>
        </>
    )

}

export default ListagemVendas;