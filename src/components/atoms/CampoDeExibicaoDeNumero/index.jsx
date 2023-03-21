import React, { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

// icons do prime
import 'primeicons/primeicons.css';

// theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

// css necessario do prime
import 'primereact/resources/primereact.min.css';

let ValorTotal = 12000 
let QuantidadeDePrestacao = 12
let ValorTotalPosCalculo = ValorTotal/QuantidadeDePrestacao

// OBS: A diferença desse componente para o CampoDePreencherNumero, é que o não é possível mexer no valor que aparecer no campo, tendo que passar pro value = CampoDeExibicaoDeNumero, para ser exibido. Em outras palavras, é um componente que serve apenas para exibição.
export default function CampoDeExibicaoDeNumero() {
    const [ValorQueApareceNoCampo, setValue] = useState(ValorTotalPosCalculo);

    return (
        <div>
            <InputNumber name="" value={ValorQueApareceNoCampo} disabled prefix="R$" />
        </div>
    )
}
        