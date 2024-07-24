import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

const databaseRef = ref(database, 'usuarios');

function remover(inputCPF, inputEmail, inputEndereco, inputNome, inputSenha, inputTelefone) {
    var key = localStorage.getItem('key');
    const usuario = ref(database, 'usuarios/' + key);

    remove(usuario)
      .then(() => {
        inserir(inputCPF, inputEmail, inputEndereco, inputNome, inputSenha, inputTelefone);
      })
      .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
      });
}

function inserir (inputCPF, inputEmail, inputEndereco, inputNome, inputSenha, inputTelefone) {
    const dados = {
            nome: inputNome,
            cpf: inputCPF,
            endereco: inputEndereco,
            telefone: inputTelefone,
            email: inputEmail,
            senha: inputSenha
    };
        
    const databaseRef = ref(database, 'usuarios');
        
    push(databaseRef, dados)
    .then(() => {
        localStorage.clear();
        mostrarPopup('Atualizado com sucesso. Reentre.');
        setTimeout(() => {  window.location.href = "entrar.html"; }, 2000);
    })
    .catch((error) => {
        mostrarPopup(error.message);
    });
}


function validar(){
    const inputNome = localStorage.getItem('nome');
    const inputCPF = localStorage.getItem('cpf');
    const inputEndereco = document.forms["configuracoes"]["inputendereco"].value;
    const inputTelefone = document.forms["configuracoes"]["inputtelefone"].value;
    const inputEmail = document.forms["configuracoes"]["inputemail"].value;
    const inputSenha = document.forms["configuracoes"]["inputsenha"].value;
    
    try {
        if (inputEndereco.length === 0 || inputEndereco == null || inputEndereco == undefined) {
        throw new Error("O endereço não pode estar vazio.");
        } else if(inputTelefone.length === 0 || inputTelefone == null || inputTelefone == undefined || !inputTelefone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)) {
        throw new Error("O telefone deve estar no formato (00) 90000-0000.");
        } else if(inputEmail.length === 0 || inputEmail == null || inputEmail == undefined || !inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        throw new Error("O e-mail deve seguir o formato padrão.");
        } else if(inputSenha.length === 0 || inputSenha === null || inputSenha === undefined || !inputSenha.match(/^.{8,}$/)) {
        throw new Error("A senha deve conter no mínimo 8 caracters.");
        } else {
            remover(inputCPF, inputEmail, inputEndereco, inputNome, inputSenha, inputTelefone);
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
}

const atualizarButton = document.getElementById('botao_enviar');

atualizarButton.addEventListener('click', (event) => {

    event.preventDefault();

    validar();
});