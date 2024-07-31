import { comprar, mostrar, mostrarTudo } from './acoes_pedido.js';
import { mostrarPopup } from './popup.js';

var containerPedidos = document.getElementById("pedidos");
var botao_limpar = document.getElementById("botao_limpar");
var botao_comprar = document.getElementById("botao_comprar");

function adicionarItem(id) {
    var primeiro_item = document.getElementById("primeiro_item");

    if (primeiro_item){
        primeiro_item.parentNode.removeChild(primeiro_item);
    }

    var article = "#article_" + id;

    var query_nome = article + " .info p";
    var nomeDiv = document.querySelector(query_nome);
    var nome = nomeDiv.textContent;

    var query_preco = article + " .info h5";
    var precoDiv = document.querySelector(query_preco);
    var preco = precoDiv.textContent;

    var elemento  = document.createElement('article');
    elemento.innerHTML = "<h4>"+ nome + "</h4>"+
                         "<h5>"+ preco +"</h5>";
    containerPedidos.appendChild(elemento);
}

function limparItens () {
    var itens = containerPedidos.children;
    var arrayDeItens = Array.from(itens);
    if (arrayDeItens.length == 0){
        limparInicial();
    } else {
        var ultimo = arrayDeItens[arrayDeItens.length-1];
        if (ultimo.id != "primeiro_item"){
            ultimo.remove()
        }
    }
}

function finalizarPedido () {
    var primeiro_item = document.getElementById("primeiro_item");
    var itens = containerPedidos.children;
    var arrayDeItens = Array.from(itens);
    if (arrayDeItens.length != 0){
        if (primeiro_item == null){
            var total = 0;
            var itens = "";
            for (let i = 0; i < arrayDeItens.length; i++) {
                const nome = arrayDeItens[i].querySelector('h4').textContent;
                const preco = arrayDeItens[i].querySelector('h5').textContent;

                itens += nome + ", ";
                total += parseInt(preco.slice(3));
            }
            try {
                const formadepgmto = document.forms["pagamento"]["select_formadepg"].value;
                if (formadepgmto === "SELECIONE") {
                    throw new Error("Selecione uma forma de pagamento")
                } else {
                    const telefone = localStorage.getItem("telefone");
                    const endereco = localStorage.getItem("endereco");
                    const cpf  = localStorage.getItem("cpf");
                    comprar(itens, total, endereco, telefone, cpf, formadepgmto);
                }
            } catch (error) {
                mostrarPopup(error.message);
            }
        } else {
            mostrarPopup("Seu carrinho está vazio");
        }
    }
}

function limparInicial () {
    containerPedidos.innerHTML = "";
    var elemento  = document.createElement('article');
    elemento.innerHTML = "<h4> Você ainda não escolheu um item :(</h4>"+
                         "<h5> Que tal provar algo novo?</h5>";
    elemento.id = "primeiro_item";
    containerPedidos.appendChild(elemento);
}

function verificacoes() {
    var url = window.location.href;
    if (url.includes('/comprar.html')){
        limparInicial();

        botao_limpar.addEventListener('click', (event) => {
            event.preventDefault();
            limparItens();
        });
        
        botao_comprar.addEventListener('click', (event) => {
            event.preventDefault();
            finalizarPedido();
        });        
    }

    if (url.includes('/pedidos.html')){
        const cpf  = localStorage.getItem("cpf");
        mostrar(cpf);
    }

    if (url.includes('/admin_pedidos.html')){
        mostrarTudo();
    }
}
window.addEventListener('load', verificacoes);


export { adicionarItem, limparInicial };