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


window.addEventListener('load', function() {
    const caminho = window.location.pathname;
    if (caminho === '/cardapio') {
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
    } else if (caminho === '/' || caminho === '/index') {

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
        // Função que carrega promoções para a área administrativa
        mostrarPromocoesAdmin();
    } else if (caminho === '/admin_cardapio') {
        // Função que carrega pratos para a área administrativa
        mostrarPratosAdmin();
    }
});