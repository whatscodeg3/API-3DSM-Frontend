import styled from "styled-components"

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

