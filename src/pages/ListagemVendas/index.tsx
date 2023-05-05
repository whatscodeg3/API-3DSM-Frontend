import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserInfo, ImageBack } from "./defaultStyles"

//Self Components
import SearchField from '../../components/organisms/SearchField';

//Prime React Components
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button';


// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiClient, apiPurchases } from '../../services/api';


const ListagemVendas: React.FC = () => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [titleContent, setTitleContent] = useState<JSX.Element>();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    
    useEffect(() => {
        async function loadData() {
            // const clientResponse = await apiClient.get("/client/query");
            const purchasesResponse = await apiPurchases.get(`/api/purchases`, {
                headers: {
                    Authorization: `Bearer ${tokenPurchases}`,
                },
            });
            setPurchases(purchasesResponse.data);
            setLoading(false);
            // setClients(clientResponse.data);
        }
        loadData(); 
        
    }, []);
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
   
        
        let _filters: any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event: any) => (
        event.data.field === 'paymentValue' || 
        event.data.field === 'installment.length' ||
        event.data.field === 'client.cpf'

        ? false : true
    );

    const formatCurrency = (value: any) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    const priceBodyTemplate = (event: any) => {
        if(event.paymentValue){
            return formatCurrency(event.paymentValue)
        }else if(event.installmentValue){
            return formatCurrency(event.installmentValue)

        }
        
    };

    const cpfBodyTemplate  = (event: any) =>{
        const cpf = event.client.cpf
        return `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}-${cpf.slice(9)}`
    }

    const checkInstallmentAsPayed = (installmentId: any) => {
        const decision = window.confirm("Deseja confirmar o pagamento desta parcela?")
        if(decision){
            const today = new Date();
            const day = today.getDate();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;

            async function confirmPayment(){
                await apiPurchases.patch(`/api/installments/${installmentId}`,{'paymentDate': formattedDate, 'daysToCredit': 3}, {
                    headers: {
                        Authorization: `Bearer ${tokenPurchases}`,
                    },
                }); 
                const purchasesUpdated = await apiPurchases.get(`/api/purchases`, {
                    headers: {
                        Authorization: `Bearer ${tokenPurchases}`,
                    },
                })
                setPurchases(purchasesUpdated.data)
            }
            confirmPayment()
            setModalContent(<></>)
            setTitleContent(<></>)
            window.alert("Pagamento da parcela confirmado")
        }else{
            window.alert("Confirmação do pagamento cancelada")
        }
        setVisible(false)
    }
    
    const installmentCheck = (event: any) =>{
        return event.isInstallmentPayed ?  
            "Parcela paga" : 
            <Button label="Confirmar" severity="success"  onClick={() => {checkInstallmentAsPayed(event.id)}}/>
    }


    const showModal = (event: any) =>{
        let installmentsFromEvent = event.rowData.installment
        let contentFormated = installmentsFromEvent.map((installment: any, i: number) => {
            let installmentDueDate = installment.installmentDueDate.split("-")
            let paymentDate = installment.paymentDate == null? installment.paymentDate : installment.paymentDate.split("-")
            let creditDate = installment.creditDate == null? installment.creditDate : installment.creditDate.split("-")
            return {
                id: installment.id,
                installmentNumber: i + 1,
                installmentDueDate: `${installmentDueDate[2]}/${installmentDueDate[1]}/${installmentDueDate[0]}`,
                paymentDate: paymentDate == null?  '' :`${paymentDate[2]}/${paymentDate[1]}/${paymentDate[0]}`,
                creditDate: creditDate == null?  '' :`${creditDate[2]}/${creditDate[1]}/${creditDate[0]}`,
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

            setTitleContent(titleContent);
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
                        field="paymentDate"
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Data de Pagamento" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    <Column 
                        field="creditDate"
                        bodyStyle={{color:"#F18524"}}
                        align="center" 
                        header="Data de Credito" 
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
                        field="installmentValue"
                        body={priceBodyTemplate} 
                        align="center"
                        bodyStyle={{color:"#F18524" }}
                        header="Valor da Parcela" 
                        headerStyle={{color:'#696969'}}>
                    </Column>
                    {/* <Column 
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
            setModalContent(contentToModal)

        } else if (event.field == "client.fullName"){
            let titleContent: JSX.Element = ( 
                <Title height='2rem'>
                    Informações de Cliente
                </Title>
            );
            setTitleContent(titleContent)

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

            setModalContent(contentToModal)
        }
        setVisible(true)

    };
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Listagem de Vendas</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Pesquisa por Cliente, CPF ou Valor Total'/>
                {loading? <ProgressSpinner/>: 
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
                        stripedRows 
                    >
                        <Column 
                            field="client.fullName"
                            align="center" 
                            header="Cliente" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="client.cpf"
                            body={cpfBodyTemplate}
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
                            field="id"
                            body="Clique Aqui" 
                            align="center" 
                            header="Ver mais" 
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

export default ListagemVendas;