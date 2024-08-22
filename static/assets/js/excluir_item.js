
import { mostrarPopup } from "./popup.js";
import { mostrarPratosAdmin} from "./mostrar_pratosepromocoes.js";
import { mostrarPromoAdmin } from "./mostrar_pratosepromocoes.js";

function removerPrato(id) {
    fetch(`/delete_prato/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            mostrarPopup("Excluído com sucesso.");
            mostrarPratosAdmin();
        } else {
            throw new Error("Erro ao excluir prato.");
        }
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}


window.removerPrato = removerPrato;


window.removerPromocao = removerPromocao;

function removerPromocao(id) {
    fetch(`/delete_promotion/${id}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            mostrarPopup("Excluído com sucesso.");
            mostrarPromoAdmin(); // Atualiza a lista de promoções
        } else {
            throw new Error("Erro ao excluir promoção.");
        }
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}

export { removerPromocao };



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
  
export { adicionarListenerBotoes, removerPrato };