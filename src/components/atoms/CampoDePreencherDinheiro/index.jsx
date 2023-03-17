import React, { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

// icons do prime
import 'primeicons/primeicons.css';

// theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

// css necessario do prime
import 'primereact/resources/primereact.min.css';



export default function CampoDePreencherDinheiro() {
    const [ValorInseridoNoCampo, setValue] = useState();

    return (
        <div>
            <InputNumber inputId="ValorInserido" value={ValorInseridoNoCampo} onValueChange={(e) => setValue(e.value)} minFractionDigits={2} maxFractionDigits={5} prefix="R$" />
        </div>
    )
}
        