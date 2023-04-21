import React, { useState, useEffect  } from "react";
import {useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, StyledInputText, Line, Center, Card, InputFieldMask, Cpf, StyledParcelas, StyledBotaoCadastro, Titulo, StyledCpf, Label, ImageBack} from "./defaultStyles"

// Component Primereact
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

// Images
import IconBack from '../../assets/img/IconBack.svg'

const CadastroVenda: React.FC = () => {
	// UseState da verificação de cpf
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [telefone, setTelefone] = useState('');
	const [dataNascimento, setDataNascimento] = useState('');
	const [cep, setCep] = useState('');
	const [error, setError] = useState(false);

	// UseState do cadastro da venda
	const [installment, setinstallment] = useState(1); 
	const [paymentValue, setpaymentValue] = useState<string>("");
	const [valorOriginal, setValorOriginal] = useState<string>("");
	const [ValueRedirect, setRedirect] = useState(false)

	// Syntaxe do UseForm
	const { control, handleSubmit, register, formState: { errors }, watch } = useForm();

	// Syntaxe do useNavigate
	const navigate = useNavigate();

	// variaveis de formatação do valor trazido pos formatarValorParaComecarDaDireita
	const Concatenar = "R$ " + paymentValue;

	//formata o valor para começar da direita para a esquerda, por se tratar de dinheiro
  	const formatarValorParaComecarDaDireita = (valorSemFormatacao: any) => {
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
	  	let texto = valorFormatado.replace(/[.,]/g, '');
		setValorOriginal(texto)
	  return valorFormatado;
	};

	const onChangeValorInserido = (e: any) => {
	  	const ValorInseridoPosFormatacao = formatarValorParaComecarDaDireita(e.target.value);
	  // Seta o novo valor pos formação usando o setState do useState
	  	setpaymentValue(ValorInseridoPosFormatacao);
	};


	const FormataDinheiro = Number(valorOriginal)/100 

	const watchQuantidadeParcela = watch("installment");

	var valorDaDivisao = FormataDinheiro/watchQuantidadeParcela
	

	////////////////////////////////////////////////////////////////
	// Codigo relacionado a verificar o Cpf inserido e trazer as informações do cliente
	function handleInput(cpf: any) {
		const CpfParaVerificar = cpf.target.value.replace(/\D/g, '');
		const cpfFormatado = CpfParaVerificar.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

		axios.get(`http://localhost:8080/client/queryFromCpf/${cpfFormatado}`)
		.then(response => {
			const ResultadoDevolvido = response.data
				setError(false);
				setNome(ResultadoDevolvido.fullName);
				setEmail(ResultadoDevolvido.email);
				setTelefone(ResultadoDevolvido.telephone);
				setDataNascimento(ResultadoDevolvido.birthDate);
				setCep(ResultadoDevolvido.address.cep);
		})
		.catch(error => {
			setError(true);
			setNome('')
			setEmail('')
			setTelefone('')
			setDataNascimento('')
			setCep('')
		});
	  }

	////////////////////////////////////////////////////////////////

	const onSubmit = (data : any) => {

		const ObjetoSoComValorTotaleIdCliente : any = { installmentQuantity: data.installment};
		ObjetoSoComValorTotaleIdCliente.paymentValue= FormataDinheiro

		const cpf = data.cpf

		axios.post(`http://localhost:8081/api/purchases/${cpf}`, ObjetoSoComValorTotaleIdCliente)

		.then(response => {

			const ObjetoRetornadoPeloMetodoDaRota = response.data;
			const ObjetoComIdDaVendaParcelasValorTotal = { purchaseId: ObjetoRetornadoPeloMetodoDaRota.id, installmentQuantity: data.installment, purchaseValue: ObjetoSoComValorTotaleIdCliente.paymentValue }
	

			axios.post('http://localhost:8081/api/installments', ObjetoComIdDaVendaParcelasValorTotal)
			.then((response) => {

				window.alert("Cadastrado com sucesso!");
				setRedirect(true)

			  })

			.catch((error) => {
				window.alert("Erro na Criação de Parcelas !");});
			})
		.catch(error => 
			window.alert("Erro ao Cadastrar a Venda!"))
		
	}

	useEffect(() => {
		if (ValueRedirect) {
			navigate('/home');
		}
	  }, [ValueRedirect, navigate]);

	return (
		<>
			<GlobalStyle /> 
			<Container>
					<Cards>
						<Cpf>
							<Center>

								<InputFieldMask 
									mask="999.999.999-99"
									type="text" 
									name="cpf" 
									placeholder="Digite um CPF"
									{...register("cpf", { required: "Precisa que seja inserido o CPF do cliente"})}
									onInput={handleInput}
								/>
								{errors?.cpf?.type == "required" && (<p className="error-message">CPF Necessário</p>)}
								{error && <p className="error-message">CPF Não foi encontrado</p>}
								
							</Center>

							<Center>
								<StyledInputText style={{ width: '400px' }} value={nome} name="nome" disabled/>
							</Center>

							<Center>
								<StyledInputText style={{ width: '400px' }} value={email} name="email" disabled/>
							</Center>
														
							<Center>
								<StyledInputText style={{ width: '400px' }} value={telefone} name="telefone" disabled/>
							</Center>
														
							<Center>
								<StyledInputText style={{ width: '400px' }} value={dataNascimento} name="data_nascimento" disabled/>
							</Center>
														
							<Center>
								<StyledInputText style={{ width: '400px' }} value={cep} name="CEP" disabled/>
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
			  						min={1} showButtons buttonLayout="horizontal" 
									decrementButtonIcon="pi pi-chevron-left" incrementButtonIcon="pi pi-chevron-right"/>
							)}/>
							{errors?.installment?.type == "required" && (<p className="error-message">Necessário a Quantidade de Parcelas da Venda</p>)}
							
							</Center>

							<Center>
								
							<Label className="font-bold block mb-2">Parcelas no Valor de:</Label> <br />
							<InputNumber style={{ width: '400px' }} id="installmentValue" name="installmentValue"
							value={valorDaDivisao} disabled prefix="R$ "/>

							</Center>

							<StyledBotaoCadastro disabled={error} onClick={() => handleSubmit(onSubmit)()} label="Cadastrar"></StyledBotaoCadastro>

						</Card>
					</Cards>
					<Link to={"/home"} style={{ textDecoration: "none" }}>
						<ImageBack src={IconBack} alt="IconBack" />
					</Link>
				</Container>
		</>
	)

}

export default CadastroVenda;