import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index"
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListaClienteUsuario";
import Relatorios from "./pages/Relatorios";

const Rotas: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeComercial/>} />
                <Route path="/cadastro/cliente" element={<CadastroCliente/>} />
                <Route path="/cadastro/venda" element={<CadastroVenda/>} />
                <Route path="/listagem/venda" element={<ListagemVendas/>} />
                <Route path="/listagem/cliente" element={<ListaClienteUsuario/>} />
                <Route path="/relatorios" element={<Relatorios/>}/>
            </Routes>
        </div>
    )
}

export default Rotas;