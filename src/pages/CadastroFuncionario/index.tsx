import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { apiClient, apiPurchases } from "../../services/api";

// Styles
import { GlobalStyle } from "./globalStyles";
import { Container, Card, InputField, InputFieldError, InputFieldMask, InputFieldMaskError, Title, ImageBack, StyledBotaoCadastro, Select } from "./defaultStyles";

// Mask
import InputMask from "react-input-mask"

// Img
import IconBack from "../../assets/img/IconBack.svg";


const CadastroFuncionario: React.FC = () => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");

    const [permissao, setPermissao] = useState("");
    const [cpfExistsError, setCpfError] = useState(false);
    const [disable, setDisable] = useState(true)
    const [emailExistsError, setEmailError] = useState(false);
    const [invalidCpfError, setInvalidCpfError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);

    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();
    const onSubmit = async (value) => {
      let cpf = value["cpf"].replace(/\D/g, "")
      let formatJson = {
        name: value["name"],
        email: value["email"],
        cpf: cpf,
        role: permissao,
        password: value["password"]
      };

      try{
          if(
            cpfExistsError === false && 
            invalidCpfError === false && 
            emailExistsError === false && 
            invalidEmailError === false 
            ){
            await apiClient.post("/employee", formatJson, {
              headers: {
                  Authorization: `Bearer ${tokenClient}`,
              },
          }).then((response) => {
            window.alert("Cadastrado com sucesso !")
            navigate("/home");
          }).catch((error) => {
            window.alert("Erro ao cadastrar !")
          })
          }
      } catch(error) {
        if(error.response.data["cpf"] == undefined){
          setInvalidEmailError(true)
        }else{
          setInvalidCpfError(true)
        }
      }
    };
    
    const checkCpf = async (event) => {
      const response = await apiClient.get("/employee", {
        headers: {
            Authorization: `Bearer ${tokenClient}`,
        },
      });

      let data = response.data
      let value = event.target.value
      let cpf = value.replace(/\D/g, "")
      
      let setter = false
      if(data.length){
        data.forEach(e => {
          if(cpf == e["cpf"]){
            setter = true
          } else if(cpf != e["cpf"]){
            setCpfError(false)
          }
        });
        if(setter){
          setCpfError(true)
        }
      }else{
        setCpfError(false)
      }
    }

    const checkEmail = async (event) => {
      const response = await apiClient.get("/employee", {
        headers: {
            Authorization: `Bearer ${tokenClient}`,
        },
      });
      
      let data = response.data
      let value = event.target.value
      
      let setter = false
      if(data.length){
        data.forEach(e => {
          if(value == e["email"]){
            setter = true
          } else if(value != e["email"]){
            setEmailError(false)
          }
        });
        if(setter){
          setEmailError(true)
        }
      }else{
        setEmailError(false)
      }
    }

  const handlePermissaoSet = (event) => {
    if(event.target.value == "Tipo"){
      setDisable(true)
    } else {
      setDisable(false)
      setPermissao(event.target.value);
    }
  } 

  return (
    <>
      <GlobalStyle />

      <Container onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Title>Cadastro de Funcionario</Title>
          <InputField type="text" name="nome" placeholder="Nome Completo" required {...register("name")} />

          {cpfExistsError || invalidCpfError ? 
            <>
              <InputFieldMaskError mask="999.999.999-99"  type="text" name="cpf" placeholder="CPF" required {...register("cpf")} onBlur={checkCpf} 
                onClick={() => { setCpfError(false), setInvalidCpfError(false) }}
              />
              <p style={{
                  margin: "0px", 
                  padding: "0px",
                  color: "red",
                  fontFamily: "Ubuntu, sans-serif" 
                }}>{cpfExistsError ? "CPF já cadastrado" : invalidCpfError ? "CPF inválido" : null}
              </p>
            </>
            :
            <InputFieldMask
              mask="999.999.999-99" type="text" name="cpf" placeholder="CPF" required {...register("cpf")} onBlur={checkCpf}
            /> 
          }

          {emailExistsError || invalidEmailError ? 
              <>
                <InputFieldError
                  type="text" name="email" placeholder="Email" required {...register("email")} onBlur={checkEmail}
                  onClick={() => { setEmailError(false), setInvalidEmailError(false) }}
                />
                <p style={{
                      margin: "0px", 
                      padding: "0px",
                      color: "red",
                      fontFamily: "Ubuntu, sans-serif"
                  }}>{emailExistsError ? "Email já cadastrado" : invalidEmailError ? "Email inválido" : null}
                </p>
              </>
            :
              <InputField
                  type="text" name="email" placeholder="Email" required {...register("email")} onBlur={checkEmail}
              />
            } 

            <Select onChange={handlePermissaoSet}>
                <option>Tipo</option>
                <option value={"comercial"}>Comercial</option>
                <option value={"financeiro"}>Financeiro</option>
                <option value={"administrador"}>Administrador</option>
            </Select>

            <InputField
              type="text" name="password" placeholder="Senha" required {...register("password")}
            />
            <StyledBotaoCadastro disabled={disable} type="submit">Cadastrar</StyledBotaoCadastro>
        </Card>

        <Link to={"/home"} style={{ textDecoration: "none" }}>
          <ImageBack src={IconBack} alt="IconBack" />
        </Link>
      </Container>
    </>
  );
}

export default CadastroFuncionario;
