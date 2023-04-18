import styled from "styled-components"

export const Title = styled.p`
    color: #333333;
    font-size: 35px;
    font-family: 'Ubuntu', sans-serif;
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