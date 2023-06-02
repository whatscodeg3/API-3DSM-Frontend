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
    const installmentsFiltered = props.reportData ?? [];
    console.log(installmentsFiltered)
    const filtroSelecionado = props.reportConsultModel['filterType']
    

    if (Array.isArray(installmentsFiltered)) {
        installmentsFiltered.map(item => {
            const today = new Date()
            const creditDate = item.creditDate? new Date(item.creditDate.replace('-',' ')) : false
            const paymentDate = item.paymentDate? new Date(item.paymentDate.replace('-',' ')) : false
            if(paymentDate){
                if(creditDate >= today ){
                    installmentsFiltered.pop()
                }
            }
        })
    }


    const formatCurrency = (price: number) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString()
    };

    const formatarData = (data) => {
        const dataObjeto = new Date(data);
        const dia = dataObjeto.getDate() + 1;
        const mes = dataObjeto.getMonth() + 1;
        const ano = dataObjeto.getFullYear();
        const dataFormatada = `${dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
        return dataFormatada;
    }

    const priceBodyTemplate = (price: number) => {
        return formatCurrency(price)
    };

    const dateBodyTemplate = (date: string) => {
        return date? formatDate(new Date(date.replace("-"," "))) :  " - "
    };

    const status = (dates) =>{
        const today = new Date()
        const installmentDueDate = new Date(dates.installmentDueDate.replace('-',' '))
        const creditDate = dates.creditDate? new Date(dates.creditDate.replace('-',' ')) : false
        const paymentDate = dates.paymentDate? new Date(dates.paymentDate.replace('-',' ')) : false

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
    }
    

    const reportTotals = (props) => {
        let totalAtrasado = 0
        let totalCreditado = 0
        let totalPago = 0
        let totalReceber = 0

        if(installmentsFiltered){
            for (let item of installmentsFiltered) {
                const today = new Date()
                const installmentDueDate = new Date(item.installmentDueDate.replace('-',' '))
                const creditDate = item.creditDate? new Date(item.creditDate.replace('-',' ')) : false
                const paymentDate = item.paymentDate? new Date(item.paymentDate.replace('-',' ')) : false

                if(installmentDueDate < today && !paymentDate){
                    totalAtrasado += item.installmentValue
                } else if(creditDate && creditDate <= today){
                    totalCreditado += item.installmentValue
                } else if(paymentDate && creditDate >= today){
                    totalPago += item.installmentValue
                } else {
                    totalReceber += item.installmentValue
                }
            }
        }

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

            if(filtroSelecionado === 1 ){
                return (
                    <div className="flex flex-column gap-2" style={{width:'20rem'}}>
                        <div 
                            className="flex justify-content-between gap-10 font-bold" 
                            style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524', color:'white'}}
                        >
                            <div>Parcelas em Atraso</div>
                            {formatCurrency(totalAtrasado)}
                        </div>
                       
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas Pagas</div>
                            {priceBodyTemplate(totalPago)}
                        </div>
    
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas Creditadas</div>
                            {priceBodyTemplate(totalCreditado)}
                        </div>
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas a receber</div>
                            {priceBodyTemplate(totalReceber)}
                        </div>
                    </div>
                )
            } else if(filtroSelecionado === 2) {

                return (
                    <div className="flex flex-column gap-2" style={{width:'20rem'}}>
                     
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas Pagas</div>
                            {priceBodyTemplate(totalPago)}
                        </div>
    
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas Creditadas</div>
                            {priceBodyTemplate(totalCreditado)}
                        </div>

                    </div>
                )

            } else if (filtroSelecionado === 3) {
                return (
                    <div className="flex flex-column gap-2" style={{width:'20rem'}}>
    
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas Creditadas</div>
                            {priceBodyTemplate(totalCreditado)}
                        </div>
    
                        <div 
                            className="flex flex justify-content-between gap-10 font-bold" 
                           style={{ padding: '10px', borderRadius: '5px', background: '#F18524', border: '#F18524',
                           color:'white'}}
                        >
                            <div>Parcelas a receber</div>
                            {priceBodyTemplate(totalReceber)}
                        </div>
                    </div>
                )
            }
        
        } else{
            return <div style={{width:'20rem'}}>
                
            </div>
        }
    }

    const rightResolver = <div style={{width:'20rem'}}></div>

    
    return(
        <>
            <GlobalStyle/>
            <Container>
                {props.reportConsultModel['filterType'] === 1 
                    ?
                    <>
                        <Title color='#F18524'>
                            Relatório das datas de Vencimento do dia {
                                formatarData(props.reportConsultModel["initalDate"])
                            } ao dia {
                                formatarData(props.reportConsultModel["finalDate"])
                            }
                        </Title>
                        <DataTable
                            value={installmentsFiltered}
                            paginator rows={25} rowsPerPageOptions={[25, 50, 100]} 
                            emptyMessage='Sem informações'
                            style={{width:'90%', margin:'auto'}}
                            className='shadow'
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} à {last} de {totalRecords}" 
                            paginatorLeft={reportTotals}
                            paginatorRight={rightResolver}
                            stripedRows 
                            sortField="installmentDueDate" 
                            sortOrder={1}
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
                                sortable
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
                    </>
                    : props.reportConsultModel['filterType'] === 2
                    ? 
                    <>
                        <Title color='#F18524'>
                            Relatório das datas de Pagamento do dia {
                                formatarData(props.reportConsultModel["initalDate"])
                            } ao dia {
                                formatarData(props.reportConsultModel["finalDate"])
                            }
                        </Title>
                        <DataTable
                            value={installmentsFiltered}
                            paginator rows={25} rowsPerPageOptions={[25, 50, 100]} 
                            emptyMessage='Sem informações'
                            style={{width:'90%', margin:'auto'}}
                            className='shadow'
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} à {last} de {totalRecords}" 
                            paginatorLeft={reportTotals}
                            paginatorRight={rightResolver}
                            stripedRows 
                            sortField="paymentDate" 
                            sortOrder={1}
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
                                sortable
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
                    </>
                    : 
                    <>
                        <Title color='#F18524'>
                            Relatório das datas de Credito do dia {
                                formatarData(props.reportConsultModel["initalDate"])
                            } ao dia {
                                formatarData(props.reportConsultModel["finalDate"])
                            }
                        </Title>
                        <DataTable
                            value={installmentsFiltered}
                            paginator rows={25} rowsPerPageOptions={[25, 50, 100]} 
                            emptyMessage='Sem informações'
                            style={{width:'90%', margin:'auto'}}
                            className='shadow'
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} à {last} de {totalRecords}" 
                            paginatorLeft={reportTotals}
                            paginatorRight={rightResolver}
                            stripedRows 
                            sortField="creditDate" 
                            sortOrder={1}
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
                                sortable
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
                    </>                
                    }
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <ImageBack src={IconBack} alt="IconBack" />
                </Link>
            </Container>
        </>
    )

}

export default Relatorios;