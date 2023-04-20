import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserInfo, ImageBack } from "./defaultStyles"

//Prime React Components
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button';


// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiPurchases } from '../../services/api'

// responseData:[], consult //isso entra como parâmetro na função

// import responseData from './mockResponse'

interface RelatoriosProps {
    responseData?: [],
    consult?: {}
}

const Relatorios: React.FC<RelatoriosProps> = (props) => {
    console.log(props.consult)
    const [loading, setLoading] = useState(true);
    const [installmentsFiltered, setInstallmentsFiltered] = useState<any[]>([])
    // const [modalContent, setModalContent] = useState<JSX.Element>();
    // const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        // // async function loadData() {
        // //     // const purchasesResponse= await apiPurchases.get(`/api/purchases`); // requisição do filtro 
        // //     // setInstallmentsFiltered(purchasesResponse.data);
        // // }
        // loadData();

        setInstallmentsFiltered(props.responseData)
        setLoading(false);
    }, []);



    // for(let i of  purchases){
    //     console.log(i)
    // }

    // const isCellSelectable = (event) =>(
    //     event.data.field === 'client.fullName' || 
    //     event.data.field === 'client.cpf' || 
    //     event.data.field === "status" ? 
    //     false : true
    // );

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };


    const priceBodyTemplate = (event: any) => {
        if(event.paymentValue){
            return formatCurrency(event.paymentValue)
        }else if(event.installmentValue){
            return formatCurrency(event.installmentValue)

        }
    };



    // const showModal = (event: any) =>{
    //     setVisible(true)

    // };

 
    const reportTotals = (installmentList, event) => {
        let totalOfAll: number = 0;
        let totalOfPage: number = 0
        let startRange: number = event.first
        let endRange: number = Math.min(startRange + event.rows, event.totalRecords)

        for(let installment of installmentList){
            totalOfAll += installment.installmentValue    
        }
        for(let i= startRange; i < endRange; i++)
            totalOfPage +=installmentList[i].installmentValue
        return (
            <>
                <div style={{ padding: '10px', borderRadius: '5px', background: '#d8d8d8', border: '#F18524' }}>{totalOfAll}</div>
                <div style={{ padding: '10px', borderRadius: '5px', background: '#d8d8d8', border: '#F18524' }}>{totalOfPage}</div>
            </>
        )
    }

    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Relatório das datas de pagamento</Title>
                {loading && <ProgressSpinner/>}
                {!loading && 
                    <DataTable
                        value={installmentsFiltered}
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                        // cellSelection 
                        // selectionMode="single"
                        // onCellSelect={showModal}
                        // isDataSelectable={isCellSelectable}
                        emptyMessage='Sem informações'
                        style={{width:'90%', margin:'auto'}}
                        className='shadow'
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} à {last} de {totalRecords}" 
                        paginatorLeft={(value) => reportTotals(installmentsFiltered, value)}
                        paginatorRight="."
                    >
                        <Column 
                            field="cpf"
                            // body={cpfBodyTemplate}
                            align="center" 
                            header="CPF" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="fullName"
                            align="center"
                            header="Nome" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        {/* <Column 
                            field="purchaseDate"
                            body=""
                            align="center" 
                            header="Data da venda" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="paymentValue"
                            align="center" 
                            header="Total da venda" 
                            headerStyle={{color:'#F18524'}}
                        ></Column> */}
                        <Column 
                            field="installmentValue"
                            align="center" 
                            header="Valor da parcela" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="installmentDueDate"
                            align="center" 
                            header="Data vencimento " 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="paymentDate"
                            align="center" 
                            header="Data de pagamento" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                        <Column 
                            field="creditDate"
                            align="center" 
                            header="Data de crédito" 
                            headerStyle={{color:'#F18524'}}
                        ></Column>
                    </DataTable>
                }
                {/* <Dialog 
                    visible={visible} 
                    onHide={() => {setVisible(false);setModalContent(<></>);}} 
                    style={{ minWidth: '50vw' }}
                    header=''
                    headerStyle={{textAlign:"center"}}
                    closeOnEscape={true}
                >
                    <hr/>
                    {modalContent}
                </Dialog> */}
                <Link to={"/"} style={{ textDecoration: "none" }}>
					<ImageBack src={IconBack} alt="IconBack" />
				</Link>
            </Container>
        </>
    )

}

export default Relatorios;