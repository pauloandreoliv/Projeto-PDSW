import { mostrarPopup } from "./popup.js";

var logado = localStorage.getItem('logado');
var linkMenu = document.querySelector('a#logado');

function alterarMenu() {
    if (!(linkMenu === null)) {
        if (logado === 'true') {
            linkMenu.innerHTML = '<i class="fa-solid fa-user"></i> Sua conta';
            linkMenu.href = "/pedidos";
        } else {
            linkMenu.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar';
            linkMenu.href = "/entrar";
        }
    }
}


function sair() {
    fetch('/logout', {
        method: 'POST',
        credentials: 'include'  
    })
    .then(response => {
        if (response.ok) {

            localStorage.clear();

            window.location.href = "/";
        } else {
            console.error('Erro ao fazer logout');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
}



async function verificarToken() {
    
    const response = await fetch('/check_Token');
    if (!response.ok) {
        if (response.status === 401) {
            
            localStorage.clear();
            mostrarPopup("Token expirado")
            setTimeout(() => { window.location.href = "/entrar"; }, 2000);
            
            return false;
        }
    }
    return true;
}



async function redirecionar() {
    const tokenValido = await verificarToken();
    if (!tokenValido){
        return;
    } 

    else if (logado == null) {
        var caminho = window.location.href;
        if (caminho.includes("/configuracoes") || caminho.includes("/pedidos") || caminho.includes("/comprar") || caminho.includes("/localizacao_user")) {
            window.location.href = "/entrar";
        }
    }
}

export { alterarMenu, sair, redirecionar };