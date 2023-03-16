import React from "react";
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container } from "./defaultStyles"

// Img
import IconBack from "../../assets/img/IconBack.svg"

function CadastroCliente() {
    return (
        <>
            <GlobalStyle />

            <Container>
                <div>
                    <div>
                        <input type="text" name="name" placeholder="Nome Completo" />
                        <input type="text" name="name" placeholder="CPF" /> {/* OBS: Fazer validação */}
                        <input type="text" name="name" placeholder="Email" />
                        <input type="text" name="name" placeholder="Telefone" />
                        <input type="text" name="name" placeholder="Data de Nascimento" />
                        <input type="text" name="name" placeholder="CEP" /> {/* OBS: Fazer autopreenchimento */}
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Logradouro(rua, avenida, ...)" />
                        <input type="text" name="name" placeholder="Estado" />
                        <input type="text" name="name" placeholder="Bairro" />
                        <input type="text" name="name" placeholder="Cidade" />
                        <input type="text" name="name" placeholder="Número" />
                        <input type="text" name="name" placeholder="Complemento" />
                    </div>
                </div>

                <button type="submit">Cadastrar</button>

                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <img src={IconBack} alt="IconBack" />
                </Link>
            </Container>
        </>
    )

}

export default CadastroCliente;