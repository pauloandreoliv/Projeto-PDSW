import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { mostrarPopup } from "./popup.js";

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

const cadastrarButton = document.getElementById("botao_enviar");

cadastrarButton.addEventListener('click', (event) => {
	
  event.preventDefault();

  const inputNome = document.forms["inserir"]["inputnome"].value;
  const inputValor = document.forms["inserir"]["inputvalor"].value;
  const inputUrl = document.forms["inserir"]["inputurl"].value;
  
  try {
    if (inputNome.length === 0 || inputNome == null || inputNome == undefined) {
      throw new Error("O nome não pode estar vazio");
    } else if(inputValor < 0 || inputValor == "" || inputValor == null || inputValor == undefined) {
      throw new Error("O valor não pode estar vazio e deve ser ≥ 0");
    } else if(inputUrl.length === 0 || inputUrl == null || inputUrl == undefined || !inputUrl.match(/^(https?:\/\/|ftp:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/)) {
      throw new Error("A URL deve seguir o formato padrão.");
    } else {
      const dados = {
        nome: inputNome,
        url: inputUrl,
        valor: inputValor
      };
    
      const databaseRef = ref(database, 'promocoes');
    
      push(databaseRef, dados)
      .then(() => {
        mostrarPopup('Promoção criada com sucesso!');
      })
      .catch((error) => {
        mostrarPopup(error.message);
      });
    }
  } catch (error) {
    mostrarPopup(error.message);
  }
});