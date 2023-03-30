import styled from "styled-components"
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const Cards = styled.div`
    height: 100%;
    widht: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 100px;
    border: 10.5px solid #333333;

`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #F18524;
    gap: 30px;
`;

export const Cpf = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #F18524;
    gap: 30px;
`;

export const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const Line = styled.div`
    position: absolute;
    width: 40%;
    height: 0%;
    border: 1.5px solid #333333;
    transform: rotate(90deg);
`;

export const StyledParcelas = styled(InputNumber)`
  .p-inputnumber-button {
    background-color: white !important;
    color: black !important;
    border: none;
  }
`;

export const StyledCpf = styled(InputNumber)`
    text-align: center; 
`;

export const StyledBotaoCadastro = styled(Button)`
    background-color: #F18524 !important;
    border: none;
`;

export const Titulo = styled.h1`
    font-family: Ubuntu;
    height: 50px;
    margin-top:0;

    color: #F18524;
`;

export const Label = styled.label`
    font-size: 20px;
`;