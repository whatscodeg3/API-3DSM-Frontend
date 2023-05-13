import React, { useContext, useRef, useState } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaCliente from "./pages/ListagemCliente";
import HomeRelatorios from "./pages/HomeRelatorios";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import CadastroFuncionario from "./pages/CadastroFuncionario";
import { PermissionGateRoutes } from "./context/permission-gate";


const Rotas: React.FC = () => {
  const toast = useRef(null)
  const setToastContent = (content) =>{
    toast.current.show(content)
  }


  const Private = ({ children, permissions }) => {
    const { authenticated } = useContext(AuthContext);
    const hasPermissions = PermissionGateRoutes(permissions)
  
    if (authenticated && hasPermissions) {
      return children
    } else if (authenticated && hasPermissions==false) {
      return <Navigate to='/home' />
    } else {
      return <Navigate to='/' />
    }
  }



  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login toastContent={setToastContent}/>}/> 
                <Route path="/home" element={<Private permissions={['admin', 'comercial', 'financeiro']}> <HomeComercial /> </Private>} />
                <Route path="/cadastro/cliente" element={<Private  permissions={['admin', 'comercial']}> <CadastroCliente toastContent={setToastContent}/> </Private>} />
                <Route path="/cadastro/funcionario" element={<Private permissions={['admin']}> <CadastroFuncionario toastContent={setToastContent}/> </Private>} />
                <Route path="/cadastro/venda" element={<Private permissions={['admin', 'comercial']}> <CadastroVenda toastContent={setToastContent} /> </Private>} />
                <Route path="/listagem/venda" element={<Private permissions={['admin', 'comercial', 'financeiro']}> <ListagemVendas toastContent={setToastContent}/> </Private>} />
                <Route path="/listagem/cliente" element={<Private permissions={['admin', 'comercial']}> <ListaCliente toastContent={setToastContent}/> </Private>} />
                <Route path="/relatorios" element={<Private permissions={['admin', 'financeiro']}> <HomeRelatorios toastContent={setToastContent}/> </Private>} />
            </Routes>
        </AuthProvider>
        <Toast ref={toast} />
    </div>
  );
};

export default Rotas;