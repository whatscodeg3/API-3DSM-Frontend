import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Link } from "react-router-dom";
import { renderToString } from "react-dom/server";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserInfo, ImageBack } from "./defaultStyles"

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


const ListagemVendas: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [ purchases, setPurchases] = useState([]);
    const [ clients, setClients] = useState([]);
    const [installmentsPayed, setInstallmentsPayed] = useState(null);
    const [modalContent, setModalContent] = useState<string>();
    const [titleContent, setTitleContent] = useState<string>();
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
    const priceBodyTemplate = (event) => {
        if(event.paymentValue){
            return formatCurrency(event.paymentValue)
        }else if(event.installmentValue){
            return formatCurrency(event.installmentValue)

        }
        
    };
    const checkInstallmentAsPayed = (installmentId) => {
        const decision = window.confirm("Deseja confirmar o pagamento desta parcela?")
        
        if(decision){
            async function confirmPayment(){
                await apiPurchases.patch(`/api/installments/${installmentId}`); 
                const purchasesUpdated = await apiPurchases.get(`/api/purchases`)
                setPurchases(purchasesUpdated.data)
            }
            confirmPayment()
            setModalContent('')
            setTitleContent('')
            window.alert("Pagamento da parcela confirmado")
        }else{
            window.alert("Confirmação do pagamento cancelada")
        }
        setVisible(false)
    }
    
    const installmentCheck = (event) =>{
        return event.isInstallmentPayed ?  
            "Parcela paga" : 
            <Button label="Confirmar" severity="success"  onClick={() => {checkInstallmentAsPayed(event.id)}}/>
    }


    const showModal = (event) =>{
        let installmentsFromEvent = event.props.rowData.installment
        let contentFormated = installmentsFromEvent.map((installment, i) => {
            let installmentDueDate = installment.installmentDueDate.split("-")
            let paymentDate = installment.paymentDate == null? installment.paymentDate : installment.installmentDueDate.split("-")
            return {
                id: installment.id,
                installmentNumber: i + 1,
                installmentDueDate: `${installmentDueDate[2]}/${installmentDueDate[1]}/${installmentDueDate[0]}`,
                paymentDate: paymentDate == null?  '' :`${paymentDate[2]}/${paymentDate[1]}/${paymentDate[0]}`,
                installmentValue: installment.installmentValue,
                isInstallmentPayed: installment.isInstallmentPayed 
            }
        })
        
        if (event.field == "id"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem' color="#696969">
                    Informações de Venda
                </Title>
            );
            const titleContentString = renderToString(titleContent);
            setTitleContent(titleContentString);
            let contentToModal: JSX.Element = (
                <DataTable 
                    value={contentFormated}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column 
                        field="installmentNumber" 
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Parcela" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    <Column 
                        field="installmentDueDate"
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Data de Vencimento" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    <Column 
                        field="paymentDate"
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Data de Pagamento" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    {/* <Column 
                        field="installmentValue"
                        body={priceBodyTemplate} 
                        align="center"
                        bodyStyle={{color:"#F18524" }}
                        header="Valor da Parcela" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    <Column 
                        field="isInstallmentPayed"
                        body=""
                        bodyStyle={{color:"#F18524"}}
                        dataType="date"  
                        align="center" 
                        header="Status" 
                        headerStyle={{color:'#696969'}}>
                    </Column> */}
                    <Column
                        body={installmentCheck}
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Confirmar pagamento"
                        headerStyle={{color:'#696969'}}>
                        
                    </Column>
                </DataTable>
            );
            const contentToModalString = renderToString(contentToModal);
            setModalContent(contentToModalString)

        } else if (event.field == "client.cpf"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem'>
                    Informações de Cliente
                </Title>
            );
            const titleContentString = renderToString(titleContent);
            setTitleContent(titleContentString)

            let contentToModal: JSX.Element = ( 
                <ContainerUserInfo>
                    <div>
                        <label>Nome</label>
                        <input type="text" value={event.props.rowData.client["fullName"]} disabled />
                    </div>
                    <div>
                        <label>CPF</label>
                        <input type="text" value={event.props.rowData.client["cpf"]} disabled />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" value={event.props.rowData.client["email"]} disabled />
                    </div>
                    <div>
                        <label>Telefone</label>
                        <input type="text" value={event.props.rowData.client["telephone"]} disabled />
                    </div>
                    <div>
                        <label>Data Nasc.</label>
                        <input type="text" value={event.props.rowData.client["birthDate"]} disabled />
                    </div>
                </ContainerUserInfo>
            );
            const contentToModalString = renderToString(contentToModal);
            setModalContent(contentToModalString)
        }
        setVisible(true)

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
                        onCellSelect={showModal}
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

export default ListagemVendas;