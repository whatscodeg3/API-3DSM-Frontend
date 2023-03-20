import React from "react";
// import { Link } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Title } from "./defaultStyles"

//Components
import NavBar from "../../components/organisms/NavBar";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  

function ListagemVendas(){
    return(
        <>
            <GlobalStyle/>
            <Container>
                <Title>Listagem de Vendas</Title>
            </Container>
        </>
    )

}

export default ListagemVendas;