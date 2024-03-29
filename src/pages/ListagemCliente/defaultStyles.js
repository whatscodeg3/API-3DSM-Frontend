import styled from "styled-components"
import { Button } from "primereact/button";
import InputMask from 'react-input-mask';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center; 
    padding-top: 15px;
`;


export const Title = styled.h1`
    color: ${props => props.color};
    font-family: Ubuntu;
    font-size: ${props => props.height};
    margin-top:0;
`

export const ContainerUserDelete = styled.div`
    width: 100%;
    height: 100%;
    display: ${props => props.display ? props.display : "flex"};
    gap: 2px;
    align-items: center;

    div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
    }
`;

export const ContainerUserUpdate = styled.form`
    width: 100%;
    height: 100%;
    display: ${props => props.display ? props.display : "flex"};
    gap: 2px;
    display: flex;

    div{
        margin-left: 10px;
        margin-right: 10px;
    }

`;

export const ContainerUserInfo = styled.div`
    width: 100%;
    height: 100%;
    display: ${props => props.display ? props.display : "flex"};
    flex-direction: ${props => props.flexDirection ? props.flexDirection : "column"};
    gap: 2px;
    align-items: center;

    div{
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
    }

    input{
        display: flex;
        color: ${props => props.inputColor ? props.inputColor : "#F35416"};
        background: ${props => props.background ? props.background : "#ECECEC"};
        width: ${props => props.width ? props.width : "100%"};
        height: ${props => props.height ? props.height : "50px"};
        border: none;
        font-size: 20px;
        padding-left: 10px;
    }

    label{
        color: ${props => props.labelColor ? props.labelColor : "#696969"};
        padding-top: 20px;
        padding-left: 10px;
        font-size: 20px
    }
`;

export const StyledInput = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

export const InputField = styled.input`
    width: 470px;
    height: 50px;

    padding-left: 30px;

    background-color: #F5F6FA;
    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;
    outline: none;
`;

export const InputFieldMask = styled(InputMask)`
    width: 470px;
    height: 50px;

    padding-left: 30px;

    background-color: #F5F6FA;
    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    border: none;
    border-bottom: 4px solid #696969;
    border-radius: 3px;
    outline: none;
`;

export const ButtonVerde = styled(Button)`
    background-color: #4CAF50 !important;
    border: none;
    font-family: Ubuntu;
    width: 200px;
    height: 80px;
    font-size: 30px;
    justify-content: center;
    font-weight: 600;
`;

export const ButtonVermelho = styled(Button)`
    background-color: #FF5252 !important;
    border: none;
    font-family: Ubuntu;
    width: 200px;
    height: 80px;
    font-size: 30px;
    justify-content: center;
    font-weight: 600;
`;

export const ButtonSubmit = styled.button`
    width: 180px;
    height: 50px;

    color: #FFFFFF;
    background: #F1841F;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;

    cursor: pointer;
    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
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