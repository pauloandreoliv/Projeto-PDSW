import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { mostrarPopup } from "./popup.js";
import { mostrarPromocoesAdmin, mostrarPratosAdmin } from "./mostrar_pratosepromocoes.js"

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

function removerPrato(id_parametro){

    var id = id_parametro;
    const prato = ref(database, 'pratos/' + id);

    remove(prato)
    .then(() => {
        mostrarPopup("Excluído com sucesso.");
        mostrarPratosAdmin();
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}

function removerPromocao(id_parametro){

    var id = id_parametro;
    const promocao = ref(database, 'promocoes/' + id);

    remove(promocao)
    .then(() => {
        mostrarPopup("Excluído com sucesso.");
        mostrarPromocoesAdmin();
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}

function remover (id){
    var url = window.location.href;
    if (url.includes('/admin_verpromocoes.html')) {
        removerPromocao(id);
     } else {
        removerPrato(id);
     }
}

function adicionarListenerBotoes() {
    const botoes = document.getElementsByTagName('button');

    for (let i = 0; i < botoes.length; i++) {
      botoes[i].addEventListener('click', function() {
        remover(this.id);
      });
    }
  }
  
export { adicionarListenerBotoes };