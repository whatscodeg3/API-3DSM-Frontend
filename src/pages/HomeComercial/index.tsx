import React from "react";
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, MainBlock, Title } from "./defaultStyles"

// Components
import NavBar from "../../components/organisms/NavBar";
import { Card } from "../../components/atoms/Cards/defaultStyles";

// Img
import IconCadastroCliente from "../../assets/img/user-add-client.svg"
import IconCadastroFuncionario from "../../assets/img/user-add-funcionario.svg"
import IconCadastroVendas from "../../assets/img/shopping-cart.svg"
import IconListagemCliente from "../../assets/img/users-clientes.svg"
import IconListagemVendas from "../../assets/img/listagem-venda.svg"
import IconRelatorios from "../../assets/img/relatorios.svg"


const HomeComercial: React.FC = () => {
    return (
        <>
            <GlobalStyle />

            <Container>
                <NavBar />

                <MainBlock>
                    <Title>
                        Página Inicial
                    </Title>
                    <Cards>

                        {/* Card Cliente */}
                        <Link to={"/cadastro/cliente"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInLeft">
                                <img src={IconCadastroCliente} style={{ width: "4vw" }} alt="IconPerson" />
                                <p>
                                    Cadastrar<br/>cliente
                                </p>
                            </Card>
                        </Link>

                        {/* Card Compra */}
                        <Link to={"/cadastro/venda"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInUp">
                                <img src={IconCadastroVendas} style={{ width: "4vw" }} alt="IconBag" />
                                <p>
                                    Cadastrar<br/>venda
                                </p>
                            </Card>
                        </Link>

                        {/* Card funcionario */}
                        <Link to={"/cadastro/funcionario"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInUp">
                                <img src={IconCadastroFuncionario} style={{ width: "4vw" }} alt="IconBag" />
                                <p>
                                    Cadastrar<br/>funcionario
                                </p>
                            </Card>
                        </Link>

                    </Cards>
                    <Cards>

                        {/* Card Listagem */}
                        <Link to={"/listagem/venda"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInUp">
                            <img src={IconListagemVendas} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Listagem<br/>vendas
                            </p>
                        </Card>
                        </Link>

                        {/* Card Listagem Cliente */}
                        <Link to={"/listagem/cliente"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInRight">
                            <img src={IconListagemCliente} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Listagem<br/>clientes
                            </p>
                        </Card>
                        </Link>

                        {/* Card Relatorios */}
                        <Link to={"/relatorios"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInRight">
                            <img src={IconRelatorios} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Relatórios
                            </p>
                        </Card>
                        </Link>

                    </Cards>
                </MainBlock>
            </Container>
        </>
    )

}

export default HomeComercial;