import { mostrarPopup } from "./popup.js";
function carregarDados() {
    fetch('/getUser')
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/entrar";
                    return;
                }
                return response.text().then(text => {
                    throw new Error(`Erro na resposta do servidor: ${response.status} ${response.statusText}. ${text}`);
                });
            }
            return response.json();
        })
        .then(dados => {
            if (dados) {
                document.forms["configuracoes"]["inputnome"].value = dados.nome || '';
                document.forms["configuracoes"]["inputcpf"].value = dados.cpf || '';
                document.forms["configuracoes"]["inputendereco"].value = dados.endereco || '';
                document.forms["configuracoes"]["inputtelefone"].value = dados.telefone || '';
                document.forms["configuracoes"]["inputemail"].value = dados.email || '';
            }
        })
        .catch(error => {
            mostrarPopup('Erro ao carregar dados: ' + error.message);
        });
}

function atualizarUsuario() {

    const novosDados = {
        nome: document.forms["configuracoes"]["inputnome"].value,
        cpf: document.forms["configuracoes"]["inputcpf"].value,
        endereco: document.forms["configuracoes"]["inputendereco"].value,
        telefone: document.forms["configuracoes"]["inputtelefone"].value,
        email: document.forms["configuracoes"]["inputemail"].value,
    };

   
    const cpf = document.forms["configuracoes"]["inputcpf"].value;

    fetch(`/user/${cpf}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/entrar";
                    return;
                }
                return response.text().then(text => {
                    throw new Error(`Erro na resposta do servidor: ${response.status} ${response.statusText}. ${text}`);
                });
            }
            return response.json().then(data => {
                mostrarPopup('Atualizado com sucesso.');
            });
        })
        .catch(error => {
            mostrarPopup('Erro ao atualizar: ' + error.message);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const atualizarButton = document.getElementById('botao_enviar');

    if (atualizarButton) {
        atualizarButton.addEventListener('click', () => {
            atualizarUsuario();
        });
    }
});




// Carregar dados ao abrir a página
window.onload = carregarDados;