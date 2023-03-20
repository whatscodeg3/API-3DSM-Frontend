import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeComercial from "./pages/HomeComercial/index"
import ListagemVendas from "./pages/ListagemVendas";

const Rotas = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<HomeComercial/>} />
                <Route exact path="/cadastro/cliente" element={<HomeComercial/>} />
                <Route exact path="/cadastro/compra" element={<HomeComercial/>} />
                <Route exact path="/listagem/compra" element={<ListagemVendas/>} />
            </Routes>
        </div>
    )
}

export default Rotas;