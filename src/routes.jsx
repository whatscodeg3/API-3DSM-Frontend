import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeComercial from "./pages/HomeComercial/index"
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda";

const Rotas = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<HomeComercial/>} />
                <Route exact path="/cadastro/cliente" element={<HomeComercial/>} />
                <Route exact path="/cadastro/compra" element={<HomeComercial/>} />
                <Route exact path="/listagem/compra" element={<ListagemVendas/>} />
                <Route exact path="/cadastro/venda" element={<CadastroVenda/>} />
                <Route exact path="/listagem/venda" element={<HomeComercial/>} />
            </Routes>
        </div>
    )
}

export default Rotas;