import React from "react";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Cpf } from "./defaultStyles"

// Components
import CampoDePreencherDinheiro from "../../components/atoms/CampoDePreencherDinheiro";
import CampoDePreencherNumero from "../../components/atoms/CampoDePreencherNumero";
import BotaoCadastroVenda from "../../components/atoms/BotaoCadastroVenda";
import CampoDeQuantidadePrestacao from "../../components/atoms/CampoDePreencherQuantidade";
import CampoDeExibicaoDeNumero from "../../components/atoms/CampoDeExibicaoDeNumero";
import { Card } from "./defaultStyles";


function CadastroVenda() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Cards>
                    <Cpf>
                        <Center>
                            <label className="font-bold block mb-2">Digite um CPF</label> <br/>
                            <CampoDePreencherNumero/>
                        </Center>
                    </Cpf>
                    <Card>
                        <Line/>
                    </Card>
                        <form method="post" action="(metodo post controller)"> 
                            <Card>
                                <Center>
                                    <label className="font-bold block mb-2">Valor Total</label> <br/>
                                    <CampoDePreencherDinheiro/>
                                </Center>

                                <Center>
                                    <label className="font-bold block mb-2">Quantidade de Parcelas</label> <br/>
                                    <CampoDeQuantidadePrestacao/>
                                </Center>

                                <Center>
                                    <label className="font-bold block mb-2">Parcelas no Valor de:</label> <br/>
                                    <CampoDeExibicaoDeNumero/>
                                </Center>

                                <BotaoCadastroVenda/>
                            </Card>
                        </form>
                </Cards>
            </Container>
            
        </>
    )

}

export default CadastroVenda;