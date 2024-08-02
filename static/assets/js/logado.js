var logado = localStorage.getItem('logado');
var linkMenu = document.querySelector('a#logado');

function alterarMenu() {
    if (!(linkMenu === null)) {
        if (logado === 'true') {
            linkMenu.innerHTML = '<i class="fa-solid fa-user"></i> Sua conta';
            linkMenu.href = 'pedidos.html';
        } else {
            linkMenu.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar';
            linkMenu.href = 'entrar.html';
        }
    }
}
function sair(){
    localStorage.clear();
    window.location.href = "index.html";
}

function redirecionar(){
    if (logado == null) {
        var caminho = window.location.href;
  
        if (caminho.includes('/configuracoes.html') || caminho.includes('/pedidos.html') || caminho.includes('/comprar.html')){
            window.location.href = "entrar.html";
        }
    }
}

export { alterarMenu, sair, redirecionar };