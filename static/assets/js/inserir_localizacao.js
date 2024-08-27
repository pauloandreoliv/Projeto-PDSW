

import { mostrarPopup } from "./popup.js";

const cadastrarButton = document.getElementById("botao_enviar");

cadastrarButton.addEventListener('click', (event) => {
    event.preventDefault();

    const inputNome = document.forms["inserir"]["inputnome"].value;
    const inputEndereco = document.forms["inserir"]["inputEndereco"].value;
    const inputUrl = document.forms["inserir"]["inputurl"].value;
    const inputurlMapa = document.forms["inserir"]["inputurlMapa"].value;

    try {
        if (inputNome.length === 0 || inputNome == null || inputNome == undefined) {
            throw new Error("O nome não pode estar vazio");
        } else if (inputEndereco.length === 0 || inputEndereco == "" || inputEndereco == null || inputEndereco === undefined) {
            throw new Error("O Endereço não pode estar vazio");
        } else if (inputUrl.length === 0 || inputUrl == null || inputUrl == undefined || !inputUrl.match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/)) {
            throw new Error("A URL deve seguir o formato padrão.");
        } else if (inputurlMapa.length === 0 || inputurlMapa == null || inputurlMapa == undefined || !inputurlMapa.match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/)) {
            throw new Error("A URL do Mapa deve seguir o formato padrão.");
        } else {
            const dados = {
                nome: inputNome,
                url_img: inputUrl,
                endereco: inputEndereco,
                mapa : inputurlMapa
            };
        
            fetch('/add_restaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
            .then(data => {
                mostrarPopup(data.message);
            })
            .catch((error) => {
                mostrarPopup("Erro. Tente novamente.");
            });
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
});