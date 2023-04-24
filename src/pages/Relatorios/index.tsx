import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title, ImageBack } from "./defaultStyles"

//Prime React Components
import { DataTable,} from 'primereact/datatable';
import { Column } from 'primereact/column';

// Images
import IconBack from '../../assets/img/IconBack.svg'
import React from "react";
import { PaginatorProps } from "primereact/paginator";


interface RelatoriosProps {
    reportData?: [] | any,
    reportConsultModel?: {}
}


const Relatorios: React.FC<RelatoriosProps> = (props) => {
    console.log(props.reportData)
    const installmentsFiltered = props.reportData        
    
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
            return <div className="text-bluegray-600 font-bold">Aguardando pagamento</div>
        }
        else if(installmentDueDate < today && !paymentDate){
            return <div className="text-red-300 font-bold">Atrasada</div>
        }
        else if(paymentDate){
            if(creditDate <= today ){
                return <div className="text-green-300 font-bold">Creditada</div>
            }
            return <div className="text-blue-300 font-bold">Paga</div>
        }
        else{
            return <div>{today}</div>
        }
    }
    

    const reportTotals = (props) => {
        let totalOfAll: number = 0
        let totalOfPage: number = 0
        let startRange: number = props.first
        let endRange: number = Math.min(startRange + props.rows, props.totalRecords)
        if(installmentsFiltered){
            for (let installment of installmentsFiltered) {
                totalOfAll += installment.installmentValue
            }

            for (let i = startRange; i < endRange; i++){
                totalOfPage += installmentsFiltered[i].installmentValue
            }
            return (
                <div className="flex flex-column gap-2" style={{width:'20rem'}}>
                     {props.totalRecords > props.rows &&
                    <div 
                        className="flex justify-content-between gap-5 font-bold" 
                        style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524', color:'white'}}
                    >
                        <div>Total da página</div>
                        {priceBodyTemplate(totalOfPage)}
                    </div>}
                   
                    <div 
                        className="flex flex justify-content-between gap-5 font-bold" 
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
                <Title color='#F18524'>
                    Relatório das datas de {props.reportConsultModel['filterType']}
                </Title>
                <DataTable
                    value={installmentsFiltered}
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                    emptyMessage='Sem informações'
                    style={{width:'90%', margin:'auto'}}
                    className='shadow'
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} à {last} de {totalRecords}" 
                    paginatorLeft={reportTotals}
                    paginatorRight={rightResolver}
                    stripedRows 
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
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <ImageBack src={IconBack} alt="IconBack" />
                </Link>
            </Container>
        </>
    )

}

export default Relatorios;