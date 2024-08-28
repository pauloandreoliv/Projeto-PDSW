
import { mostrarPopup } from "./popup.js";
import { mostrarPratosAdmin} from "./mostrar_pratosepromocoes.js";
import { mostrarPromoAdmin } from "./mostrar_pratosepromocoes.js";
import {buscarUnidadesAdmin} from "./localizacao.js";

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

function removerUnidade(id) {
    fetch(`/delete_restaurant/${id}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            mostrarPopup("Unidade Excluída com sucesso.");
            buscarUnidadesAdmin();
        } else {
            throw new Error("Erro ao excluir a unidade.");
        }
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}


window.removerPrato = removerPrato;
window.removerUnidade = removerUnidade;
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
            mostrarPopup("Promoção excluído com sucesso.");
            mostrarPromoAdmin();
        } else {
            throw new Error("Erro ao excluir a Promoção.");
        }
    })
    .catch((error) => {
        mostrarPopup("Erro. Tente novamente.");
    });
}



function adicionarListenerBotoes() {
    const botoes = document.getElementsByTagName('button');

    for (let i = 0; i < botoes.length; i++) {
      botoes[i].addEventListener('click', function() {
        remover(this.id);
      });
    }
  }
  
export { adicionarListenerBotoes, removerPrato, removerPromocao, removerUnidade };