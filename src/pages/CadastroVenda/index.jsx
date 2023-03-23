import React from "react";

// Styles
import { GlobalStyle } from "./globalStyles"
import { Container, Cards, Line, Center, Card, Cpf} from "./defaultStyles"

// Components
import CampoDePreencherDinheiro from "../../components/atoms/CampoDePreencherDinheiro";
import CampoDePreencherNumero from "../../components/atoms/CampoDePreencherNumero";
import BotaoCadastroVenda from "../../components/atoms/BotaoCadastroVenda";
import CampoDeQuantidadePrestacao from "../../components/atoms/CampoDePreencherQuantidade";
import CampoDeExibicaoDeNumero from "../../components/atoms/CampoDeExibicaoDeNumero";


function CadastroVenda() {
	return (
		<>
			<GlobalStyle />

			<form method="POST" action="http://localhost:8080/api/purchases/exemplo">
				<Container>
					<Cards>
						<Cpf>
							<Center>
								<label className="font-bold block mb-2">Digite um CPF</label> <br />
								<CampoDePreencherNumero />
							</Center>
						</Cpf>
						<Card>
							<Line />
						</Card>
						<Card>
							<Center>
								<label className="font-bold block mb-2">Valor Total</label> <br />
								<CampoDePreencherDinheiro />
							</Center>

							<Center>
								<label className="font-bold block mb-2">Quantidade de Parcelas</label> <br />
								<CampoDeQuantidadePrestacao />
							</Center>

							<Center>
								<label className="font-bold block mb-2">Parcelas no Valor de:</label> <br />
								<CampoDeExibicaoDeNumero />
							</Center>

							<BotaoCadastroVenda />
						</Card>
					</Cards>
				</Container>
			</form>
		</>
	)

}

export default CadastroVenda;