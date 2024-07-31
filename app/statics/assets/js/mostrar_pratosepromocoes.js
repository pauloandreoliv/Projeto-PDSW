import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { mostrarPopup } from "./popup.js";
import { adicionarListenerBotoes } from "./excluir_item.js";
import { adicionarItem } from "./pedido.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwhBCw983no7qVBlsO7_Dr6YwVDj-wROg",
    authDomain: "desenvolvimentoweb1-7361f.firebaseapp.com",
    projectId: "desenvolvimentoweb1-7361f",
    storageBucket: "desenvolvimentoweb1-7361f.appspot.com",
    messagingSenderId: "346518758393",
    appId: "1:346518758393:web:a97b06e672ddcf37881328",
    databaseURL: "https://desenvolvimentoweb1-7361f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);



function mostrarPromocoes () {
    const databaseRef = ref(database, 'promocoes');

    const mostrarPromocoes = document.getElementById('mostrarPromocoes');

    mostrarPromocoes.innerHTML = "";

    onValue(databaseRef, (snapshot) => {
    
        const promocoes = snapshot.val();

        for (const promocao in promocoes) {

            const dadosPromocao = promocoes[promocao];
            const valor = dadosPromocao.valor;
            const nome = dadosPromocao.nome;
            const url = dadosPromocao.url;

            var promocaoDiv = document.createElement('article')
            promocaoDiv.innerHTML =
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>';
            promocaoDiv.id = promocao;
            promocaoDiv.classList.add("box_produto");

            mostrarPromocoes.appendChild(promocaoDiv);
        }
    });
    
}

function mostrarPratos () {
    const databaseRefPratos = ref(database, 'pratos');

    const mostrarPratos = document.getElementById('mostrarPratos');

    mostrarPratos.innerHTML = "";
    
    onValue(databaseRefPratos, (snapshot) => {
    
        const pratos = snapshot.val();
        for (const prato in pratos) {

            const dadosPrato = pratos[prato];
            const valor = dadosPrato.valor;
            const nome = dadosPrato.nome;
            const url = dadosPrato.url;

            var pratoDiv = document.createElement('article')
            pratoDiv.innerHTML = 
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>';
            pratoDiv.id = prato;
            pratoDiv.classList.add("box_produto");

            mostrarPratos.appendChild(pratoDiv);
        }
    });
}

function mostrarCardapio () {
    const databaseRefPratos = ref(database, 'pratos');
    const databaseRefPromos = ref(database, 'promocoes');

    const mostrarPratos = document.getElementById('mostrarPratos');

    mostrarPratos.innerHTML = "";
    
    onValue(databaseRefPratos, (snapshot) => {
    
        const pratos = snapshot.val();
        for (const prato in pratos) {

            const dadosPrato = pratos[prato];
            const valor = dadosPrato.valor;
            const nome = dadosPrato.nome;
            const url = dadosPrato.url;

            var pratoDiv = document.createElement('article')
            pratoDiv.innerHTML = 
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>';
            pratoDiv.id = prato;
            pratoDiv.classList.add("box_produto");

            mostrarPratos.appendChild(pratoDiv);
        }
    });

    onValue(databaseRefPromos, (snapshot) => {
    
        const promocoes = snapshot.val();

        for (const promocao in promocoes) {

            const dadosPromocao = promocoes[promocao];
            const valor = dadosPromocao.valor;
            const nome = dadosPromocao.nome;
            const url = dadosPromocao.url;

            var promocaoDiv = document.createElement('article')
            promocaoDiv.innerHTML =
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>';
            promocaoDiv.id = promocao;
            promocaoDiv.classList.add("box_produto");

            mostrarPratos.appendChild(promocaoDiv);
        }
    });
}


function mostrarPromocoesAdmin () {
    const databaseRef = ref(database, 'promocoes');

    const mostrarPromocoes = document.getElementById('mostrarPromocoesAdmin');

    mostrarPromocoes.innerHTML = "";

    onValue(databaseRef, (snapshot) => {
    
        const promocoes = snapshot.val();

        for (const promocao in promocoes) {

            const dadosPromocao = promocoes[promocao];
            const valor = dadosPromocao.valor;
            const nome = dadosPromocao.nome;
            const url = dadosPromocao.url;

            var promocaoDiv = document.createElement('article')
            promocaoDiv.innerHTML = 
            '<button id="'+ promocao +'" class="my-button"><i class="fa-solid fa-trash"></i></button>'+
            '<h6>' + nome +'</h6>'+
            '<h6>R$'+ valor + '</h6>'+
            '<a href="' + url +'" target="_blank"><i class="fa-solid fa-image"></i></a>';
            promocaoDiv.id = promocao;
            promocaoDiv.classList.add("box_item");

            mostrarPromocoes.appendChild(promocaoDiv);
        }

        adicionarListenerBotoes();
    });
}

