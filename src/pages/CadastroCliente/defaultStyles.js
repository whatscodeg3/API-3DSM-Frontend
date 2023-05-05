import styled from "styled-components"
import InputMask from 'react-input-mask';

export const Container = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4vw;
    @media(max-width: 1230px){
        gap: 50px;
    }
    @media(max-height: 730px){
        gap: 20px;
    }
`;

export const Title = styled.p`
    color: #F18524;
    font-size: 35px;
    font-family: 'Ubuntu', sans-serif;

    margin: 0px;
`;

export const MainBlock = styled.div`
    width: 100%;
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;

    @media(max-width: 1230px){
        flex-direction: column;
        gap: 30px;
    }
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const InputField = styled.input`
    min-width: 470px;
    height: 50px;

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

    padding-left: 30px;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    background: #F5F6FA;
    border: none;
    border-bottom: 4px solid red;
    border-radius: 3px;
    
    outline: none;
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

