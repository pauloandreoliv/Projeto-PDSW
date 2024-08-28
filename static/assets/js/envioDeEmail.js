import { mostrarPopup } from "./popup.js";

const entrarButton = document.getElementById("botao_enviar");

entrarButton.addEventListener('click', (event) => {
    event.preventDefault();

    const inputEmail = document.forms["esqueciSenha"]["inputemail"].value;
    try {

        if (!inputEmail || !inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            throw new Error("O e-mail deve seguir o formato padrão.");
        } else {
            
            fetch('/enviarEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail
                })
            })
            .then(response => {
               
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error('Erro no servidor: ' + text);
                    });
                }
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    mostrarPopup("E-mail enviado com sucesso.");
                    setTimeout(() => { window.location.href = "/entrar"; }, 2000);
                } else {
                    mostrarPopup(result.message || "Usuário inexistente.");
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
                mostrarPopup('Erro ao enviar o e-mail: ' + error.message);
            });
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
});