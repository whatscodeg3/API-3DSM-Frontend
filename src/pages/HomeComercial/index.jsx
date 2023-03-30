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

function HomeComercial() {
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
                                <img src={IconPerson} alt="IconPerson" />
                                <p>
                                    Cadastrar<br/>cliente
                                </p>
                            </Card>
                        </Link>

                        {/* Card Compra */}
                        <Link to={"/cadastro/compra"} style={{ textDecoration: 'none' }}>
                            <Card className="animate__animated animate__slideInUp">
                                <img src={IconBag} alt="IconBag" />
                                <p>
                                    Cadastrar<br/>compra
                                </p>
                            </Card>
                        </Link>

                        {/* Card Listagem */}
                        <Link to={"/listagem/compra"} style={{ textDecoration: 'none' }}>
                        <Card className="animate__animated animate__slideInRight">
                            <img src={IconBag} alt="IconBag" />
                            <p>
                                Listagem<br/>compras
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