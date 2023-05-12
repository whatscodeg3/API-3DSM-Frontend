import React, { useContext, useRef } from "react";
import { AuthProvider, AuthContext } from './context/auth'
import { Route, Routes, Router, Navigate } from "react-router-dom";

// Pages
import HomeComercial from "./pages/HomeComercial/index";
import ListagemVendas from "./pages/ListagemVendas";
import CadastroVenda from "./pages/CadastroVenda/index";
import CadastroCliente from "./pages/CadastroCliente";
import ListaClienteUsuario from "./pages/ListagemCliente";
import HomeRelatorios from "./pages/HomeRelatorios";
import Login from "./pages/Login";
import { Toast } from "primereact/toast";
import CadastroFuncionario from "./pages/CadastroFuncionario";

const Rotas: React.FC = () => {
  const toast = useRef(null)
  const setToastContent = (content) =>{
    toast.current.show(content)
  }

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    return authenticated ? children : <Navigate to='/' />
  }



  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login toastContent={setToastContent}/>} />
                <Route path="/home" element={<Private><HomeComercial/></Private>} />
                <Route path="/cadastro/cliente" element={<Private><CadastroCliente toastContent={setToastContent}/></Private>} />
                <Route path="/cadastro/funcionario" element={<Private><CadastroFuncionario toastContent={setToastContent}/></Private>} />
                <Route path="/cadastro/venda" element={<Private><CadastroVenda toastContent={setToastContent}/></Private>} />
                <Route path="/listagem/venda" element={<Private><ListagemVendas /></Private>} />
                <Route path="/listagem/cliente" element={<Private><ListaClienteUsuario/></Private>} />
                <Route path="/relatorios" element={<Private><HomeRelatorios/></Private>} />
            </Routes>
        </AuthProvider>
        <Toast ref={toast} />
    </div>
  );
};

export default Rotas;