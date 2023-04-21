import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom'
import { apiClient, apiPurchases, createSession } from '../services/api'

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
    const response = await createSession(Cpf, Password);
    console.log(response.data);


    const token = response.data;

    console.log(JSON.stringify(token))

    apiClient.defaults.headers.Authorization = `Bearer ${token}`
    localStorage.setItem("token", token);
    
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