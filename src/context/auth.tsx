import React, { useState, useRef, createContext, useEffect} from 'react';

import { useNavigate } from 'react-router-dom'
import { apiClient, apiPurchases, createSessionClient, createSessionPurchases } from '../services/api'
import { Toast } from 'primereact/toast';
import Login from '../pages/Login';
import { Cpf } from '../pages/CadastroVenda/defaultStyles';


interface AuthContextData {
  authenticated: boolean;
  user: any;
  loading: boolean;
  role: string;
  login: (Cpf: string, Password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('')



  useEffect(() => {
    const tokenClient = localStorage.getItem("tokenClient")
    const tokenPurchases = localStorage.getItem("tokenPurchases")
    const role_act = localStorage.getItem("roleActually")

  

    if(tokenClient && tokenPurchases && role_act) {
      apiClient.defaults.headers.Authorization = `Bearer ${tokenPurchases}`;
      setAuthenticated(true)
      setRole(role_act)


    }
    
    setLoading(false)
  },[])


  const login = async (Cpf: any, Password: any) => {

    const responseClient = await createSessionClient(Cpf, Password);
    const responsePurchases = await createSessionPurchases(Cpf, Password);

    console.log(responseClient)
    console.log(responsePurchases)

    const tokenClient = responseClient.data;
    const tokenPurchases = responsePurchases.data;

    console.log(`Client: ${tokenClient}`)
    console.log(`Purcheses: ${tokenPurchases}`)

   

    localStorage.setItem("tokenClient", tokenClient);
    localStorage.setItem("tokenPurchases", tokenPurchases);
    apiClient.defaults.headers.Authorization = `Bearer ${tokenPurchases}`



    async function response () {
      const emplooyesReturned: any =  await apiClient.get('funcionario', {
          headers: { 
              'Authorization': `Bearer ${tokenClient}`
          },
      })

      const funcs = emplooyesReturned.data
      funcs.map(func=> {
        if(func['cpf'] === Cpf){
          setRole(func['role'])
          let role_atual = func['role']
          localStorage.setItem("roleActually", role_atual)
        }
      })
      navigate('/home')
  }




    setUser(tokenPurchases)
    setAuthenticated(true)
    response()

  };


  if(loading) {
    return <h1>Loading...</h1>
  }

  const logout = () => {

    localStorage.removeItem('tokenClient');
    localStorage.removeItem('tokenPurchases');
    localStorage.removeItem('roleActually')
    apiClient.defaults.headers.Authorization = undefined
    apiPurchases.defaults.headers.Authorization = undefined
    setUser(null);
    setRole('');
    setAuthenticated(false);
    navigate('/');
   
  };


  return (
    <AuthContext.Provider value={{ authenticated, user, loading, role, login, logout }}>
      {children}
    </ AuthContext.Provider>
  )
}