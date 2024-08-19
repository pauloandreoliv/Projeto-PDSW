import { mostrarPopup } from "./popup.js";

const entrarButton = document.getElementById("botao_enviar");

entrarButton.addEventListener('click', (event) => {
    event.preventDefault();

    const inputCPF = document.forms["entrar"]["inputcpf"].value;
    const inputSenha = document.forms["entrar"]["inputsenha"].value;

    try {
        if (inputCPF.length === 0 || inputCPF == null || inputCPF == undefined || !inputCPF.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
            throw new Error("O CPF deve seguir o formato 000.000.000-00");
        } else if (inputSenha.length === 0 || inputSenha === null || inputSenha === undefined) {
            throw new Error("A senha não pode estar vazia");
        } else {
            // Enviar os dados para a API de login no Flask
            fetch('/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cpf: inputCPF,
                    senha: inputSenha
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    localStorage.clear();
                    localStorage.setItem('nome', result.nome);
                    localStorage.setItem('endereco', result.endereco);
                    localStorage.setItem('cpf', result.cpf);
                    localStorage.setItem('telefone', result.telefone);
                    localStorage.setItem('logado', 'true');
                

                    mostrarPopup("Logado com sucesso");
                    setTimeout(() => { window.location.href = "/pedidos"; }, 2000);
                } else {
                    mostrarPopup(result.message || "Usuário inexistente ou senha incorreta");
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
                mostrarPopup('Erro ao logar: ' + error.message);
            });
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
});