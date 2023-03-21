import styled from "styled-components"

export const Container = styled.div`
    width: 100vw;
    height: 90vh;
`;

export const MainBlock = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.p`
    color: #333333;
    font-size: 35px;
    font-family: 'Ubuntu', sans-serif;
`;

export const Cards = styled.div` 
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
`;
