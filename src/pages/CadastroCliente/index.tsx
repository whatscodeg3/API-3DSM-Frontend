import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiClient } from "../../services/api";

// Styles
import { GlobalStyle } from "./globalStyles";
import {
  Container,
  MainBlock,
  Fields,
  InputField,
  InputFieldMask,
  Title,
  ImageBack,
  ButtonSubmit,
} from "./defaultStyles";

// Mask
import InputMask from "react-input-mask"

// Img
import IconBack from "../../assets/img/IconBack.svg";


const CadastroCliente: React.FC = () => {
    const { register, handleSubmit, setValue, setFocus } = useForm();
    
    const navigate = useNavigate();
    const onSubmit = async (value) => {
      let formatJson = {
        fullName: value["fullName"],
        cpf: value["cpf"],
        email: value["email"],
        telephone: value["telephone"],
        birthDate: value["birthDate"],
        address: {
            cep: value["cep"],
            publicPlace: value["publicPlace"] + " " + value["numero"],
            neighborhood: value["neighborhood"],
            city: value["city"],
            state: value["state"],
            complement: value["complement"],
        },
      };
          
      const response = await apiClient.get("/client/query")
      let data = response.data
      let valido = false

      if(data.length != 0){
        await data.forEach(e => {
          if(value["cpf"] == e["cpf"]){
              window.alert("Este CPF já está cadastrado!")
          }else if(value["cpf"] != e["cpf"]){
            valido = true
          }
        });
      }else{
        valido = true
      }
      
      try{
          if(valido == true){
            await apiClient.post("/client/create", formatJson)
            navigate("/");
          }
      } catch(error) {
        if(error.response.data["cpf"] == undefined){
          window.alert(error.response.data["email"])
        }else{
          window.alert(error.response.data["cpf"])
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
            <InputFieldMask
              mask="999.999.999-99"
              type="text"
              name="cpf"
              placeholder="CPF"
              required
              {...register("cpf")}
            />
            <InputField
              type="text"
              name="email"
              placeholder="Email"
              required
              {...register("email")}
            />
            <InputField
              type="text"
              name="telefone"
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
              required
              {...register("complement")}
            />
          </Fields>
        </MainBlock>

        <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>

        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ImageBack src={IconBack} alt="IconBack" />
        </Link>
      </Container>
    </>
  );
}

export default CadastroCliente;
