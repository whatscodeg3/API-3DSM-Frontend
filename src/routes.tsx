import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from './context/auth'
import { useNavigate } from 'react-router-dom';

// Pages
import HomeComercial from "./pages/HomeComercial/index"
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListaClienteUsuario";
import HomeRelatorios from "./pages/HomeRelatorios";
import Login from "./pages/Login";

const Rotas: React.FC = () => {

    const navigate = useNavigate();

    const Private = ({ children }) => {
      const { authenticated, loading } = useContext(AuthContext);
      const isPageInLoading = loading;
  
      if (isPageInLoading) {
        return <div className="loading"> Carregando...</div>
      }
  
      return authenticated
        ? children
        : navigate('/')
    }


    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<HomeComercial/>} />
                    <Route path="/cadastro/cliente" element={<CadastroCliente/>} />
                    <Route path="/cadastro/venda" element={<CadastroVenda/>} />
                    <Route path="/listagem/venda" element={<ListagemVendas/>} />
                    <Route path="/listagem/cliente" element={<ListaClienteUsuario/>} />
                    <Route path="/relatorios" element={<HomeRelatorios/>} />

            </Routes>
            </AuthProvider>
        </div>
    )
}

export default Rotas;