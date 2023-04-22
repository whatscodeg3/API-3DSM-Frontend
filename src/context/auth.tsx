import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom'
import { apiClient, apiPurchases, createSessionClient, createSessionPurchases } from '../services/api'

interface AuthContextData {
  authenticated: boolean;
  user: any;
  loading: boolean;
  login: (Cpf: string, Password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) setUser(JSON.parse(recoveredUser));

    setLoading(false);
  }, [])

  const login = async (Cpf: any, Password: any) => {

    const responseClient = await createSessionClient(Cpf, Password);
    const responsePurchases = await createSessionPurchases(Cpf, Password);

    const tokenClient = responseClient.data;
    const tokenPurchases = responsePurchases.data;

    console.log(tokenClient)
    console.log(tokenPurchases)

    localStorage.setItem("tokenClient", tokenClient);
    localStorage.setItem("tokenPurchases", tokenPurchases);

    navigate('/home')
    
  };

  const logout = () => {

    localStorage.removeItem('token');
    apiClient.defaults.headers.Authorization = null;
    setUser(null);
    navigate('/');
  };
  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </ AuthContext.Provider>
  )
}