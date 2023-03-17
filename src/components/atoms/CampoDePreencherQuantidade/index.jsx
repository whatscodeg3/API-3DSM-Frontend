import React, { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

// icons do prime
import 'primeicons/primeicons.css';

// theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

// css necessario do prime
import 'primereact/resources/primereact.min.css';



export default function CampoDeQuantidadePrestacao() {
    const [QuantidadeDeParcelas, setValue] = useState(0);

    return (
        <div>
            <InputNumber inputId="BotaoQueAumentaEDiminuiQuantidade" value={QuantidadeDeParcelas} onValueChange={(e) => setValue(e.value)} min={0} showButtons buttonLayout="horizontal" decrementButtonIcon="pi pi-chevron-left" incrementButtonIcon="pi pi-chevron-right" />
        </div>
    )
}