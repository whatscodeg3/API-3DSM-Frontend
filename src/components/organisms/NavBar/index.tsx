import React from "react";

// Styles
import { Nav, ImgLogo, Name, NavLeft, ImgLogout } from "./defaultStyles"

// Img
import Logo from "../../../assets/img/Logo.svg"
import Logout from "../../../assets/img/IconLogout.svg"

const NavBar : React.FC = () => {
    return (
        <>
            <Nav>
                <NavLeft>
                    <a href="https://www.pro4tech.com.br/index.html" target="_blank">
                        <ImgLogo src={Logo} alt="" />
                    </a>
                    <Name>
                        Matheus Oliveira dos Santos
                    </Name>
                </NavLeft>
                <ImgLogout src={Logout} alt="" />
            </Nav>
        </>
    )

}

export default NavBar;