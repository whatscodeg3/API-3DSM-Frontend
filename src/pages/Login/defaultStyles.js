import styled from "styled-components"
import InputMask from 'react-input-mask';

export const Container = styled.div`
    width: 100vw;
    height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Cards = styled.form` 
    width: 400px; 
    height: 500px; 
    margin: 0 auto; 
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    display: flex;
    flex-direction: column;
    align-items: center
`;

export const Title = styled.div`
    display: flex;
    margin-top: 10%;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    gap: 10px;
    color: #333333;
`

export const Inputs = styled(InputMask)`
    margin-top: 10%;
    width: 270px;
    height: 40px;

    border: none;
    background: #F5F6FA;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    outline: none;
    padding-left: 15px;
`

export const ButtonStyled = styled.button`
    margin-top: 15%;
    width: 180px;
    height: 50px;

    color: #FFFFFF;
    background: #F1841F;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;
    outline: none;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;

    cursor: pointer;
    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;


