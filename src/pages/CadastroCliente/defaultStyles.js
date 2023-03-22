import styled from "styled-components"

export const Container = styled.form`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.p`
    color: #F18524;
    font-size: 35px;
    font-family: 'Ubuntu', sans-serif;

    margin: 0px;
`;

export const MainBlock = styled.div`
    width: 100vw;
    height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const InputField = styled.input`
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
    right: 10px;

    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;

