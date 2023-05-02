import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        width: 100vw;
        height: 100vh;
        margin: 0%;
        padding: 0%;

        background-color: #F5F6FA;
        display: flex;
        justify-content: center;
        align-items: center;
        @media(max-width: 1230px){
            width: 100%;
            height: 100%;

            padding-top: 100px;
        }
    }
`;