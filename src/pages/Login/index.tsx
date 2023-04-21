import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Title, InputCpf, InputPassword, ButtonStyled, PasswordStyled, Teste } from "./defaultStyles"

// Img
import Logo from "../../assets/img/Logo.svg"
import EyeOpen from "../../assets/img/eye-fill.svg"
import EyeClosed from "../../assets/img/eye-slash-fill.svg"

const Login: React.FC = () => {
	const [ValueRedirect, setRedirect] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data : any) => {

        const ObjetoComSenha: any = { Cpf : data.Cpf}
        ObjetoComSenha.Password = password

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
                        <InputCpf type="text" name="Cpf" placeholder="Digite seu CPF... " mask="999.999.999-99" required {...register("Cpf")} />
                        <PasswordStyled>
                            <InputPassword type={showPassword ? "text" : "password"} value={password} name="Password" placeholder="Digite sua senha..." required onChange={handlePasswordChange}/>
                            <Teste src={showPassword ? EyeOpen : EyeClosed} alt={showPassword ? "Esconder senha" : "Mostrar senha"} onClick={toggleShowPassword}/>
                        </PasswordStyled>
                        <ButtonStyled>Logar</ButtonStyled>
                </Cards>
            </Container>
        </>
    )

}

export default Login;