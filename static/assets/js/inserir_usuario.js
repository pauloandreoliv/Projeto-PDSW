import { mostrarPopup } from "./popup.js";

const cadastrarButton = document.getElementById("botao_enviar");

cadastrarButton.addEventListener('click', (event) => {
  event.preventDefault();

  console.log("Botão de cadastro clicado"); 

  const inputNome = document.forms["cadastro"]["inputnome"].value;
  const inputCPF = document.forms["cadastro"]["inputcpf"].value;
  const inputEndereco = document.forms["cadastro"]["inputendereco"].value;
  const inputTelefone = document.forms["cadastro"]["inputtelefone"].value;
  const inputEmail = document.forms["cadastro"]["inputemail"].value;
  const inputSenha = document.forms["cadastro"]["inputsenha"].value;
  
  console.log("Dados do formulário:", { inputNome, inputCPF, inputEndereco, inputTelefone, inputEmail, inputSenha }); // Log dos dados do formulário

  try {
    if (inputNome.length === 0 || inputNome == null || inputNome == undefined || !inputNome.match(/^[a-zA-Z\s]+$/)) {
      throw new Error("O nome deve conter apenas letras sem acentos.");
    } else if(inputCPF.length === 0 || inputCPF == null || inputCPF == undefined || !inputCPF.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      throw new Error("O CPF deve seguir o formato 000.000.000-00");
    } else if (inputEndereco.length === 0 || inputEndereco == null || inputEndereco == undefined) {
      throw new Error("O endereço não pode estar vazio.");
    } else if(inputTelefone.length === 0 || inputTelefone == null || inputTelefone == undefined || !inputTelefone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)) {
      throw new Error("O telefone deve estar no formato (00) 90000-0000.");
    } else if(inputEmail.length === 0 || inputEmail == null || inputEmail == undefined || !inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      throw new Error("O e-mail deve seguir o formato padrão.");
    } else if(inputSenha.length === 0 || inputSenha === null || inputSenha === undefined || !inputSenha.match(/^.{8,}$/)) {
      throw new Error("A senha deve conter no mínimo 8 caracters.");
    } else {
      const dados = {
        nome: inputNome,
        cpf: inputCPF,
        endereco: inputEndereco,
        telefone: inputTelefone,
        email: inputEmail,
        senha: inputSenha
      };
    
      fetch('/add_User', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
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