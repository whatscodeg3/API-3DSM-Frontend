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