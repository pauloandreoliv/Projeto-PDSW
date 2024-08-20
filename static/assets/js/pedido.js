
import { mostrarPopup } from './popup.js';

const containerPedidos = document.getElementById("pedidos");
const botao_limpar = document.getElementById("botao_limpar");
const botao_comprar = document.getElementById("botao_comprar");
const totalElement = document.getElementById("total"); // Elemento onde o total será exibido
let listaDeItens = [];
let total = 0;


function adicionarItem(nome, preco) {
    const primeiro_item = document.getElementById("primeiro_item");
    if (primeiro_item) {
        primeiro_item.parentNode.removeChild(primeiro_item);
    }

    const elemento = document.createElement('article');
    elemento.innerHTML = `<h4>${nome}</h4><h5>${preco}</h5>`;
    containerPedidos.appendChild(elemento);

    listaDeItens.push({ nome, preco });
    atualizarTotal(preco);
}




function limparItens() {
    containerPedidos.innerHTML = "";
    listaDeItens = [];
    total = 0;
    atualizarTotal(0, true);
    limparInicial();
}

function atualizarTotal(preco, reset = false) {
    if (reset) {
        total = 0;
    } else {
        total += parseFloat(preco.replace('R$', '').replace(',', '.'));
    }
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

async function finalizarPedido() {
    if (listaDeItens.length === 0) {
        mostrarPopup("Seu carrinho está vazio");
        return;
    }

    try {
        const formadepgmto = document.forms["pagamento"]["select_formadepg"].value;
        if (formadepgmto === "SELECIONE") {
            throw new Error("Selecione uma forma de pagamento");
        }

        const telefone = localStorage.getItem("telefone");
        const endereco = localStorage.getItem("endereco");
        const cpf = localStorage.getItem("cpf");

        const pedido = {
            pratos: listaDeItens,
            formadepgmto: formadepgmto,
            endereco: endereco,
            telefone_cliente: telefone,
            cpf: cpf,
            total: total, 
        };

        const response = await fetch('/add_pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        const data = await response.json();

        if (response.ok) {
            mostrarPopup("Pedido finalizado com sucesso!");
            limparItens();
        } else {
            throw new Error(data.error || 'Erro ao finalizar o pedido');
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
}


function limparInicial() {
    containerPedidos.innerHTML = `
        <article id="primeiro_item">
            <h4>Você ainda não escolheu um item :(</h4>
            <h5>Que tal provar algo novo?</h5>
        </article>`;
    atualizarTotal(0, true); 
}


document.body.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'comprar') {
        event.preventDefault();
        var artigo = event.target.closest(".box_produto");
        var nome = artigo.querySelector(".info p").textContent;
        var preco = artigo.querySelector(".info h5").textContent;
        adicionarItem(nome, preco);
    }
});


botao_limpar.addEventListener('click', (event) => {
    event.preventDefault();
    limparItens();
});

botao_comprar.addEventListener('click', (event) => {
    event.preventDefault();
    finalizarPedido();
});


window.addEventListener('load', limparInicial);
