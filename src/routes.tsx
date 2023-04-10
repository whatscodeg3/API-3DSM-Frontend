import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index"
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda";
import CadastroCliente from "./pages/CadastroCliente";

const Rotas: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<HomeComercial/>} />
                <Route exact path="/cadastro/cliente" element={<CadastroCliente/>} />
                <Route exact path="/cadastro/venda" element={<CadastroVenda/>} />
                <Route exact path="/listagem/venda" element={<ListagemVendas/>} />
            </Routes>
        </div>
    )
}

export default Rotas;