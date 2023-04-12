import styled from "styled-components"
import { Button } from "primereact/button";

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

export const ContainerUserInfo = styled.div`
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

export const ButtonVerde = styled(Button)`
    background-color: #00FF00 !important;
    border: none;
    font-family: Ubuntu;
    width: 200px;
    height: 80px;
    font-size: 30px;
    justify-content: center;
    font-weight: 600;
`;

export const ButtonVermelho = styled(Button)`
    background-color: #FF0000 !important;
    border: none;
    font-family: Ubuntu;
    width: 200px;
    height: 80px;
    font-size: 30px;
    justify-content: center;
    font-weight: 600;
`;

export const ImageBack = styled.img`
    position: fixed;
    top: 90%;
    left: 95%;

    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;