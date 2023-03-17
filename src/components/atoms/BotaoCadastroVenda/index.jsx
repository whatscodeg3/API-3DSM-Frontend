import React from "react";
import { Button } from 'primereact/button';

import styled from "styled-components";

// icons do prime
import 'primeicons/primeicons.css';
// theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
// css necessario do prime
import 'primereact/resources/primereact.min.css';


function BotaoCadastroVenda() {
    return ( 
        <div>
            <Button label="Cadastrar"/>
        </div>
    )
}

export default BotaoCadastroVenda;