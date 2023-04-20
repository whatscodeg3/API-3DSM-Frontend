import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        width: 100vw;
        height: 100vh;
        margin: 0%;
        padding: 0%;
        background-color: #F5F6FA;
        overflow: hidden;
        font-family: Ubuntu;
    }

    .shadow{
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;