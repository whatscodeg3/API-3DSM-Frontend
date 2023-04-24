import React, { useState, useContext  } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Title, InputCpf, InputPassword, ButtonStyled, PasswordStyled, Teste } from "./defaultStyles"

// Img
import Logo from "../../assets/img/Logo.svg"
import EyeOpen from "../../assets/img/eye-fill.svg"
import EyeClosed from "../../assets/img/eye-slash-fill.svg"

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const { register, handleSubmit } = useForm();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    interface AuthContextData {
        authenticated: boolean;
        login: (Cpf: string, Password: string) => Promise<void>;
      }

    const { authenticated, login } = useContext<AuthContextData>(AuthContext);

    const onSubmit = async (data : any) => {
        const Cpf = String(data.Cpf)
        const Password = String(password);
        await login(Cpf, Password);
        
        window.alert("Login realizado com sucesso !")
    }

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