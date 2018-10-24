//=========== AULA 06 - PARTE 01 ==> PLACAR============= 
/*
Na função inserePlacar(), precisamos buscar pelo corpo da tabela, que é a área em que iremos inserir novas linhas com a pontuação do usuário. Vamos primeiro selecionar a section placar inteira:
*/
function inserePlacar(){
    console.log("Linha inserida no placar");
    /*BUSCAR FILHOS DE UM ELEMENTO QUE JÁ SELECIONAMOS PREVIAMENTE
     Quando queremos buscar filhos de um elemento que já selecionamos previamente, podemos utilizar a função .find() do jQuery, que funciona de modo semelhante a função seletora ($), porém fazendo a busca apenas do filho do elemento:
    A função .find() recebe como parâmetro seletores CSS e busca em seus filhos algum elemento que atenda aquela busca. Podemos simplificar e fazer tudo em uma linha apenas:
    */
    var corpoTabela = $(".placar").find("tbody");

	//CRIANDO UMA NOVA LINHA
    /*
    Como queremos criar uma nova linha na ta
    bela, com o nome do usuário e o número de palavras, precisamos pegar essas informações:
    */
    var usuario = "Seu-nome";
    var numPalavras = $("#contador-palavras").text();


	//var placar = $(".placar");


	//Criação de um botão de remover para cada linha criada na tabela
	//var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;
	/*Chamar a função removeLinha() para os botoes que estão dentro das linhas criadas. Como agora temos um elemento HTML, podemos utilizar o .find() para acha-los:*/
    linha.find(".botao-remover").click(removeLinha);

    //Criação de uma nova linha na tabela
    //var linha = "<tr>"+
    //"<td>"+ usuario + "</td>"+
    //"<td>"+ numPalavras + "</td>"+
    //"</tr>";

    //var linha = novaLinha(usuario,numPalavras);
    corpoTabela.append(linha);


    /*ADICIONANDO HTML NA PÁGINA COM JQUERY
	Com nossa linha criada, precisamos adicioná-la ao corpo da tabela, e para isto vamos utilizar a função .append() do jQuery. Esta função adiciona a string ou elemento HTML que é passada como parâmetro como último filho do elemento em qual ela for chamada.

	Vamos à linha como última filha do tbody:
	*/
    //corpoTabela.append(linha);
    
    /*ADICIONANDO COMO PRIMEIRO ITEM
	Se quisermos adicionar a nova linha como primeiro item da tabela, devemos utilizar uma função que é prima da função .append(), que é a .prepend(). Ela adiciona a string/HTML passada como primeiro filho do elemento selecionado:
	*/
	corpoTabela.prepend(linha);
}

//========= AULA 06 - PARTE 02 =============
//CRIANDO UM BOTÃO REMOVER
//$(".botao-remover").click(function(){
//	console.log("Fui clicado =>REMOVER");

    /*PREVENINDO O SALTO DA TELA
	Repare que ao clicar no ícone de remoção, além de exibir a mensagem no console a página salta para o topo. Isso acontece pois quando clicamos em uma tag <a> ela tem o comportamento de redirecionar para o que estiver em seu atributo href, seja um link ou um ID de um elemento HTML. Neste caso, estamos com o valor de "#" no href, o que faz com que seja redirecionado pro topo da página. Se o href fosse o id de algum elemento, a visualização iria saltar para este elemento.

	Este é um comportamento padrão da tag <a>, mas neste caso , queremos evitá-lo. Conseguimos fazer isto através da função preventDefault(). Vamos alterar nosso evento para receber um parâmetro que permite usá-la:
	*/
//	event.preventDefault();

    /*REMOVENDO A LINHA
	Agora que estamos detectando o evento de click, partiremos para a remoção da linha. Para remover um elemento do HTML , podemos utilizar a função com nome semelhante do jQuery, a .remove().

	Se no nosso evento de click, utilizarmos ela para remover quem foi clicado, que pode ser acessado através do this:
	*/
    //this.remove();
    /*
	Vamos obter um erro clássico de quando estamos trabalhando com jQuery. Tentamos utilizar uma função do jQuery em um elemento do HTML. Elementos comuns do HTML não tem acesso as funções do jQuery, precisamos empoderá-los com as funções do objeto jQuery, envolvendo-os com a função jQuery:
	*/
    /*
    Deste modo o this (elemento HTML que foi clicado), ganha acesso as várias funções do jQuery, como .text(),.val(), .css() e todas as outras funções do jQuery.
    */
    //$(this).remove(); //SOMENTE REMOVERÁ O ICONE DA LIXEIRA.

    /*REMOVENDO O ELEMENTO UM NÍVEL ACIMA
    O elemento pai da <a> é uma <td> , e a linha é o elemento dois níveis acima, ou seja , a <tr>. Para acessarmos um elemento acima do elemento selecionado com jQuery, um elemento pai, temos a função .parent() do Javascript, veja:
    */
  //  $(this).parent().parent().remove();
//})

//============== AULA 06 - PARTE 03 =========
//ADICIONANDO EVENTOS NAS LINHAS DO PLACAR
//CRIANDO UM <TR> DENTRO DO JAVASCRIPT
/*
Na função novaLinha() nosso objetivo será criar um elemento HTML em si, não apenas uma string, e para isto vamos utilizar a função jQuery $(), só que ao invés de passarmos um seletor, como fazemos por padrão, vamos passar a tag HTML que queremos criar. Veja:
*/
function novaLinha(usuario, palavras){
	/*
	Aqui utilizamos diversas funções do jQuery que já conhecemos para montar os elementos iguais a sua estrutura original do HTML.
	Agora basta posicioná-los corretamente com a função append():
	*/
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover = $("<td>");

	var link = $("<a>").attr("href","#").addClass("botao-remover");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}




function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}