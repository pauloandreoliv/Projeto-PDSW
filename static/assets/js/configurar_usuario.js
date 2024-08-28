import { mostrarPopup } from "./popup.js";
function carregarDados() {
    fetch('/getUser')
        .then(response => response.json())  
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
    const nome = document.forms["configuracoes"]["inputnome"].value.trim();
    const cpf = document.forms["configuracoes"]["inputcpf"].value.trim();
    const endereco = document.forms["configuracoes"]["inputendereco"].value.trim();
    const telefone = document.forms["configuracoes"]["inputtelefone"].value.trim();
    const email = document.forms["configuracoes"]["inputemail"].value.trim();

    // Verificação das regras de preenchimento dos campos
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato esperado: 000.000.000-00
    const regexTelefone = /^\(\d{2}\)\s\d{5}-\d{4}$/; // Formato esperado: (XX) XXXXX-XXXX
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Validação de e-mail

    if (!nome) {
        mostrarPopup('Por favor, preencha o campo Nome.', 5000);
        return;
    }

    if (!cpf || !regexCPF.test(cpf)) {
        mostrarPopup('Por favor, insira um CPF válido no formato 000.000.000-00.', 5000);
        return;
    }

    if (!endereco) {
        mostrarPopup('Por favor, preencha o campo Endereço.', 5000);
        return;
    }

    if (!telefone || !regexTelefone.test(telefone)) {
        mostrarPopup('Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.', 5000);
        return;
    }

    if (!email || !regexEmail.test(email)) {
        mostrarPopup('Por favor, insira um e-mail válido.', 5000);
        return;
    }

    const novosDados = {
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        telefone: telefone,
        email: email
    };

    fetch(`/user/${cpf}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        mostrarPopup('Atualizado com sucesso.', 3000);
    })
    .catch(error => {
        mostrarPopup('Erro ao atualizar: ' + error.message, 5000);
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




window.onload = carregarDados;