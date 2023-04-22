import React, { useContext } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListaClienteUsuario";
import Login from "./pages/Login";

const Rotas: React.FC = () => {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    return authenticated ? children : <Navigate to='/' />
  }

  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Private><HomeComercial /></Private>} />
                <Route path="/cadastro/cliente" element={<Private><CadastroCliente /></Private>} />
                <Route path="/cadastro/venda" element={<Private><CadastroVenda /></Private>} />
                <Route path="/listagem/venda" element={<Private><ListagemVendas /></Private>} />
                <Route path="/listagem/cliente" element={<Private><ListaClienteUsuario/></Private>} />
            </Routes>
        </AuthProvider>
    </div>
  );
};

export default Rotas;