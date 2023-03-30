import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index"
import CadastroCliente from "./pages/CadastroCliente";

const Rotas = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<HomeComercial/>} />
                <Route exact path="/cadastro/cliente" element={<CadastroCliente/>} />
                <Route exact path="/cadastro/compra" element={<HomeComercial/>} />
                <Route exact path="/listagem/compra" element={<HomeComercial/>} />
            </Routes>
        </div>
    )
}

export default Rotas;