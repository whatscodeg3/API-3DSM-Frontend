import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Title, Inputs, ButtonStyled } from "./defaultStyles"

// Img
import Logo from "../../assets/img/Logo.svg"

const Login: React.FC = () => {
	const [ValueRedirect, setRedirect] = useState(false)
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data : any) => {

        console.log(data)
        setRedirect(true)
        window.alert("Login realizado com sucesso !")
    }

    useEffect(() => {
		if (ValueRedirect) {
			navigate('/home');
		}
	  }, [ValueRedirect, navigate]);

    return (
        <>
            <GlobalStyle />

            <Container>
                <Cards onSubmit={handleSubmit(onSubmit)}>

                        <Title>
                            <img src={Logo} alt="Imagem da Logo" />
                            <h2>Login</h2>
                        </Title>
                        <Inputs type="text" name="Cpf" placeholder="Digite seu CPF... " mask="999.999.999-99" required {...register("Cpf")} />
                        <Inputs type="text" name="Password" placeholder="Digite sua senha..." required {...register("Password")}/>
                        <ButtonStyled>Logar</ButtonStyled>
                </Cards>
            </Container>
        </>
    )

}

export default Login;