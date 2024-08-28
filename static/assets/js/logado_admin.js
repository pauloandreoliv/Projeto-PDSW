import { mostrarPopup } from "./popup.js";


const titulo = document.getElementById("titulo");
const nomeDia = document.getElementById("nome_dia");
const logadoAdmin = localStorage.getItem('logadoAdmin');



async function verificarToken() {
    
        const response = await fetch('/check_Token');
        if (!response.ok) {
            if (response.status === 401) {
                
                localStorage.clear();
                mostrarPopup("Token expirado")
                setTimeout(() => { window.location.href = "/admin"; }, 2000);
                
                return false;
            }
        }
        return true;
}

async function redirecionar(){
    const tokenValido = await verificarToken();
    if (!tokenValido) {
        
        mostrarPopup("teste");
        return
    }
       

    if (logadoAdmin == null) {
        var caminho = window.location.href;
  
        if (caminho.includes('/admin_index') || caminho.includes('/admin_adicionar') || caminho.includes('/admin_cardapio') || caminho.includes('/admin_pedidos') || caminho.includes('/admin_promocoes') || caminho.includes('/admin_verpromocoes')){
            window.location.href = "/admin";
        }
    }
}

function alterarTitulo(){
    if (logadoAdmin == 'true') {
        var nome = localStorage.getItem('nome');
        titulo.textContent = "Olá, " + nome;
    }
}

function inserirData() {
    var data = new Date();
    var nomesDosDias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var dia = nomesDosDias[data.getDay()];
    nomeDia.textContent = dia;
}

window.addEventListener('load', async function() {
    // Verifica o token antes de qualquer outra coisa
    const tokenValido = await verificarToken();
    if (!tokenValido) {
        

        return ; 
    }

    await redirecionar();
    var caminho = window.location.href;
    if (caminho.includes('/admin_index')){
        alterarTitulo();
        inserirData();
    }
});

const sair = document.getElementById("sair_admin");
sair.addEventListener('click', (event) => {
    event.preventDefault();
    
    localStorage.clear();
    window.location.href = "/admin";
});

const sairnormal = document.getElementById("sair_admin_normal");
sairnormal.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/admin";
});