import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom'
import { apiClient, apiPurchases, createSession } from '../services/api'

interface AuthContextData {
  authenticated: boolean;
  user: any;
  loading: boolean;
  login: (Cpf: number, Password: number) => Promise<void>;
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

  const login = async (email: any, senha: any) => {
    const response = await createSession(email, senha);
    console.log(response.data);


    const loggedUser = response.data;
    const token = response.data.token;

    delete loggedUser.token;

    console.log(loggedUser);
    console.log(JSON.stringify(loggedUser))

    apiClient.defaults.headers.Authorization = `Bearer ${token}`


    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    setUser(loggedUser);
    const adminVerification = 'admin' || 'administrador' || 'adm';
    if (loggedUser.nome.toLowerCase() === adminVerification) {
      navigate("/home");
    }
    else {
      navigate(`${loggedUser.id}`);
    }
  };

  const logout = () => {

    localStorage.removeItem('user');
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