import styled from "styled-components"

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 10vh;

    background: #FFFFFF;
    box-shadow: 0px 7px 5px rgba(0, 0, 0, 0.25);
`;

export const NavLeft = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const ImgLogo = styled.img`
    padding: 20px;
`;

export const ImgLogout = styled.img`
    display: none; // Próximas Sprints
    padding: 20px;
    cursor: pointer;
`;

export const Name = styled.p`
    display: none; // Próximas Sprints
    color: #F35416;
    font-family: 'Work Sans', sans-serif;
    font-size: 25px;
`;