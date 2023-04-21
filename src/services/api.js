import axios from "axios";


axios.defaults.headers.common = {
  "Content-Type": "application/json"
}
//api client
export const apiClient = axios.create({
  baseURL: "http://localhost:8080"
})

//api purchases
export const apiPurchases = axios.create({
  baseURL: "http://localhost:8081"
})

export const createSession = async (Cpf, Password) => {
  const Autenticação = { login: `${Cpf}`, password: `${Password}` }
  return apiClient.post('/login', Autenticação );
}