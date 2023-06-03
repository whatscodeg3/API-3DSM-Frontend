import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate } from "react-router-dom";
import axios from "axios";

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaCliente from "./pages/ListagemCliente";
import HomeRelatorios from "./pages/HomeRelatorios";
import ListaFuncionarios from "./pages/ListagemFuncionarios";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import CadastroFuncionario from "./pages/CadastroFuncionario";
import { PermissionGateRoutes } from "./context/permission-gate";

const Rotas: React.FC = () => {
  const toast = useRef(null)
  const setToastContent = (content) =>{
    toast.current.show(content)
  }

  const [redirect, setRedirect] = useState(true);
  const Private = ({ children, permissions }) => {
    const { authenticated } = useContext(AuthContext);
    const hasPermissions = PermissionGateRoutes(permissions)
  
    if (authenticated && hasPermissions && redirect == true) {
      return children
    } else if (authenticated && hasPermissions==false) {
      return <Navigate to='/home' />
    } else {
      setRedirect(true)
      return <Navigate to='/' />
    }
  }

  const tokenClient = localStorage.getItem("tokenClient");
  const tokenPurchases = localStorage.getItem("tokenPurchases");
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:8080/check", {
          headers: {
            Authorization: `Bearer ${tokenClient}`,
          },
        }).catch((error) => {
            setRedirect(false); 
        });

      axios.get("http://localhost:8081/check", {
          headers: {
            Authorization: `Bearer ${tokenPurchases}`,
          },
        }).catch((error) => {
            setRedirect(false); 
        });
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [redirect]); 

  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login toastContent={setToastContent}/>}/> 
                <Route path="/home" element={<Private permissions={['Administrador', 'Comercial', 'Financeiro']}> <HomeComercial /> </Private>} />
                <Route path="/cadastro/cliente" element={<Private  permissions={['Administrador', 'Comercial']}> <CadastroCliente toastContent={setToastContent}/> </Private>} />
                <Route path="/cadastro/funcionario" element={<Private permissions={['Administrador']}> <CadastroFuncionario toastContent={setToastContent}/> </Private>} />
                <Route path="/cadastro/venda" element={<Private permissions={['Administrador', 'Comercial']}> <CadastroVenda toastContent={setToastContent} /> </Private>} />
                <Route path="/listagem/venda" element={<Private permissions={['Administrador', 'Comercial', 'Financeiro']}> <ListagemVendas toastContent={setToastContent}/> </Private>} />
                <Route path="/listagem/cliente" element={<Private permissions={['Administrador', 'Comercial']}> <ListaCliente toastContent={setToastContent}/> </Private>} />
                <Route path="/listagem/funcionario" element={<Private permissions={['Administrador']}> <ListaFuncionarios toastContent={setToastContent}/> </Private>} />
                <Route path="/relatorios" element={<Private permissions={['Administrador', 'Financeiro']}> <HomeRelatorios toastContent={setToastContent}/> </Private>} />
            </Routes>
        </AuthProvider>
        <Toast ref={toast} />
    </div>
  );
};

export default Rotas;