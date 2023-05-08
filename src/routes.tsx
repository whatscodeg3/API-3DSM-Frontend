import React, { useContext, useRef } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate, useNavigate } from "react-router-dom";
import {Toast} from 'primereact/toast'

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListagemCliente";
import HomeRelatorios from "./pages/HomeRelatorios";
import Login from "./pages/Login";



// Permissions
import { PermissionGateRoutes } from "./context/permission-gate";

const Rotas: React.FC = () => {  
  const toast = useRef(null)
  const setToastContent = (content) =>{
    toast.current.show(content)
  }

  const Private = ({ children, permissions }) => {
    const { authenticated } = useContext(AuthContext);
    const hasPermission = PermissionGateRoutes(permissions)


    //esqueminha pra não resetar rotas depois de logado (ele verifica se tem um token criado)
    if(localStorage.getItem("tokenPurchases") != null) {
      console.log('tem um token, esta logado!')
      return hasPermission ? children : <Navigate to='/home' />
    }
  
    console.log('não tem um token !')
    return <Navigate to='/' />
   
  }


  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login toastContent={setToastContent}/>}/> 
                <Route path="/home" element={<Private permissions={['admin', 'comercial', 'financeiro']}><HomeComercial /></Private>} />
                <Route path="/cadastro/cliente" element={<Private permissions={['admin', 'comercial']}><CadastroCliente /></Private>} />
                <Route path="/cadastro/venda" element={<Private permissions={['admin', 'comercial']}><CadastroVenda toastContent={setToastContent} /></Private>} />
                <Route path="/listagem/venda" element={<Private permissions={['admin', 'comercial', 'financeiro']}><ListagemVendas /></Private>} />
                <Route path="/listagem/cliente" element={<Private permissions={['admin', 'comercial']}><ListaClienteUsuario/></Private>} />
                <Route path="/relatorios" element={<Private permissions={['admin', 'financeiro']}><HomeRelatorios/></Private>} />
            </Routes>
        </AuthProvider>
        <Toast ref={toast} />
    </div>
  );
};

export default Rotas;