function mostrarPratosAdmin () {
    const databaseRef = ref(database, 'pratos');
    
    const mostrarPratos = document.getElementById('mostrarPratosAdmin');

    mostrarPratos.innerHTML = "";
    
    onValue(databaseRef, (snapshot) => {
    
        const pratos = snapshot.val();
        for (const prato in pratos) {

            const dadosPrato = pratos[prato];
            const valor = dadosPrato.valor;
            const nome = dadosPrato.nome;
            const url = dadosPrato.url;

            var pratoDiv = document.createElement('article')
            pratoDiv.innerHTML = '<button id="'+ prato +'"><i class="fa-solid fa-trash"></i></button>'+
            '<h6>' + nome +'</h6>'+
            '<h6>R$'+ valor + '</h6>'+
            '<a href="' + url +'" target="_blank"><i class="fa-solid fa-image"></i></a>';
            pratoDiv.classList.add("box_item");

            mostrarPratos.appendChild(pratoDiv);
        }

        adicionarListenerBotoes();
    });
}


function mostrarCardapioComprar () {
    const databaseRefPratos = ref(database, 'pratos');
    const databaseRefPromos = ref(database, 'promocoes');

    const mostrarPratos = document.getElementById('mostrarPratosComprar');

    mostrarPratos.innerHTML = "";
    
    onValue(databaseRefPratos, (snapshot) => {
    
        const pratos = snapshot.val();
        for (const prato in pratos) {

            const dadosPrato = pratos[prato];
            const valor = dadosPrato.valor;
            const nome = dadosPrato.nome;
            const url = dadosPrato.url;

            var pratoDiv = document.createElement('article')
            pratoDiv.innerHTML =
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>'+
                '<button id="'+ prato +'">Comprar</button>';
            pratoDiv.id = "article_" + prato; 
            pratoDiv.classList.add("box_produto");

            mostrarPratos.appendChild(pratoDiv);
        }
    });

    onValue(databaseRefPromos, (snapshot) => {
    
        const promocoes = snapshot.val();

        for (const promocao in promocoes) {

            const dadosPromocao = promocoes[promocao];
            const valor = dadosPromocao.valor;
            const nome = dadosPromocao.nome;
            const url = dadosPromocao.url;

            var promocaoDiv = document.createElement('article')
            promocaoDiv.innerHTML =
                '<div class="topo">' +
                    '<div class="imagem" style="background-image: url(' + url + ');"></div>'+
                '</div>'+
                '<div class="info">'+
                    '<p>'+ nome + '</p>' +
                    '<h5> R$' + valor + '</h5>'+
                '</div>'+
                '<button id="'+ promocao +'">Comprar</button>';
            promocaoDiv.id = "article_" + promocao;
            promocaoDiv.classList.add("box_produto");

            mostrarPratos.appendChild(promocaoDiv);
        }
        
        adicionarListenerBotoesComprar();
    });
}

function adicionarListenerBotoesComprar() {
    const botoes = document.getElementsByTagName('button');

    for (let i = 0; i < botoes.length; i++) {
      botoes[i].addEventListener('click', function() {
        if (this.id!="botao_limpar" && this.id !="botao_comprar"){
            var url = window.location.href;
            if (url.includes('/comprar.html')){
                adicionarItem(this.id);
            }
        }
      });
    }
}

window.addEventListener('load', function() {
    var url = window.location.href;
    var caminho = window.location.pathname;

    if (url.includes('/cardapio.html')){
        mostrarCardapio();
    } else if (url.includes('/index.html') || caminho == '/Projeto-DSWI/' || caminho == '/') {
        mostrarPromocoes();
        mostrarPratos();
    } else if (url.includes('/admin_verpromocoes.html')) {
       mostrarPromocoesAdmin();
    } else if (url.includes('/admin_cardapio.html')) {
        mostrarPratosAdmin();
    } else {
        mostrarCardapioComprar();
    }
});

export { mostrarPratosAdmin, mostrarPromocoesAdmin };