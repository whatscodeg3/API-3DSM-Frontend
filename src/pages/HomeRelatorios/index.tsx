import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPurchases } from "../../services/api";
// import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
// import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
// import { ColumnFilterElementTemplateOptions } from "primereact/column";
         
// Styles
import { GlobalStyle } from "./globalStyles";
import { Container, Title, ImageBack, ButtonSubmit, Calendar, Select } from "./defaultStyles";

// Images
import IconBack from "../../assets/img/IconBack.svg"

// Configs
import { config } from "./calendarConfigs";

export default function HomeRelatorios() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [consult, setConsult] = useState();

    const [initialDate, setInitialDate] = useState(null);
    const [finalDate,  setFinalDate,] = useState(null);
    const [typeDate,  setTypeDate,] = useState(null);
    const [valid, setValid] = useState(false)

    // addLocale("pt", config);
    // locale("pt"); 
    
    const handleInitialDateChange = (event) => {
        setInitialDate(event.target.value);
    }
    const handleFinalDateChange = (event) => {
        setFinalDate(event.target.value);
    }
    const handleTypeDateChange = (event) => {
        setTypeDate(event.target.value);
    }

    const navigate = useNavigate();
    const onSubmit = async (value) => { 
        if (initialDate > finalDate) {
            window.alert('A data inicial não pode ser maior que a data final.');
        } else if (finalDate < initialDate) {
            window.alert('A data final não pode ser menor que a data inicial.');
        } else {
            setValid(true)
        }

        const formatJson:any = {
            "initalDate": initialDate,
            "finalDate": finalDate,
            "filterType": typeDate
        }
        if(valid == true){
            const response:any = await apiPurchases.get("/api/report", formatJson)
            setConsult(formatJson)
            setData(response)
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? <Relatorios data={data} consult={consult} > :
                <>
                    <GlobalStyle/>
                    <Container onSubmit={onSubmit}>
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
                            <option value={1}>Data de Vencimento</option>
                            <option value={2}>Data de Pagamento</option>
                            <option value={3}>Data de Crédito</option>
                        </Select>

                        <ButtonSubmit type="submit">Buscar</ButtonSubmit>

                        <Link to={"/"} style={{ textDecoration: "none" }}>
                            <ImageBack src={IconBack} alt="IconBack" />
                        </Link>
                    </Container>
                </>
            }
        </>
    )
}