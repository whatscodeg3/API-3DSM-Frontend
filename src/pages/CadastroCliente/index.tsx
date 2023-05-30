import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { apiClient } from "../../services/api";

// Styles
import { GlobalStyle } from "./globalStyles";
import {
  Container,
  MainBlock,
  Fields,
  InputField,
  InputFieldError,
  InputFieldMask,
  InputFieldMaskError,
  Title,
  ImageBack,
  ButtonSubmit,
} from "./defaultStyles";

// Mask
import InputMask from "react-input-mask"

// Img
import IconBack from "../../assets/img/IconBack.svg";
import ToastProps from "../../interfaces/selfInterfaces";

const CadastroCliente: React.FC<ToastProps> = (props) => {
    const tokenClient = localStorage.getItem("tokenClient");
    const tokenPurchases = localStorage.getItem("tokenPurchases");

    const [cpfExistsError, setCpfError] = useState(false);
    const [emailExistsError, setEmailError] = useState(false);
    const [invalidCpfError, setInvalidCpfError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);

    const { register, handleSubmit, setValue, setFocus } = useForm();
    
    const navigate = useNavigate();
    const onSubmit = async (value) => {
      let cpf = value["cpf"].replace(/\D/g, "")
      let formatJson = {
        fullName: value["fullName"],
        cpf: cpf,
        email: value["email"],
        telephone: value["telephone"],
        birthDate: value["birthDate"],
        address: {
            cep: value["cep"],
            publicPlace: value["publicPlace"],
            number: value["numero"],
            neighborhood: value["neighborhood"],
            city: value["city"],
            state: value["state"],
            complement: value["complement"],
        },
      };

      try{
          if(
            cpfExistsError === false && 
            invalidCpfError === false && 
            emailExistsError === false && 
            invalidEmailError === false 
            ){
            await apiClient.post("/client/create", formatJson, {
              headers: {
                  Authorization: `Bearer ${tokenClient}`,
              },
          }).then(response => {
            props.toastContent({severity:'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!', life: 3000})
            navigate("/home");
          }).catch((error) => {
            props.toastContent({severity:'error', summary: 'Erro', detail: 'Erro ao Cadastrar o Cliente!', life: 3000});
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
    
  const checkCEP = (value) => {
      const cep = value.target.value.replace(/\D/g, "");
      fetch(`http://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("publicPlace", data.logradouro);
        setValue("state", data.uf);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setFocus("numero");
      });
  };
  
  const checkCpf = async (event) => {
    const response = await apiClient.get("/client/query", {
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
    const response = await apiClient.get("/client/query", {
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

  return (
    <>
      <GlobalStyle />

      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title>Cadastro de Cliente</Title>
        <MainBlock>
          <Fields>
            <InputField
              type="text"
              name="nome"
              placeholder="Nome Completo"
              required
              {...register("fullName")}
            />
            {cpfExistsError || invalidCpfError ? 
            <>
              <InputFieldMaskError
                mask="999.999.999-99"
                type="text"
                name="cpf"
                placeholder="CPF"
                required
                {...register("cpf")}
                onBlur={checkCpf}
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
              mask="999.999.999-99"
              type="text"
              name="cpf"
              placeholder="CPF"
              required
              {...register("cpf")}
              onBlur={checkCpf}
            /> }
            {emailExistsError || invalidEmailError ? 
              <>
                <InputFieldError
                  type="text"
                  name="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                  onBlur={checkEmail}
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
                  type="text"
                  name="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                  onBlur={checkEmail}
              />
            }
            <InputFieldMask
              type="text"
              name="telefone"
              mask="(99) 99999-9999"
              placeholder="Telefone"
              required
              {...register("telephone")}
            />
            <InputField
              type="date"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              required
              {...register("birthDate")}
            />

            <InputFieldMask
              mask="99999-999"
              type="text"
              name="cep"
              placeholder="CEP"
              required
              {...register("cep")}
              onBlur={checkCEP}
            />
          </Fields>

          <Fields>
            <InputField
              type="text"
              name="logradouro"
              placeholder="Logradouro(rua, avenida, ...)"
              required
              {...register("publicPlace")}
            />
            <InputField
              type="text"
              name="estado"
              placeholder="Estado"
              required
              {...register("state")}
            />
            <InputField
              type="text"
              name="bairro"
              placeholder="Bairro"
              required
              {...register("neighborhood")}
            />
            <InputField
              type="text"
              name="cidade"
              placeholder="Cidade"
              required
              {...register("city")}
            />
            <InputField
              type="text"
              name="numero"
              placeholder="Número *"
              required
              {...register("numero")}
            />
            <InputField
              type="text"
              name="complemento"
              placeholder="Complemento"
              {...register("complement")}
            />
          </Fields>
        </MainBlock>

        <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>

        <Link to={"/home"} style={{ textDecoration: "none" }}>
          <ImageBack src={IconBack} alt="IconBack" />
        </Link>
      </Container>
    </>
  );
}

export default CadastroCliente;
