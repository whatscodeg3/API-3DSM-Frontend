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
  const [loading, setLoading] = useState(false);

  const login = async (Cpf: any, Password: any) => {

    const responseClient = await createSessionClient(Cpf, Password);
    const responsePurchases = await createSessionPurchases(Cpf, Password);

    const tokenClient = responseClient.data;
    const tokenPurchases = responsePurchases.data;

    //console.log(`Client: ${tokenClient}`)
    //console.log(`Purchases: ${tokenPurchases}`)

    localStorage.setItem("tokenClient", tokenClient);
    localStorage.setItem("tokenPurchases", tokenPurchases);
    apiClient.defaults.headers.Authorization = `Bearer ${tokenClient}`

    navigate('/home')

  };

  const logout = () => {

    localStorage.removeItem('tokenClient');
    localStorage.removeItem('tokenPurchases');
    apiClient.defaults.headers.Authorization = undefined
    apiPurchases.defaults.headers.Authorization = undefined
    navigate('/');
  };
  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </ AuthContext.Provider>
  )
}