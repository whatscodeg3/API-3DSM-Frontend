import React from "react";
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, MainBlock, Fields, InputField, Title } from "./defaultStyles"

// Img
import IconBack from "../../assets/img/IconBack.svg"

function CadastroCliente() {
    return (
        <>
            <GlobalStyle />

            <Container>
                <Title>
                    Cadastro de Cliente
                </Title>
                <MainBlock>
                    <Fields>
                        <InputField type="text" name="name" placeholder="Nome Completo" />
                        <InputField type="text" name="name" placeholder="CPF" /> {/* OBS: Fazer validação */}
                        <InputField type="text" name="name" placeholder="Email" />
                        <InputField type="text" name="name" placeholder="Telefone" />
                        <InputField type="text" name="name" placeholder="Data de Nascimento" />
                        <InputField type="text" name="name" placeholder="CEP" /> {/* OBS: Fazer autopreenchimento */}
                    </Fields>
                    <Fields>
                        <InputField type="text" name="name" placeholder="Logradouro(rua, avenida, ...)" />
                        <InputField type="text" name="name" placeholder="Estado" />
                        <InputField type="text" name="name" placeholder="Bairro" />
                        <InputField type="text" name="name" placeholder="Cidade" />
                        <InputField type="text" name="name" placeholder="Número" />
                        <InputField type="text" name="name" placeholder="Complemento" />
                    </Fields>
                </MainBlock>

                <button type="submit">Cadastrar</button>

                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <img src={IconBack} alt="IconBack" />
                </Link>
            </Container>
        </>
    )

}

export default CadastroCliente;