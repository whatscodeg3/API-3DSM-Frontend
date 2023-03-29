import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';

export default function CampoDePreencherDinheiro() {
  	const [valorInserido, setValorInserido] = useState("");
  	
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
	    return `R$ ${valorFormatado}`;
	  };

  	const onChangeValorInserido = (e) => {
    	const ValorInseridoPosFormatacao = formatarValorParaComecarDaDireita(e.target.value);
    	// Seta o novo valor pos formação usando o setState do useState
    	setValorInserido(ValorInseridoPosFormatacao);
  	};

 return (
 	<div>
      <InputText id="ValorInserido" value={valorInserido} onChange={onChangeValorInserido} />
    </div>
  );
}
