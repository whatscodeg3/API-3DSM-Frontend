import React, { useState, useContext, useRef, useEffect  } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/auth';
import { apiClient, apiPurchases } from "../../services/api";
// import { Toast } from 'primereact/toast';


// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Title, InputCpf, InputPassword, ButtonStyled, PasswordStyled, Teste } from "./defaultStyles"

// Img
import Logo from "../../assets/img/Logo.svg"
import EyeOpen from "../../assets/img/eye-fill.svg"
import EyeClosed from "../../assets/img/eye-slash-fill.svg"
import ToastProps from "../../interfaces/selfInterfaces";



const Login: React.FC<ToastProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const { register, handleSubmit } = useForm();
    const toast = useRef(null);
    const [user, setUser] = useState(null);



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
        const CpfParaVerificar = String(data.Cpf.replace(/\D/g, ''));
        const Password = String(password);
        try{
            await login(CpfParaVerificar, Password);
            props.toastContent({severity:'success', summary: 'Successo', detail:'Login realizado com sucesso', life: 3000})
        }catch{
            props.toastContent({severity:'error', summary: 'Erro', detail:'Credencial inserida inválida', life: 3000});
        }
        
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