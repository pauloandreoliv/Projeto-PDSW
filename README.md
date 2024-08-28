# Restaurante Green Burguer

Bem-vindo ao repositório.
Este projeto foi desenvolvido utilizando uma combinação de tecnologias modernas para oferecer uma experiência de usuário fluida e eficiente tanto para clientes quanto para administradores.

## 🔧 Ferramentas Utilizadas

- **Flask**: Framework web principal utilizado para desenvolver a aplicação backend.
- **JavaScript (JS)**: Para manipulação do DOM, interação com o backend e funcionalidades dinâmicas no frontend.
- **HTML/CSS**: Estruturação e estilização das páginas web.
- **Firebase**: Utilizado como banco de dados para armazenar informações dos usuários, pratos, unidades e promoções.
- **CSS**: Para design responsivo e componentes de interface.

## 📦 Principais Extensões Flask Instaladas

- **Flask-RESTful**: Para facilitar a criação de APIs RESTful.
- **Flask-WTF**: Para manipulação e validação de formulários.
- **Flask-Login**: Gerenciamento de sessões de usuário e autenticação.
- **Firebase Admin SDK**: Integração com Firebase para manipulação dos dados.
- **Flask-Mail**: Para envio de e-mails.



## 🗂️ Desenho da Arquitetura do Projeto

O projeto está organizado em uma estrutura clara e modular para facilitar o desenvolvimento, manutenção e expansão. A seguir, uma descrição das principais pastas:

- **/api**: Contém as configurações dos métodos HTTP, as funções principais e a conexão com o Firestore.
  - **/key**: Contém a chave de acesso ao Firestore, necessária para a conexão e autenticação com o banco de dados do Firebase.
  - **/token**: responsável pela configuração e gerenciamento do sistema de login e autenticação de usuários.
  - **/api_routes.py**: Script que define as rotas da API, responsáveis pelo processamento das solicitações HTTP e pela interação com os serviços do backend.
  - **/firebase_service.py**: Script que implementa as funcionalidades de comunicação com o Firebase, incluindo operações de CRUD e inicialização dos serviços do Firebase.
  - **/html_routes.py**: Script que define as rotas HTML, responsáveis pela renderização de templates e pela navegação entre as páginas do site.
- **/static**: Arquivos estáticos como CSS, JavaScript, imagens e ícones.
  - **/css**: Arquivos de estilização.
  - **/js**: Scripts JavaScript.
  - **/img**: Imagens utilizadas no site.
- **/templates**: Arquivos HTML que são renderizados pelo Flask.

- **/run.py**: Arquivo principal que inicializa a aplicação Flask, configura as rotas principais e chama os templates HTML.

## Visualização de alguns templates
![image](https://github.com/user-attachments/assets/e436d66e-9387-4aad-b0a3-adfac3ba65c0)
![image](https://github.com/user-attachments/assets/cf55802d-8cf7-495a-9289-ecdc6f996191)
![image](https://github.com/user-attachments/assets/a69aa472-2c6c-4030-a481-11b2b20acda6)
![image](https://github.com/user-attachments/assets/1d662664-8693-4c72-a363-188bc75c027f)
![image](https://github.com/user-attachments/assets/f31ea441-2a43-40b0-a200-e3921b119fd7)
![image](https://github.com/user-attachments/assets/246e47f2-1ff0-4d34-8144-07a011e9d348)
![image](https://github.com/user-attachments/assets/192929a1-6f63-4fa7-a2cc-247e3f8be8cc)
![image](https://github.com/user-attachments/assets/ca31205e-e183-4844-954d-ed6e03265954)


## Testes unitarios
O Teste foi Feito na validação do Token de Usuario.

## 🛠️ Principais Funcionalidades

### Perfis de Usuário

- **Entrada de Usuário (Clientes)**
  - **Cadastro e Login**: Os clientes podem se cadastrar e fazer login na plataforma.
  - **Navegação no Cardápio**: Visualização dinâmica do cardápio.
  - **Realizar Pedidos**: Seleção de pratos e envio de pedidos diretamente pelo site.
  - **Visualização de Promoções**: Clientes têm acesso às promoções disponíveis.
  - **Consulta de Unidades**: Os clientes podem visualizar as unidades do restaurante, incluindo localização no mapa.
  - **Consulta de dados do Usuario**: Os clientes podem visualizar as unidades do restaurante, incluindo localização no mapa.
  - **Envio de E-mail com nova senha**: Os clientes podem solicitar uam nova senha caso esqueçam a sua .

- **Entrada de Administrador**
  - **Gerenciamento de Pratos**: Administradores podem cadastrar, editar e excluir pratos do cardápio.
  - **Gerenciamento de Promoções**: Controle completo sobre as promoções ativas e futuras.
  - **Cadastro de Unidades**: Inclusão de novas unidades do restaurante, com validação de campos e mensagens de feedback.
  - **Visualização de Pedidos**: Acompanhamento de pedidos realizados pelos clientes em tempo real.


### Funcionalidades Comuns

- **Autenticação e Segurança**: Implementação de autenticação segura, utilizando tokens e cookies seguros para sessões de login.
- **Notificações**: Exibição de mensagens de sucesso ou erro através de popups, melhorando a experiência do usuário.
- **Responsividade**: O site é totalmente responsivo, garantindo uma boa experiência em dispositivos móveis e desktops.

## 🚀 Como Rodar o Projeto

1. Clone este repositório
2. Importe as Extenções
3. Execute a aplicação: `flask run`
4. Acesse o site em `http://127.0.0.1:5000/`.


## 📎 Links Adicionais

- [https://drive.google.com/drive/folders/1VPuwDWl3iuWWGSMvilQN4vF-3c7zzzp8?usp=sharing](#)
- [https://docs.google.com/document/d/1MLy9M4Fc8zIEifQRnw--Z7irv7Kk7f-9/edit)(#)


##  📥 Comandos pip install e Importações do Projeto
```python
pip install Flask
pip install Flask-RESTful
pip install Flask-WTF
pip install Flask-Login
pip install Flask-CORS
pip install Flask-SQLAlchemy
pip install firebase-admin
pip install Flask-Mail


O projeto utiliza as Principais importações mas obviamente ao longo dos arquivos podem encontrar outras

from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, Blueprint, request, make_response, current_app
from api.api_routes import api_routes  
from api.html_routes import html_routes
from api.firebase_service import initialize_firebase
import logging
from flask_mail import Mail, Message
import firebase_admin
from firebase_admin import credentials, firestore, db
from . import firebase_service
from .token import authentication
