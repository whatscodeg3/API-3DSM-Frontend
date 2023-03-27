import React, { useState } from "react";
import {useForm, Controller } from "react-hook-form";
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf} from "./defaultStyles"


// Components
import CampoDePreencherDinheiro from "../../components/atoms/CampoDePreencherDinheiro";
import CampoDePreencherNumero from "../../components/atoms/CampoDePreencherNumero";
import CampoDeQuantidadePrestacao from "../../components/atoms/CampoDePreencherQuantidade";
import CampoDeExibicaoDeNumero from "../../components/atoms/CampoDeExibicaoDeNumero";


// Component Primereact
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const CadastroVenda = () => {
	const [CPF, setCPF] = useState(0);
	const [Payment_value, setPayment_value] = useState(0);
	const [Installment, setInstallment] = useState(0);
	const [InstallmentValue, setInstallmentValue] = useState(0);

	const { register, control, handleSubmit, formState: { errors }, watch } = useForm();

	const onSubmit = (data) => {
		axios.post('http://localhost:8080/api/purchases/exemplo', data)
		.then(response => console.log("Post deu certo !"))
		.catch(error => console.log("Post deu errado !")) 
		console.log(data)
	}
	
	const watchValorTotal = watch("Payment_value");

	const watchQuantidadeParcela = watch("Installment");

	const valorDaDivisao = watchValorTotal/watchQuantidadeParcela;

	return (
		<>
			<GlobalStyle /> 
			<Container>
					<Cards>
						<Cpf>
							<Center>

								<label className="font-bold block mb-2">Digite um CPF</label> <br />
								<Controller
									name="CPF"
									control={control}
									defaultValue={CPF}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<InputNumber
										name="CPF"
										value={field.value}
										onChange={(e) => {
											setCPF(e.value);
											field.onChange(e.value);
										}}
										decimalseparator=""
  										format={false}
										className={errors?.CPF && "input-error"}
										/>
									)}
								/>
								{errors?.CPF?.type == "required" && (<p className="error-message">CPF Necessário</p>)}
								
							</Center>
						</Cpf>
						<Card>
							<Line />
						</Card>
						<Card>						
							<Center>

							<label className="font-bold block mb-2">Valor Total</label> <br />
							<Controller
									name="Payment_value"
									control={control}
									defaultValue={Payment_value}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (										
										<InputNumber id="Payment_value" name="Payment_value"
										value={field.value}
										onValueChange={(e) => {setPayment_value(e.value)
									  	field.onChange(e.value)}} 
										className={errors?.Payment_value && "input-error"}/>
									)}
								/>

								{errors?.Payment_value?.type == "required" && (<p className="error-message">Valor Total da Venda Necessário</p>)}
							</Center>

							<Center>
								
								<label className="font-bold block mb-2">Quantidade de Parcelas</label> <br />
								<Controller
									name="Installment"
									control={control}
									defaultValue={Installment}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<InputNumber id="Installment" name="Installment"
										className={errors?.Installment && "input-error"}
										value={field.value}
              							onValueChange={(e) => {setInstallment(e.value)
										field.onChange(e.value)}} 
			  							min={0} showButtons buttonLayout="horizontal" 
										decrementButtonIcon="pi pi-chevron-left" incrementButtonIcon="pi pi-chevron-right" 
									/>
									)}
								/>
								{errors?.Installment?.type == "required" && (<p className="error-message">Necessário a Quantidade de Parcelas da Venda</p>)}
							
							</Center>

							<Center>
								
							<label className="font-bold block mb-2">Parcelas no Valor de:</label> <br />
							<Controller
									name="InstallmentValue"
									control={control}
									defaultValue={InstallmentValue}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<InputNumber id="InstallmentValue" name="InstallmentValue"
										value={valorDaDivisao}										
										disabled prefix="R$"
									/>
									)}
								/>
							</Center>

							<Button onClick={() => handleSubmit(onSubmit)()} label="Cadastrar"></Button>
						</Card>
					</Cards>
				</Container>
		</>
	)

}

export default CadastroVenda;