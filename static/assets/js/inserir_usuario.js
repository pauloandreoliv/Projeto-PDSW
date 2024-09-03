import { mostrarPopup } from "./popup.js";

const cadastrarButton = document.getElementById("botao_enviar");

cadastrarButton.addEventListener('click', (event) => {
  event.preventDefault();

  const inputNome = document.forms["cadastro"]["inputnome"].value;
  const inputCPF = document.forms["cadastro"]["inputcpf"].value;
  const inputEndereco = document.forms["cadastro"]["inputendereco"].value;
  const inputTelefone = document.forms["cadastro"]["inputtelefone"].value;
  const inputEmail = document.forms["cadastro"]["inputemail"].value;
  const inputSenha = document.forms["cadastro"]["inputsenha"].value;

  try {
    if (inputNome.length === 0 || !inputNome.match(/^[a-zA-Z\s]+$/)) {
      throw new Error("O nome deve conter apenas letras sem acentos.");
    } else if(inputCPF.length === 0 || !inputCPF.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      throw new Error("O CPF deve seguir o formato 000.000.000-00");
    } else if (inputEndereco.length === 0) {
      throw new Error("O endereço não pode estar vazio.");
    } else if(inputTelefone.length === 0 || !inputTelefone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)) {
      throw new Error("O telefone deve estar no formato (00) 90000-0000.");
    } else if(inputEmail.length === 0 || !inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      throw new Error("O e-mail deve seguir o formato padrão.");
    } else if(inputSenha.length === 0 || !inputSenha.match(/^.{8,}$/)) {
      throw new Error("A senha deve conter no mínimo 8 caracteres.");
    } else {
      
      fetch(`/check_cpf/${inputCPF}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao verificar CPF.');
          }
          return response.json();
        })
        .then(data => {
          if (data.exists) {
            throw new Error("Este CPF já está cadastrado.");
          } else {
            const dados = {
              nome: inputNome,
              cpf: inputCPF,
              endereco: inputEndereco,
              telefone: inputTelefone,
              email: inputEmail,
              senha: inputSenha
            };
            
            return fetch('/add_User', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dados)
            });
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário.');
          }
          return response.json();
        })
        .then(() => {
          mostrarPopup('Cadastrado com sucesso');
          setTimeout(() => {
            window.location.href = "/entrar";  
          }, 2000);
        })
        .catch((error) => {
          mostrarPopup(error.message);
        });
    }
  } catch (error) {
    mostrarPopup(error.message);
  }
});