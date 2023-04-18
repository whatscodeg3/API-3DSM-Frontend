import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { Link } from 'react-router-dom';
         
// Styles
import { GlobalStyle } from "./globalStyles";
import { Title, ImageBack, ButtonSubmit } from "./defaultStyles";

// Images
import IconBack from "../../assets/img/IconBack.svg"

// Configs
import { config } from "./calendarConfigs";

export default function HomeRelatorios() {
    const [initialDate, setInitialDate] = useState(null);
    const [finalDate,  setFinalDate,] = useState(null);

    addLocale("pt", config);
    locale('pt');

    return (
        <>
            <GlobalStyle/>
            <div>
                <Title>
                    Página Inicial
                </Title>

                <div className="card flex justify-content-center gap-5">
                    <Calendar value={initialDate} onChange={(e) => setInitialDate(e.value)} />
                    <p> à </p>
                    <Calendar value={finalDate} onChange={(e) => setFinalDate(e.value)} />
                </div>

                <ButtonSubmit>
                    Buscar
                </ButtonSubmit>

                <Link to={"/"} style={{ textDecoration: "none" }}>
					<ImageBack src={IconBack} alt="IconBack" />
				</Link>
            </div>
        </>
    )
}