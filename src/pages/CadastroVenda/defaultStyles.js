import styled from "styled-components"

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const Cards = styled.div`
    height: 100%;
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
    height: 70%;
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