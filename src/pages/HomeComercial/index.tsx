import React from "react";
import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, MainBlock, Title } from "./defaultStyles"

// Components
import NavBar from "../../components/organisms/NavBar";
import { Card } from "../../components/atoms/Cards/defaultStyles";

// Img
import IconBag from "../../assets/img/IconBag.svg"
import IconPerson from "../../assets/img/IconPerson.svg"
import IconDocument from "../../assets/img/IconDocument.svg"


// permissions
import PermissionGate from "../../context/permission-gate";

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

                        <PermissionGate permissions={['admin', 'comercial']}>
                        <Link to={"/cadastro/cliente"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInLeft">
                                <img src={IconPerson} style={{ width: "4vw" }} alt="IconPerson" />
                                <p>
                                    Cadastrar<br/>cliente
                                </p>
                            </Card>
                        </Link>
                        </PermissionGate>
                       

                        {/* Card Compra */}
                        <Link to={"/cadastro/venda"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInUp">
                                <img src={IconBag} style={{ width: "4vw" }} alt="IconBag" />
                                <p>
                                    Cadastrar<br/>venda
                                </p>
                            </Card>
                        </Link>
                        {/* Card Listagem */}
                        <Link to={"/listagem/venda"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInUp">
                            <img src={IconDocument} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Listagem<br/>vendas
                            </p>
                        </Card>
                        </Link>
                        {/* Card Relatorios */}
                        <Link to={"/relatorios"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInRight">
                            <img src={IconDocument} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Relatórios
                            </p>
                        </Card>
                        </Link>
                    </Cards>
                    <Cards>
                        {/* Card Listagem Cliente */}
                        <Link to={"/listagem/cliente"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInRight">
                            <img src={IconDocument} style={{ width: "4vw" }} alt="IconBag" />
                            <p>
                                Listagem<br/>clientes
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