import styled from "styled-components"
import InputMask from 'react-input-mask';
import { Button } from "primereact/button";

export const Container = styled.form`
    width: 100vw;
    height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Card = styled.div`
    width: 600px; 
    height: 600px; 
    margin: 0 auto; 
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center
`

export const Title = styled.p`
    color: #F18524;
    display: flex;
    margin-top: 5%;
    margin-bottom: 10%;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    gap: 10px;
    font-family: 'Ubuntu', sans-serif;
`;

export const Select = styled.select`
    min-width: 470px;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 5%;

    padding-left: 30px;

    outline: none;
  
    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;

    background: #F5F6FA;

`;

export const InputField = styled.input`
    min-width: 470px;
    height: 50px;
    margin-bottom: 5%;

    padding-left: 30px;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;
    
    outline: none;
`;

export const InputFieldError = styled.input`
    width: 470px;
    height: 50px;
    margin-bottom: 5%;

    padding-left: 30px;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid red;
    border-radius: 3px;
    
    outline: none;
`;

export const InputFieldMask = styled(InputMask)`
    width: 470px;
    height: 50px;
    margin-bottom: 5%;

    padding-left: 30px;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;
    
    outline: none;
`;

export const InputFieldMaskError = styled(InputMask)`
    width: 470px;
    height: 50px;
    margin-bottom: 5%;

    padding-left: 30px;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid red;
    border-radius: 3px;
    
    outline: none;
`;

export const StyledBotaoCadastro = styled(Button)`
    background-color: #F18524 !important;
    border: none;
    font-family: Ubuntu;
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
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

