import styled from "styled-components"

export const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    
    width: 17vw;
    height: 20vh;
    
    color: #333333;
    font-size: max(1.7vw , min(20px));
    font-family: 'Ubuntu', sans-serif;
    background: #FFFFFF;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    
    cursor: pointer;
    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;

export const PersonImage = styled.img`
    max-width: 70px;
`;