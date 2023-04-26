import React, { useContext, useRef } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate, useNavigate } from "react-router-dom";
import {Toast} from 'primereact/toast'

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListaClienteUsuario";
import HomeRelatorios from "./pages/HomeRelatorios";
import Login from "./pages/Login";

const Rotas: React.FC = () => {
  const navigate = useNavigate();

  const ROLES = {
    COMERCIAL: 'Comercial User',
    FINANCEIRO: 'Financeiro User',
    ADMIN: 'ADMIN User'
  }
  const CURRENT_USER_ROLE =  ROLES.COMERCIAL;
  
  
  

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    // return authenticated ? children : <Navigate to='/' />
    return children
  }




  const RoleComercial = ({ children }) => {
    
    return  CURRENT_USER_ROLE == ROLES.COMERCIAL ? children : <Navigate to='/home' />

  }

  const RoleFinanceiro = ({ children }) => {
    
    return  CURRENT_USER_ROLE == ROLES.FINANCEIRO ? children :  <Navigate to='/home' />

  }


  // const RoleADMIN = ({ children }) => {
    
  //   return  CURRENT_USER_ROLE == ROLES.ADMIN ? children : <Navigate to='/' />

  // }



  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Private><RoleComercial children={<HomeComercial />}/></Private>} />
                <Route path="/cadastro/cliente" element={<Private><RoleComercial children={<CadastroCliente />}/></Private>} /> 
                <Route path="/cadastro/venda" element={<Private><RoleComercial children={<CadastroVenda />}/></Private>} />
                <Route path="/listagem/venda" element={<Private><RoleFinanceiro children={<ListagemVendas />}/></Private>} />
                <Route path="/listagem/cliente" element={<Private><RoleComercial children={<ListaClienteUsuario />}/></Private>} />
                <Route path="/relatorios" element={<Private><RoleFinanceiro children={<HomeRelatorios />}/></Private>} />
            </Routes>
        </AuthProvider>
    </div>
  );
};

export default Rotas;