import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, MainBlock, Fields, InputField, Title, ImageBack, ButtonSubmit } from "./defaultStyles"

// Img
import IconBack from "../../assets/img/IconBack.svg"

function CadastroCliente() {

    const {register, handleSubmit, setValue, setFocus} = useForm();

    const onSubmit = (value) => {
        console.log(value)
    }

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        console.log(cep)
        fetch(`http://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            console.log(data)
            setValue('logradouro', data.logradouro)
            setValue('estado', data.uf)
            setValue('bairro', data.bairro)
            setValue('cidade', data.localidade)
            setFocus('numero')
        })
    }

    return (
        <>
            <GlobalStyle />

            <Container onSubmit={handleSubmit(onSubmit)}>
                <Title>
                    Cadastro de Cliente
                </Title>
                <MainBlock>
                    <Fields>
                        <InputField 
                            type="text" 
                            name="nome" 
                            placeholder="Nome Completo"
                            {...register("nome")}
                        />
                        <InputField 
                            type="text" 
                            name="cpf" 
                            placeholder="CPF"
                            {...register("cpf")}
                        /> {/* OBS: Fazer validação */}
                        <InputField 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            {...register("email")}
                        />
                        <InputField 
                            type="text" 
                            name="telefone" 
                            placeholder="Telefone"
                            {...register("telefone")}
                        />
                        <InputField 
                            type="text" 
                            name="dataNascimento" 
                            placeholder="Data de Nascimento"
                            {...register("dataNascimento")}
                        />
                        <InputField 
                            type="text" 
                            name="cep" 
                            placeholder="CEP"
                            {...register("cep")}
                            onBlur={checkCEP}
                        /> 
                    </Fields>

                    <Fields>
                        <InputField 
                            type="text" 
                            name="logradouro" 
                            placeholder="Logradouro(rua, avenida, ...)"
                            {...register("logradouro")}
                        />
                        <InputField 
                            type="text" 
                            name="estado" 
                            placeholder="Estado"
                            {...register("estado")}
                        />
                        <InputField 
                            type="text" 
                            name="bairro" 
                            placeholder="Bairro"
                            {...register("bairro")}
                        />
                        <InputField 
                            type="text" 
                            name="cidade" 
                            placeholder="Cidade" 
                            {...register("cidade")}
                        />
                        <InputField 
                            type="text" 
                            name="numero" 
                            placeholder="Número *" 
                            {...register("numero")}
                        />
                        <InputField 
                            type="text" 
                            name="complemento" 
                            placeholder="Complemento" 
                            {...register("complemento")}
                        />
                    </Fields>
                </MainBlock>

                <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>

                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <ImageBack src={IconBack} alt="IconBack" />
                </Link>
            </Container>
        </>
    )

}

export default CadastroCliente;