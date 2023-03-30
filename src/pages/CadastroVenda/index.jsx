import React, { useState } from "react";
import {useForm, Controller } from "react-hook-form";
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf} from "./defaultStyles"

// icons do prime
import 'primeicons/primeicons.css';

// theme
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

// css necessario do prime
import 'primereact/resources/primereact.min.css';


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
	const [id_client, setcpf] = useState(0);
	const [paymentValue, setpaymentValue] = useState(0);
	const [installment, setinstallment] = useState(0); 

	const { control, handleSubmit, formState: { errors }, watch } = useForm();



	const onSubmit = (data) => {

		const ObjetoSoComValorTotaleIdCliente= { paymentValue: data.paymentValue, id_client: data.id_client };
		console.log(ObjetoSoComValorTotaleIdCliente)

		axios.post('http://localhost:8080/api/purchases', ObjetoSoComValorTotaleIdCliente)

		.then(response => {console.log("Envio do Formulario deu Certo !")

			const ObjetoRetornadoPeloMetodoDaRota = response.data;
			const ObjetoComIdDaVendaParcelasValorTotal = { id: ObjetoRetornadoPeloMetodoDaRota.id, installment: data.installment, paymentValue: data.paymentValue }

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
									name="id_client"
									control={control}
									defaultValue={id_client}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<InputNumber
										name="id_client"
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
										<InputNumber id="paymentValue" name="paymentValue"
										value={field.value}
										onValueChange={(e) => {setpaymentValue(e.value)
									  	field.onChange(e.value)}} 
										className={errors?.paymentValue && "input-error"}/>
									)}
								/>

							{errors?.paymentValue?.type == "required" && (<p className="error-message">Valor Total da Venda Necessário</p>)}
							
							<CampoDePreencherDinheiro/>
							
							</Center>

							<Center>
								
							//<label className="font-bold block mb-2">Quantidade de Parcelas</label> <br />
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