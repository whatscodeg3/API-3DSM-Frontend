import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiPurchases } from "../../services/api";
// import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
// import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
// import { ColumnFilterElementTemplateOptions } from "primereact/column";
         
// Styles
import { GlobalStyle } from "./globalStyles";
import { Container, Title, ImageBack, ButtonSubmit, Calendar, Select } from "./defaultStyles";

// Images
import IconBack from "../../assets/img/IconBack.svg"

// Components
import Relatorios from "../Relatorios";

import { AxiosResponse } from "axios";

const HomeRelatorios: React.FC = () => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AxiosResponse>();
    const [consult, setConsult] = useState();

    const [initialDate, setInitialDate] = useState(null);
    const [finalDate,  setFinalDate,] = useState(null);
    const [typeDate,  setTypeDate,] = useState(null);
    
    // addLocale("pt", config);
    // locale("pt"); 
    
    const handleInitialDateChange = (event) => {
        setInitialDate(event.target.value);
    }
    const handleFinalDateChange = (event) => {
        setFinalDate(event.target.value);
    }
    const handleTypeDateChange = (event) => {
        setTypeDate(Number(event.target.value));
    }
    
    const onSubmit = () => {

        if (initialDate > finalDate) {
            window.alert('A data inicial não pode ser maior que a data final.');
        } else {
            const reportModel:any = {
                body:{
                    "initalDate": initialDate,
                    "finalDate": finalDate,
                    "filterType": typeDate
                },
                headers:{ 
                    Authorization: `Bearer ${tokenPurchases}`
                }
            }

            async function response () {
                const reportReturned : AxiosResponse =  await apiPurchases.get('/api/report', reportModel)
                setData(reportReturned)
            }
            response()
            setConsult(reportModel['body'])
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? 
                <>
                    <GlobalStyle/>
                    <Container>
                        <Title>
                            Filtro de Relatorio
                        </Title>

                        <div className="card flex justify-content-center gap-5">
                            <Calendar type="date" onChange={handleInitialDateChange} required />
                            {/* <Calendar value={initialDate} onChange={(e) => setInitialDate(e)} showIcon required /> */}
                            <p> à </p>
                            {/* <Calendar value={finalDate} onChange={(e) => setFinalDate(e)} showIcon required /> */}
                            <Calendar type="date" onChange={handleFinalDateChange} required />
                        </div>

                        <Select onChange={handleTypeDateChange}>
                            <option>Selecione</option>
                            <option value={1}>Data de Vencimento</option>
                            <option value={2}>Data de Pagamento</option>
                            <option value={3}>Data de Crédito</option>
                        </Select>

                        {initialDate && finalDate && typeDate? 
                            <ButtonSubmit onClick={onSubmit}>Buscar</ButtonSubmit>
                            : 
                            <div className="flex justify-content-center align-items-center disabledButton">
                                Buscar
                            </div>
                        }

                        <Link to={"/"} style={{ textDecoration: "none" }}>
                            <ImageBack src={IconBack} alt="IconBack" />
                        </Link>
                    </Container>
                </>
             
             : <Relatorios reportData={data} reportConsultModel={consult} />}
        </>
    )
}

export default HomeRelatorios