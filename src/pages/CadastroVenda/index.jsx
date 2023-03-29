import React, { useState } from "react";
import {useForm, Controller } from "react-hook-form";
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf} from "./defaultStyles"

// Components
import CampoDePreencherDinheiro from "../../components/atoms/CampoDePreencherDinheiro";


// Component Primereact
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';

const CadastroVenda = () => {
	const [cpf, setcpf] = useState(0);
	const [paymentValue, setpaymentValue] = useState(0);
	const [installment, setinstallment] = useState(0); 

	const { control, handleSubmit, formState: { errors }, watch } = useForm();



	const onSubmit = (data) => {

		const ObjetoSoComValorTotaleIdCliente= { paymentValue: data.paymentValue, installmentQuantity: data.installment};
		console.log(ObjetoSoComValorTotaleIdCliente)

		axios.post('http://localhost:8080/api/purchases', ObjetoSoComValorTotaleIdCliente)

		.then(response => {console.log("Envio do Formulario deu Certo !")

			const ObjetoRetornadoPeloMetodoDaRota = response.data;
			const ObjetoComIdDaVendaParcelasValorTotal = { purchaseId: ObjetoRetornadoPeloMetodoDaRota.id, installmentQuantity: data.installment, purchaseValue: data.paymentValue }

			console.log(ObjetoComIdDaVendaParcelasValorTotal)
			axios.post('http://localhost:8080/api/installments', ObjetoComIdDaVendaParcelasValorTotal)
			.then((response) => {

				console.log("Envio da Venda Criada deu Certo !");
			  })

			.catch((error) => {

				console.error("Envio da Venda Deu erro !");
			  });
			})

		.catch(error => console.log("Envio do Formulario deu Erro !")) 
		console.log(data)
	}

	
	
	const watchValorTotal = watch("paymentValue");

	const watchQuantidadeParcela = watch("installment");

	var valorDaDivisao = 0

	if(watchQuantidadeParcela == 0){
		valorDaDivisao = 0
	} else {
		valorDaDivisao = watchValorTotal/watchQuantidadeParcela
	}

	return (
		<>
			<GlobalStyle /> 
			<Container>
					<Cards>
						<Cpf>
							<Center>

								<label className="font-bold block mb-2">Digite um CPF</label> <br />
								<Controller
									name="id_client"
									control={control}
									defaultValue={cpf}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<InputNumber
										name="cpf"
										value={field.value}
										onChange={(e) => {
											setcpf(e.value);
											field.onChange(e.value);
										}}
										decimalseparator=""
  										format={false}
										className={errors?.cpf && "input-error"}
										/>
									)}
								/>
								{errors?.cpf?.type == "required" && (<p className="error-message">CPF Necessário</p>)}
								
							</Center>
						</Cpf>
						<Card>
							<Line />
						</Card>
						<Card>						
							<Center>

							<label className="font-bold block mb-2">Valor Total</label> <br />
							<Controller
									name="paymentValue"
									control={control}
									defaultValue={paymentValue}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (										
										<InputNumber name="paymentValue" value={field.value}
										onValueChange={(e) => {setpaymentValue(e.value)
									  	field.onChange(e.value)}} 
										className={errors?.paymentValue && "input-error"}/>
									)}
								/>

							{errors?.paymentValue?.type == "required" && (<p className="error-message">Valor Total da Venda Necessário</p>)}
							
							<CampoDePreencherDinheiro/>
							
							</Center>

							<Center>
								
							<label className="font-bold block mb-2">Quantidade de Parcelas</label> <br />
							<Controller
								name="installment"
								control={control}
								defaultValue={installment}
								rules={{ required: "Campo obrigatório" }}
								render={({ field }) => (
									<InputNumber id="installment" name="installment"
									className={errors?.installment && "input-error"}
									value={field.value}
              						onValueChange={(e) => {setinstallment(e.value)
									field.onChange(e.value)}} 
			  						min={0} showButtons buttonLayout="horizontal" 
									decrementButtonIcon="pi pi-chevron-left" incrementButtonIcon="pi pi-chevron-right"/>
							)}/>
							{errors?.installment?.type == "required" && (<p className="error-message">Necessário a Quantidade de Parcelas da Venda</p>)}
							
							</Center>

							<Center>
								
							<label className="font-bold block mb-2">Parcelas no Valor de:</label> <br />
							<InputNumber id="installmentValue" name="installmentValue"
							value={valorDaDivisao} disabled prefix="R$"/>

							</Center>

							<Button onClick={() => handleSubmit(onSubmit)()} label="Cadastrar"></Button>
						</Card>
					</Cards>
				</Container>
		</>
	)

}

export default CadastroVenda;