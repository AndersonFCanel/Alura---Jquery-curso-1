/*
O jQuery facilitou nosso trabalho do momento de escutar os eventos JS dos elementos.

*/

/*
Usaremos a função seletora do jQuery ($) e acionaremos a classe campo-digitacao e o id #tempo-digitacao	
*/ 
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


/*INICIALIZANDO CADA PARTE DO CÓDIGO QUE FOI EMCAPSULADA EM FUNÇÕES 
vamos utilizar uma função do jQuery que aguarda a página ser carregada e depois executa seu conteúdo: a função $(document).ready():
OBS:
Como esta é uma função bastante utilizada do jQuery, ela também tem um atalho, que é a função chamada: $(function() { ... });. Quando passamos uma função dentro da função $() , estamos na verdade utilizando a função $(document).ready(). Como é mais prático utilizar este segundo modo, vamos alterar nosso código:
*/
$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro(); 
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
});

//================================================


function atualizaTamanhoFrase() {
	/*CAPITURANDO O VALOR DA CLASS FRASE E ARMAZENANDO NA VARIÁVEL CLASSNAME
	var frase  = $(".frase").text();
	*/
	var frase = $(".frase").text(); 

	/*SEPARANDO AS PALAVRAS E CONTANDO AS PALAVRAS E ARMAZENANDO EM NUMPALAVRAS
	frase.split(" ");
	*/
	var numPalavras = frase .split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");

	/*A FUNÇÃO .TEXT() TEM DOIS COMPORTAMENTOS, 
	- O primeiro , quando utilizamos-a sem nenhum parâmetro, nos é retornado o valor de texto do elemento,
	- e O SEGUNDO, quando passamos um parâmetro para a função, ela altera o valor de texto do elemento!
	*/
	tamanhoFrase.text(numPalavras);
}

//=============== AULA - 02 =====================


function inicializaContadores() {
	/*O EVENTO DE CLIQUE
	Agora, quando o campo for clicado, teremos que "fazer alguma coisa".
	A ação de "quando o campo for..." faz referência à função on do jQuery, e como queremos o evento do clique no campo, passaremos "click" para a função:
	Conseguiremos "fazer algo" quando o campo for clicado, passando um segundo parâmetro para a função on, no caso, uma função anônima, indicada pelos parênteses vazio:

	campo.on("click", function() { console.log("cliquei no campor") }); //PEGANDO VALOR A CADA EVENTO DE CLIQUE
	*/

	/*O EVENTO INPUT
	No entanto, para atualizar os contadores, temos sempre que clicar dentro do campo. O ideal seria que o contador fosse atualizado enquanto o usuário digita. E para isso existe um evento específico de quando digitamos, colocamos dados em um campo: input:
	var campo = $(".campo-digitacao");
	campo.on("input", function() {
	Observe que à medida que digitarmos, o campo será atualizado. Era justamente esse o nosso objetivo.
	*/

		/*A DIFERENÇA ENRE .VAL E O .TEXT
		No caso do textarea, o conteúdo não estará na propriedade text e sim no value, ou como é chamado pelo jQuery: val.
		o val nos dá acesso ao que está dentro de uma tag de input, como as tags input e textarea. Já o text nos dá acesso ao que está dentro de uma tag de texto, como p, span e h1.
		*/
	campo.on("input", function() { //PEGANDO VALOR A CADA ENTRADA
		var conteudo = campo.val();
		console.log(campo.val());

		// Selecionandor o span e alterarando o seu text, atribuindo a quantidade de CARACTERES a ele:
		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);

		//Selecionando o span e alterarando o seu text, atribuindo a quantidade de PALAVRAS a ele:
		/*
		 A expressão regular será responsável por buscar qualquer caractere, exceto espaço vazio: /\S+/. ==>> Agora os espaços não são mais considerados como palavras.
		 */
		 var qtdPalavras = conteudo.split(/\S+/).length-1;
		 console.log(qtdPalavras);
		 $("#contador-palavras").text(qtdPalavras);
		})
}



