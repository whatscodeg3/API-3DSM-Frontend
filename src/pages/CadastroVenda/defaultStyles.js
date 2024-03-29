import styled from "styled-components"
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import InputMask from 'react-input-mask';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    font-family: "Ubuntu";
    overflow-x: hidden;
`;

export const Cards = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 100px;
    font-family: Ubuntu;

    @media(max-width: 1200px){
        flex-direction: column;
        justify-content: space-between;
        margin-top: 100px;
    }       
`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #F18524;
    gap: 30px;
    font-family: Ubuntu;
`;

export const Cpf = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #F18524;
    gap: 45px;
    font-family: Ubuntu;

`;

export const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-family: Ubuntu;
`;

export const Line = styled.div`
    position: absolute;
    width: 40%;
    height: 0%;
    border: 1.5px solid #333333;
    transform: rotate(90deg);

    @media(max-width: 1200px){
        display: none;
    }
`;

export const StyledInputText = styled(InputText)`
    color: ${props => props.inputColor ? props.inputColor : "#F35416"};
    border: none;
    font-size: 20px;
    padding-left: 30px;
`

export const StyledParcelas = styled(InputNumber)`
  .p-inputnumber-button {
    background-color: white !important;
    color: black !important;
    border: none;
  }
`;

export const StyledCpf = styled(InputNumber)`
    text-align: center; 
    font-family: Ubuntu;
`;

export const StyledBotaoCadastro = styled(Button)`
    background-color: #F18524 !important;
    border: none;
    font-family: Ubuntu;
`;

export const Titulo = styled.h1`
    font-family: Ubuntu;
    height: 50px;
    margin-top:0;
    color: #F18524;
`;

export const Label = styled.label`
    font-size: 20px;
    font-family: Ubuntu;
`;

export const InputFieldMask = styled(InputMask)`
    width: 430px;
    height: 50px;
    padding-left: 30px;
    font-size: 20px;
    font-family: Ubuntu;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;
    outline: none;
    borderBottom: 'transparent';
`;

export const ImageBack = styled.img`
    position: fixed;
    top: 0%;
    left: 0%;
    transform: rotateY(180deg);

    :hover {
        transform: rotateY(180deg) scale(1.1);
        transition: all 0.5s;
    }
`;