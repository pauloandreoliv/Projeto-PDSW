

import { removerPromocao } from './excluir_item.js';

function fetchData(endpoint) {
    console.log(`Fetching data from ${endpoint}`);  
    return fetch(endpoint)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

function mostrarPromocoes(comprar) {
    console.log('mostrarPromocoes function called');
    fetchData('/get_promotions')
        .then(promocoes => {
            console.log('Promoções recebidos:', promocoes);
            const mostrarPromocoes = document.getElementById('mostrarPromocoes');
            mostrarPromocoes.innerHTML = "";
            
            for (const promocao of promocoes) {
                const { valor, nome, url_img } = promocao;

                const promocaoDiv = document.createElement('article');
                promocaoDiv.innerHTML =
                    '<div class="topo">' +
                        '<div class="imagem" style="background-image: url(' + url_img + ');"></div>' +
                    '</div>' +
                    '<div class="info">' +
                        '<p>' + nome + '</p>' +
                        '<h5> R$' + valor + '</h5>' +
                    '</div>'+
                    comprar;
                promocaoDiv.id = promocao.id;
                promocaoDiv.classList.add("box_produto");

                mostrarPromocoes.appendChild(promocaoDiv);
            }
        })
        .catch(error => console.error('Erro ao buscar pratos:', error));
}

function mostrarPratos(comprar) {
    console.log('mostrarPratos function called');  
    fetchData('/get_pratos')
        .then(pratos => {
            console.log('Pratos recebidos:', pratos);
            const mostrarPratos = document.getElementById('mostrarPratos');
            mostrarPratos.innerHTML = "";

            for (const prato of pratos) {
                const { valor, nome, url_img } = prato;

                const pratoDiv = document.createElement('article');
                pratoDiv.innerHTML =
                    '<div class="topo">' +
                        '<div class="imagem" style="background-image: url(' + url_img + ');"></div>' +
                    '</div>' +
                    '<div class="info">' +
                        '<p>' + nome + '</p>' +
                        '<h5> R$' + valor + '</h5>' +
                    '</div>'+
                    comprar
                   ;
                    
                pratoDiv.id = prato.id;
                pratoDiv.classList.add("box_produto");

                mostrarPratos.appendChild(pratoDiv);
            }
        })
        .catch(error => console.error('Erro ao buscar pratos:', error));
}


export function mostrarPromoAdmin() {
    console.log('mostrarPromoAdmin function called');
    fetchData('/get_promotions')
        .then(promocoes => {
            console.log('Promoções recebidas:', promocoes);
            const mostrarPromocoesAdmin = document.getElementById('mostrarPromocoesAdmin');
            mostrarPromocoesAdmin.innerHTML = "";

            for (const promocao of promocoes) {
                const { valor, nome, url_img, id } = promocao;

                const promocaoDiv = document.createElement('article');
                promocaoDiv.classList.add("box_item");
                promocaoDiv.innerHTML = `
                    <button onclick="removerPromocao('${id}')"><i class="fa-solid fa-trash"></i></button>
                    <h6>${nome}</h6>
                    <h6>R$ ${valor}</h6>
                    <a href="${url_img}" target="_blank"><i class="fa-solid fa-image"></i></a>
                    <p>Para visualizar a imagem, clique no ícone</p>
                `;

                mostrarPromocoesAdmin.appendChild(promocaoDiv);
            }
        })
        .catch(error => console.error('Erro ao buscar promoções:', error));
}

export function mostrarPratosAdmin() {
    console.log('mostrarPratosAdmin function called');  
    fetchData('/get_pratos')
        .then(pratos => {
            console.log('Pratos recebidos:', pratos);
            const mostrarPratosAdmin = document.getElementById('mostrarPratosAdmin');
            mostrarPratosAdmin.innerHTML = "";

            for (const prato of pratos) {
                const { valor, nome, url_img, id } = prato;

                const pratoDiv = document.createElement('article');
                pratoDiv.classList.add("box_item");
                pratoDiv.innerHTML = `
                    <button onclick="removerPrato('${id}')"><i class="fa-solid fa-trash"></i></button>
                    <h6>${nome}</h6>
                    <h6>R$ ${valor}</h6>
                    <a href="${url_img}" target="_blank"><i class="fa-solid fa-image"></i></a>
                    <p>Para visualizar a imagem, clique no icone</p>
                `;

                mostrarPratosAdmin.appendChild(pratoDiv);
            }
        })
        .catch(error => console.error('Erro ao buscar pratos:', error));}


window.addEventListener('load', function() {
    const caminho = window.location.pathname;
    if (caminho === '/cardapio') {
        fetch('/check_login')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                let comprar = `
                <form action="/entrar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                
                mostrarPratos(comprar);
                
            } else {
                let comprar = `
                <form action="/cadastrar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                mostrarPromocoes(comprar);
                mostrarPratos(comprar);} 
            })
    } else if (caminho === '/' || caminho === '/index') {

        fetch('/check_login')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                let comprar = `
                <form action="/entrar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                mostrarPromocoes(comprar);
                mostrarPratos(comprar);
                
            } else {
                let comprar = `
                <form action="/entrar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                mostrarPromocoes(comprar);
                mostrarPratos(comprar);} 
            })
    } else if (caminho === '/comprar') {
        fetch('/check_login')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                let comprar = `
                <form action="/comprar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                mostrarPromocoes(comprar);
                mostrarPratos(comprar);
                
            } else {
                let comprar = `
                <form action="/cadastrar" method="get">
                    <button id="comprar" type="submit">Comprar</button>
                </form>
                `;
                mostrarPromocoes(comprar);
                mostrarPratos(comprar);} 
            })
    } else if (caminho === '/admin_verpromocoes') {
        
        mostrarPromoAdmin();
    } else if (caminho === '/admin_cardapio') {
        mostrarPratosAdmin()

    }
});

