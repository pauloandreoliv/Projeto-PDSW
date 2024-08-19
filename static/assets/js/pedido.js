import { mostrarPopup } from './popup.js';

const containerPedidos = document.getElementById("pedidos");
const botao_limpar = document.getElementById("botao_limpar");
const botoes_comprar = document.querySelectorAll("botao_comprar");
let listaDeItens = [];

// Função para adicionar itens ao carrinho
function adicionarItem(nome, preco) {
    const primeiro_item = document.getElementById("primeiro_item");
    if (primeiro_item) {
        primeiro_item.parentNode.removeChild(primeiro_item);
    }

    const elemento = document.createElement('article');
    elemento.innerHTML = `<h4>${nome}</h4><h5>${preco}</h5>`;
    containerPedidos.appendChild(elemento);

    listaDeItens.push({ nome, preco });

}



// Função para limpar o carrinho
function limparItens() {
    containerPedidos.innerHTML = "";
    listaDeItens = [];
    limparInicial();
}

// Função para finalizar o pedido
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
            itens: listaDeItens,
            forma_pagamento: formadepgmto,
            endereco: endereco,
            telefone: telefone,
            cpf: cpf,
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

// Função para inicializar o carrinho vazio
function limparInicial() {
    containerPedidos.innerHTML = `
        <article id="primeiro_item">
            <h4>Você ainda não escolheu um item :(</h4>
            <h5>Que tal provar algo novo?</h5>
        </article>`;
}

// Adicionar evento aos botões de compra
botoes_comprar.forEach((botao, index) => {
    var botoesComprar = document.querySelectorAll("button[id^='comprar']");

    botoesComprar.forEach(function(botao) {
        botao.addEventListener('click', function(event) {
            // Evitar o comportamento padrão do botão (recarregar a página)
            event.preventDefault();

            // Encontrar o artigo pai do botão
            var artigo = botao.closest(".box_produto");

            // Capturar o nome e preço do produto
            var nome = artigo.querySelector(".info p").textContent;
            var preco = artigo.querySelector(".info h5").textContent;

            // Adicionar o item ao pedido
            adicionarItem(nome, preco);
        });
    });
});

// Eventos dos botões limpar e finalizar
botao_limpar.addEventListener('click', (event) => {
    event.preventDefault();
    limparItens();
});

document.getElementById("botao_comprar").addEventListener('click', (event) => {
    event.preventDefault();
    finalizarPedido();
});

// Inicializa o carrinho vazio ao carregar a página
window.addEventListener('load', limparInicial);