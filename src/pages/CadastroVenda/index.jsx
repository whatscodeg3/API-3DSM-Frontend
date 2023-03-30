import React, { useState } from "react";
import {useForm, Controller } from "react-hook-form";
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf, StyledParcelas, StyledBotaoCadastro, Titulo, StyledCpf, Label} from "./defaultStyles"


// Component Primereact
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';


const CadastroVenda = () => {
	const [cpf, setcpf] = useState(0);
	const [installment, setinstallment] = useState(0); 
	const [paymentValue, setpaymentValue] = useState("0,00");

	const { control, handleSubmit, formState: { errors }, watch } = useForm();

	// variaveis de formatação do valor trazido pos formatarValorParaComecarDaDireita
	const Concatenar = "R$ " + paymentValue;
	const TrocaPontoPorNada = paymentValue.replace(".", "");
	const TrocaVirgulaPorPonto = TrocaPontoPorNada.replace(",", ".");
	const TransformaEmNumberpaymentValue = parseFloat(TrocaVirgulaPorPonto);


	//formata o valor para começar da direita para a esquerda, por se tratar de dinheiro
  	const formatarValorParaComecarDaDireita = (valorSemFormatacao) => {
	  // Remove todos os caracteres que não são digitos de 0 a 9, depois transforma em float e então string, ppara poder mudar os valores como um texto.
	  let valorFormatado = parseFloat(valorSemFormatacao.replace(/[^\d]/g, "")).toString();
	  
	  // se for colocado apenas 1 caracter, adiciona 0 a esquerda
	  if (valorFormatado.length === 1) valorFormatado = `0${valorFormatado}`;
	  
	  // vai adicionar 0 a esquerda até ter no minimo 3 digitos, ou seja se colocar 1 ficaria 001, se for 10 entao 010
	  valorFormatado = valorFormatado.padStart(3, "0");
	  
	  // pega os dois ultimos digitos e ponhe uma virgula antes deles, assim formando os centavos.
	  const valorInteiro = valorFormatado.substring(0, valorFormatado.length - 2);
	  const valorDecimal = valorFormatado.substring(valorFormatado.length - 2);
	  
	  // coloca virgula "," antes dos 2 ultimos numeros, e vai colocando . a cada 3 digitos.
	  valorFormatado = `${valorInteiro.replace(/(\d)(?=(\d{3})+$)/g, '$1.')},${valorDecimal}`;
	  return valorFormatado;
	};

	const onChangeValorInserido = (e) => {
	  const ValorInseridoPosFormatacao = formatarValorParaComecarDaDireita(e.target.value);
	  // Seta o novo valor pos formação usando o setState do useState
	  setpaymentValue(ValorInseridoPosFormatacao);
	};



	const onSubmit = (data) => {

		const ObjetoSoComValorTotaleIdCliente= { installmentQuantity: data.installment};
		ObjetoSoComValorTotaleIdCliente.paymentValue=TransformaEmNumberpaymentValue;

		//console.log(ObjetoSoComValorTotaleIdCliente)

		axios.post('http://localhost:8080/api/purchases', ObjetoSoComValorTotaleIdCliente)

		.then(response => {console.log("Envio do Formulario deu Certo !")

			const ObjetoRetornadoPeloMetodoDaRota = response.data;
			const ObjetoComIdDaVendaParcelasValorTotal = { purchaseId: ObjetoRetornadoPeloMetodoDaRota.id, installmentQuantity: data.installment, purchaseValue: ObjetoRetornadoPeloMetodoDaRota.paymentValue }
			//console.log(ObjetoComIdDaVendaParcelasValorTotal)

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

	
	const watchQuantidadeParcela = watch("installment");

	var valorDaDivisao = 0

	if(watchQuantidadeParcela == 0){
		valorDaDivisao = 0
	} else {
		valorDaDivisao = TransformaEmNumberpaymentValue/watchQuantidadeParcela
	}


	return (
		<>
			<GlobalStyle /> 
			<Container>
					<Cards>
						<Cpf>
							<Center>

								<Label className="font-bold block mb-2">Digite um CPF</Label> <br />
								<Controller
									name="id_client"
									control={control}
									defaultValue={cpf}
									rules={{ required: "Campo obrigatório" }}
									render={({ field }) => (
										<StyledCpf name="cpf"
										style={{ width: '400px' }}
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
								<Titulo>Cadastro de Venda</Titulo>
							</Center>
											
							<Center>

							<Label className="font-bold block mb-2">Valor Total</Label> <br />
										
							<InputText style={{ width: '400px' }} name="paymentValue" onChange={onChangeValorInserido} value={Concatenar} prefix="R$"
							className={errors?.paymentValue && "input-error"}/>

							{errors?.paymentValue?.type == "required" && (<p className="error-message">Valor Total da Venda Necessário</p>)}
							
							</Center>

							<Center>
								
							<Label className="font-bold block mb-2">Quantidade de Parcelas</Label> <br />
							<Controller
								name="installment"
								control={control}
								defaultValue={installment}
								rules={{ required: "Campo obrigatório" }}
								render={({ field }) => (
									<StyledParcelas style={{ width: '400px' }} id="installment" name="installment"
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
								
							<Label className="font-bold block mb-2">Parcelas no Valor de:</Label> <br />
							<InputNumber style={{ width: '400px' }} id="installmentValue" name="installmentValue"
							value={valorDaDivisao} disabled prefix="R$ "/>

							</Center>

							<StyledBotaoCadastro onClick={() => handleSubmit(onSubmit)()} label="Cadastrar"></StyledBotaoCadastro>
						</Card>
					</Cards>
				</Container>
		</>
	)

}

export default CadastroVenda;