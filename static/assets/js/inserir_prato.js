
import { mostrarPopup } from "./popup.js";

const cadastrarButton = document.getElementById("botao_enviar");

cadastrarButton.addEventListener('click', (event) => {
  event.preventDefault();

  const inputNome = document.forms["inserir"]["inputnome"].value;
  const inputValor = document.forms["inserir"]["inputvalor"].value;
  const inputUrl = document.forms["inserir"]["inputurl"].value;

  try {
    if (inputNome.length === 0 || inputNome == null || inputNome === undefined) {
      throw new Error("O nome não pode estar vazio");
    } else if (inputValor < 0 || inputValor === "" || inputValor == null || inputValor === undefined) {
      throw new Error("O valor não pode estar vazio e deve ser ≥ 0");
    } else if (inputUrl.length === 0 || inputUrl == null || inputUrl === undefined || !inputUrl.match(/^(https?:\/\/|ftp:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/)) {
      throw new Error("A URL deve seguir o formato padrão.");
    } else {
      const dados = {
        nome: inputNome,
        valor: inputValor,
        url_img: inputUrl
      };

      // Enviar dados para a rota Flask
      fetch('/add_prato', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          mostrarPopup('Prato criado com sucesso!');
        } else {
          mostrarPopup(data.message || 'Erro ao criar o prato.');
        }
      })
      .catch(error => {
        mostrarPopup(error.message);
      });
    }
  } catch (error) {
    mostrarPopup(error.message);
  }
});