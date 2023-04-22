import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ContainerUserInfo, ImageBack } from "./defaultStyles"

//Prime React Components
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner'


// Images
import IconBack from '../../assets/img/IconBack.svg'

//API's
import { apiPurchases } from '../../services/api'

//mockData
import mockResponse from './mockResponse';



interface RelatoriosProps {
    reportData?: [],
    reportConsultModel?: {}
}

const Relatorios: React.FC<RelatoriosProps> = (props) => {
    console.log(props.reportConsultModel)
    const [loading, setLoading] = useState(true);
    const [installmentsFiltered, setInstallmentsFiltered] = useState<any[]>([])

    const getCustomers = (data) => {
        const today = new Date()
        const newer = data.map((d) => {
            const creditDate = new Date(d.creditDate.replace('-',' '))
            if(creditDate > today ){
                console.log("menor")
                return d
            }

        });
        return newer
    };
    
    useEffect(() => {
        setInstallmentsFiltered(props.reportData)
        // if(props.reportConsultModel['filterType'] === "vencimento"){
        //     setInstallmentsFiltered(mockResponse[0])
        // } else if(props.reportConsultModel['filterType'] === "pagamento"){
        //     setInstallmentsFiltered(mockResponse[1])

        // } else {
        //     setInstallmentsFiltered(mockResponse[2])
        //     // console.log(getCustomers(mockResponse[2]))
        // }
        setLoading(false);
    }, []);


    const formatCurrency = (price: number) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString()
    };

    const priceBodyTemplate = (price: number) => {
        return formatCurrency(price)
    };

    const dateBodyTemplate = (date: string) => {
        return date? formatDate(new Date(date.replace("-"," "))) :  " - "
    };

    const status = (dates) =>{
        const today = new Date().toLocaleDateString()
        const installmentDueDate = new Date(dates.installmentDueDate.replace('-',' ')).toLocaleDateString()
        const creditDate = dates.creditDate? new Date(dates.creditDate.replace('-',' ')).toLocaleDateString() : false
        const paymentDate = dates.paymentDate? new Date(dates.paymentDate.replace('-',' ')).toLocaleDateString() : false
        
        if(installmentDueDate >= today && !paymentDate && !creditDate) {
            return <div>Aguardando pagamento</div>
        }
        else if(installmentDueDate < today && !paymentDate){
            return <div>Atrasada</div>
        }
        else if(paymentDate){
            if(creditDate <= today ){
                return <div>Creditada</div>
            }
            return <div>Paga</div>
        }
        else{
            return <div>{today}</div>
        }
        //if(creditDate){
        //     return <div>Creditada</div>
        // }
        }
    

    const reportTotals = (event) => {
        let totalOfAll: number = 0
        let totalOfPage: number = 0
        let startRange: number = event.first
        let endRange: number = Math.min(startRange + event.rows, event.totalRecords)
        if(installmentsFiltered){
            for (let installment of installmentsFiltered) {
                totalOfAll += installment.installmentValue
            }
            for (let i = startRange; i < endRange; i++)
                totalOfPage += installmentsFiltered[i].installmentValue
            return (
                <div className="flex flex-column gap-2" style={{width:'20rem'}}>
                     {event.totalRecords > event.rows &&
                    <div 
                        className="flex justify-content-between gap-5" 
                        style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524', color:'white'}}
                    >
                        <div>Total da página</div>
                        {priceBodyTemplate(totalOfPage)}
                    </div>}
                   
                    <div 
                        className="flex flex justify-content-between gap-5" 
                       style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                       color:'white'}}
                    >
                        <div>Total</div>
                        {priceBodyTemplate(totalOfAll)}
                    </div>
                </div>
            )
        } else{
            return <div style={{width:'20rem'}}></div>
        }
    }

    const rightResolver = <div style={{width:'20rem'}}></div>

    
    return(
        <>
            <GlobalStyle/>
            <Container>     
                <Title color='#F18524'>Relatório das datas de {props.reportConsultModel['filterType']}</Title>
                {loading ? <ProgressSpinner/> :
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
                        paginatorLeft={reportTotals}
                        paginatorRight={rightResolver}
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
                            align="center" 
                            header="Data da venda" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => dateBodyTemplate(rowData.purchaseDate)}
                        ></Column>
                        <Column 
                            field="paymentValue"
                            align="center" 
                            header="Total da venda" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => priceBodyTemplate(rowData.paymentValue)}
                        ></Column> */}
                        <Column 
                            field="installmentValue"
                            align="center" 
                            header="Valor da parcela" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => priceBodyTemplate(rowData.installmentValue)}
                        ></Column>
                        <Column 
                            field="installmentDueDate"
                            align="center" 
                            header="Data vencimento " 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => dateBodyTemplate(rowData.installmentDueDate)}
                        ></Column>
                        <Column 
                            field="paymentDate"
                            align="center" 
                            header="Data de pagamento" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => dateBodyTemplate(rowData.paymentDate)}
                        ></Column>
                        <Column 
                            field="creditDate"
                            align="center" 
                            header="Data de crédito" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => dateBodyTemplate(rowData.creditDate)}
                        ></Column>
                        <Column 
                            align="center" 
                            header="Status" 
                            headerStyle={{color:'#F18524'}}
                            body={(rowData) => status(rowData)}
                        ></Column>
                    </DataTable>
                }
                <Link to={"/"} style={{ textDecoration: "none" }}>
					<ImageBack src={IconBack} alt="IconBack" />
				</Link>
            </Container>
        </>
    )

}

export default Relatorios;