//=============== AULA - 03 =====================
function inicializaCronometro() {
	/*O EVENTO FOCUS
	O usuário pode iniciar o jogo ao clicar no box de digitação, mas essa não é a única maneira, existe a opção da tecla "Tab".
	Pensando nisso, há um evento específico para quando entramos dentro de um campo, que é o evento focus
	*/
	var tempoRestante = $("#tempo-digitacao").text();
	console.log("TEMPO: ", tempoRestante);

	//ONE, funciona exatamente como a função on, só que só escuta o evento uma única vez:
	campo.one("focus", function() {
		/*CONTAGEM REGRESSIVA
		A partir do valor obtido em "#tempo-digitacao" faz se um decremento de 1 a cada 1000 milesegundos
		A cada segundo que se passar, temos que subtrair 1 do nosso tempo restante. Para tal, vamos utilizar a função setInterval() do JavaScript
		*/
		var cronometroID = setInterval(function() {
			tempoRestante--;
			//Atualizando o contador
			$("#tempo-digitacao").text(tempoRestante);
			/*DESABILITANDO O CAMPO APÓS CONTAGEM
			Como queremos adicionar um atributo, o jQuery nos auxilia disponibilizando a FUNÇÃO ATTR.

			==>> Essa função funciona de maneira semelhante à função text, podendo pegar o valor de um atributo ou modificá-lo. Por exemplo, para pegar o valor do atributo rows do nosso campo, fazemos:
			EXEMPLO: 
			var campo = $(".campo-digitacao");
			campo.attr("rows");
			
			E para modificar o mesmo, passamos mais um parâmetro para a função, que é o novo valor do atributo, por EXEMPLO:
			var campo = $(".campo-digitacao");
			campo.attr("rows", 500);
			*/
			
			console.log(tempoRestante);
			if (tempoRestante < 1) {
				/*A FUNÇÃO .ATTR()
				A função .attr() nos permite colocar, retirar ou modificar valores de atributos de elementos HTML
				*/
				//campo.attr("disabled", true);

            	/*EVITAR COM QUE A CONTAGEM DE TEMPO FIQUE NEGATIVA
				Testamos e vemos que assim que o tempo chega a 0, o campo é travado. Mas ainda temos um bug, porque o tempo continua decrescendo depois do 0, ou seja, ele fica negativo. Temos que fazer com que a função setInterval pare quando o tempo for 0, mas como?

				Para isso, existe a função clearInterval, que recebe o id do setInterval como parâmetro. Vamos colocá-la dentro do nosso if:
				*/
            	//OBS: Toda função setInterval() retorna o seu próprio id
            	clearInterval(cronometroID);
            	finalizaJogo();
            	/*CSS COM JQUERY
            	 alteramos o CSS do campo utilizando a função css() do jQuery, passando por parâmetro a propriedade CSS queremos modificar e o seu valor, separados por vírgula:
            	 */
            	//campo.css("background-color", "lightgray");//NÃO É BOA PRÁTICA
            	/*ALTERANDO O CSS NO JAVASCRIPT?
            	Nós sabemos que não é certo mexer com o estilo de uma página, de seus elementos, no JavaScript. Se queremos estilizar, logo devemos mexer nos arquivos .css . Então, o que podemos fazer é, ao invés de mexer diretamente com o CSS no JavaScript, podemos adicionar uma classe. E no arquivo CSS nós Estilizamos o campo através dessa classe.
            	quando o tempo se esgotar, adicionamos essa classe campo-desativado no campo, através da função addClass:
            	*/ 
            	//
            	
            	/*campo.addClass("campo-desativado");X
            	Utilizaremos esta função no lugar de ambas as funções, addClass e removeClass:
            	*/
            	//campo.toggleClass("campo-desativado");

            	
            }
        },1000);
	});
}


function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

//UM ATALHO PARA FUNÇÃO on("click"), a shorthand click() ==> VARIAS FORMAS DE SE FAZER A MESMA COISA
/*
//Veja no exemplo abaixo, onde capturamos o evento de click em um título e exibimos uma mensagem no console como resposta:
var titulo = $("#titulo");
titulo.on("click",function(){
    console.log("Titulo foi clicado!");
});

//Poderíamos executar este mesmo evento e ação com a função de atalho click():
var titulo = $("#titulo");
titulo.click(function(){
    console.log("Titulo foi clicado!");
});

Podemos ser mais sucintos ainda e escrever tudo em uma linha só:
$("#titulo").click(function(){
    console.log("Titulo foi clicado!");
});
*/



//REINICIANDO O JOGO: TRATANDO DO CAMPO
//$("#botao-reiniciar").click(function(){
	function reiniciaJogo() {
		campo.attr("disabled", false);
		campo.val("");
		$("#contador-palavras").text("0");
		$("#contador-caracteres").text("0");
		$("#tempo-digitacao").text(tempoInicial);
		inicializaCronometro();
	/*ADICIONANDO E REMOVENDO CLASSES FACILMENTE DE UM ELEMENTO
      Assim como o jQuery possui a função addClass, ele também possui a removeClass, logo, no main.js, adicionaremos inicializaCronometro() e campo.removeClass():  
      */
    //campo.removeClass("campo-desativado"); //	SUBSTITUIDO POR toggleClass()
    /*
	Essa ação de adicionar e remover classes se tornou uma tarefa tão comum, que o jQuery criou uma função específica para isso, a toggleClass()
	Utilizaremos esta função no lugar de ambas as funções, addClass e removeClass:
	*/
	campo.toggleClass("campo-desativado");
	//INICIALIZANDO SEM COR NENHUMA
	campo.removeClass("borda-vermelha"); //novo
	campo.removeClass("borda-verde");
//});
}



//=================== AULA 05 - PARTE 03 ======================
/*Capturando o elemento com a  class = frase*/
function inicializaMarcadores() {
	var frase = $(".frase").text();
	//capturando a cada e clique 
	campo.on("input", function() {
		var digitado = campo.val();
		var comparavel = frase.substr(0 , digitado.length);

		//aramzenado para comparar
		if(digitado == comparavel) {
			console.log("Está certo");
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		} else {
			console.log("Está errado");
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}

	});
}

