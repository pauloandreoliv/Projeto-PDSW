import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

const databaseRef = ref(database, 'admins');

const entrarButton = document.getElementById("botao_enviar");

entrarButton.addEventListener('click', (event) => {
	
  event.preventDefault();

  const inputCPF = document.forms["entrar"]["inputcpf"].value;
  const inputSenha = document.forms["entrar"]["inputsenha"].value;
  
  try {
    if(inputCPF.length === 0 || inputCPF == null || inputCPF == undefined || !inputCPF.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
        throw new Error("O CPF deve seguir o formato 000.000.000-00");
    } else if (inputSenha.length === 0 || inputSenha === null || inputSenha === undefined) {
        throw new Error("A senha não pode estar vazia");
    } else {
        onValue(databaseRef, (snapshot) => {
    
            const usuarios = snapshot.val();
            
            for (const usuario in usuarios) {
        
                const dadosUsuario = usuarios[usuario];
                const cpf = dadosUsuario.cpf;
                const senha = dadosUsuario.senha;
                const nome  = dadosUsuario.nome;

                if (cpf === inputCPF) {
                    if (senha === inputSenha) {
                        localStorage.clear();
                        localStorage.setItem('nomeAdmin', nome);
                        localStorage.setItem('logadoAdmin', 'true');
                        mostrarPopup("Logado com sucesso");
                        setTimeout(() => {  window.location.href = "admin_index.html"; }, 2000);
                    } else {
                        mostrarPopup("Senha incorreta");
                    }
                } else {
                    mostrarPopup("Usuário inexistente");
                }
            }
          });
    }
  } catch (error){
    mostrarPopup(error.message);
  }
});