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
    localStorage.clear();
    window.location.href = "/";
}

function redirecionar() {
    if (logado == null) {
        var caminho = window.location.href;

        if (caminho.includes("/configuracoes") || caminho.includes("/pedidos") || caminho.includes("/comprar")) {
            window.location.href = "/entrar";
        }
    }
}

export { alterarMenu, sair, redirecionar };
