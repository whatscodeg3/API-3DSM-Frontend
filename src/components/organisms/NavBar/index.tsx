import React from "react";
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

// Styles
import { Nav, ImgLogo, Name, NavLeft, ImgLogout} from "./defaultStyles"

// Img
import Logo from "../../../assets/img/Logo.svg"
import Logout from "../../../assets/img/IconLogout.svg"

const NavBar : React.FC = () => {
    const { logout } = useContext(AuthContext);
  
    const handleLogoutClick = () => {
      logout();
    }


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
                <ImgLogout src={Logout} alt="" onClick={handleLogoutClick} />
            </Nav>
        </>
    )

}

export default NavBar;