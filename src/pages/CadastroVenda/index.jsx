import React from "react";
import {useForm} from "react-hook-form";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf} from "./defaultStyles"

// Components
import CampoDePreencherDinheiro from "../../components/atoms/CampoDePreencherDinheiro";
import CampoDePreencherNumero from "../../components/atoms/CampoDePreencherNumero";
import CampoDeQuantidadePrestacao from "../../components/atoms/CampoDePreencherQuantidade";
import CampoDeExibicaoDeNumero from "../../components/atoms/CampoDeExibicaoDeNumero";
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

const CadastroVenda = () => {

	const { register, handleSubmit, formState: { errors }, watch } = useForm();

	const onSubmit = (data) => {
		axios.post('http://localhost:8080/api/purchases/exemplo', data).then(response => console.log(response)).catch(error => console.log(error)) 
		console.log(data)
	}
	
	const watchValorTotal = watch("payment_value");

	const watchQuantidadeParcela = watch("installment");

	const valorDaDivisao = watchValorTotal/watchQuantidadeParcela;

	return (
		<>
			<GlobalStyle /> 
			<Container>
					<Cards>
						<Cpf>
							<Center>

								<label className="font-bold block mb-2">Digite um CPF</label> <br />
								<input className={errors?.cpf && "input-error"} 
								type="number" placeholder="Numero de cpf" 
								{...register("cpf", { required: true })}/>
								{errors?.cpf?.type == "required" && (<p className="error-message">CPF Necessário</p>)}
								
								
								///
								<CampoDePreencherNumero />
							</Center>
						</Cpf>
						<Card>
							<Line />
						</Card>
						<Card>						
							<Center>

								<label className="font-bold block mb-2">Valor Total</label> <br />
								<input className={errors?.payment_value && "input-error"} type="number" placeholder="Valor Total a Pagar"
								{...register("payment_value", {required: true})}
								/>
								{errors?.payment_value?.type == "required" && (<p className="error-message">Valor Total da Venda Necessário</p>)}


								///
								<CampoDePreencherDinheiro />
							</Center>

							<Center>

								<label className="font-bold block mb-2">Quantidade de Parcelas</label> <br />
								<input className={errors?.installment && "input-error"} type="number" placeholder="" 
								{...register("installment", {required: true})}/>
								{errors?.installment?.type == "required" && (<p className="error-message">Necessário a Quantidade de Parcelas da Venda</p>)}


								///
								<CampoDeQuantidadePrestacao />
							</Center>

							<Center>
								

								<label className="font-bold block mb-2">Parcelas no Valor de:</label> <br />
								<input value={teste} type="number" placeholder=""
								{...register("installmentValue")}/>


								///
								<CampoDeExibicaoDeNumero />
							</Center>

							<button onClick={() => handleSubmit(onSubmit)()} label="Cadastrar">aqui</button>
						</Card>
					</Cards>
				</Container>
		</>
	)

}

export default CadastroVenda;