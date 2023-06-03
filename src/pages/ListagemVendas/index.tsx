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
import ToastProps from "../../interfaces/selfInterfaces";

const ListagemVendas: React.FC<ToastProps> = (props) => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [clients, setClients] = useState([]);
    const [installmentsPayed, setInstallmentsPayed] = useState(null);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [titleContent, setTitleContent] = useState<JSX.Element>();
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>({'client.fullName': { value: null, matchMode: FilterMatchMode.STARTS_WITH }});
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
            // setClients(clientResponse.data);
        }
        loadData(); 
        setLoading(false);
    }, []);
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
   
        
        let _filters: any = { ...filters };

        _filters['client.fullName'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const isCellSelectable = (event: any) => (event.data.field === 'paymentValue' || event.data.field === 'installment.length' || event.data.field === 'clientName' ? false : true);

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
    const checkInstallmentAsPayed = (installmentId: any) => {
        const decision = window.confirm("Deseja confirmar o pagamento desta parcela?")
        if(decision){
            const today = new Date();
            const day = today.getDate();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            var formattedDate = ``
            if(day < 10){
                formattedDate = `${year}-${month}-0${day}`;
            } else {
                formattedDate = `${year}-${month}-${day}`;
            }

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
            props.toastContent({severity:'success', summary: 'Sucesso', detail: 'Pagamento da parcela confirmado!', life: 3000})
        }else{
            props.toastContent({severity:'error', summary: 'Erro', detail: 'Confirmação do pagamento cancelada!', life: 3000});
        }
        setVisible(false)
    }
    
    const installmentCheck = (event: any) =>{
        return event.isInstallmentPayed ?  
            "Parcela paga" : 
            <Button label="Confirmar" severity="success"  onClick={() => {checkInstallmentAsPayed(event.id)}}/>
    }


    const showModal = (event: any) =>{
        let id = event.value

        const purchasesResponse = apiPurchases.get(`/api/purchases/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenPurchases}`,
            },
        });

        purchasesResponse.then(item => {
            let data = []
            let count = 0
            item.data.installment.map(item => {
                
                count += 1
                item.count = count

                // formatando data

                // installmentDueDate
                let installmentDueDate = item.installmentDueDate.split("-")
                let formatInstallmentDueDate = `${installmentDueDate[2]}/${installmentDueDate[1]}/${installmentDueDate[0]}`
                item.installmentDueDate = formatInstallmentDueDate

                if(item.paymentDate !== null){
                    // paymentDate
                    let paymentDate = item.paymentDate.split("-")
                    let formatedPaymentDate = `${paymentDate[2]}/${paymentDate[1]}/${paymentDate[0]}`
                    item.paymentDate = formatedPaymentDate
    
                    // creditDate
                    let creditDate = item.creditDate.split("-")
                    let formatedCreditDate = `${creditDate[2]}/${creditDate[1]}/${creditDate[0]}`
                    item.creditDate = formatedCreditDate
                }

                data.push(item)

                if (event.field == "id"){
                    let titleContent: JSX.Element = ( 
                        <Title height='2rem' color="#696969">
                            Informações de Venda
                        </Title>
                    );

                    setTitleContent(titleContent);
                    let contentToModal: JSX.Element = (
                        <DataTable 
                            value={data}
                            tableStyle={{ minWidth: '50rem' }}
                            sortField="id" 
                            sortOrder={1}
                        >
                            {/* <Column 
                                field="count"
                                sortable
                                bodyStyle={{color:"#F18524"}}
                                align="center" 
                                header="Parcela" 
                                headerStyle={{color:'#696969'}}>
                            </Column> */}
                            <Column 
                                field="installmentValue"
                                body={priceBodyTemplate} 
                                align="center"
                                bodyStyle={{color:"#F18524" }}
                                header="Valor da Parcela" 
                                headerStyle={{color:'#696969'}}>
                            </Column>
                            <Column 
                                sortable
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
                            <Column 
                                field="creditDate"
                                bodyStyle={{color:"#F18524"}}
                                align="center" 
                                header="Data de Credito" 
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
            })
        })
    };
    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Listagem de Vendas</Title>
                <SearchField value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='| Digite um Nome'/>
                {loading? <ProgressSpinner/>: 
                    <DataTable
                        value={purchases}
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
                            field="clientName"
                            align="center" 
                            header="Nome" 
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