import pytest
from flask import Flask, jsonify, request
from flask.testing import FlaskClient
import api_routes
from unittest.mock import patch

# Configuração da aplicação Flask para testes
@pytest.fixture
def app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(api_routes)
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()

# Testando o login de usuário
@patch('api.firebase_service.FindByCpf')
@patch('api.authentication.gerar_token')
def test_login_user(mock_gerar_token, mock_FindByCpf, client: FlaskClient):
    mock_FindByCpf.return_value = {
        'id': '123',
        'nome': 'Usuário Teste',
        'endereco': 'Rua Teste',
        'cpf': '12345678900',
        'telefone': '123456789',
        'senha': 'senha123'
    }
    mock_gerar_token.return_value = 'fake-token'

    response = client.post('/loginUser', json={
        'cpf': '12345678900',
        'senha': 'senha123'
    })
    assert response.status_code == 200
    assert response.json['nome'] == 'Usuário Teste'
    assert response.json['cpf'] == '12345678900'
    assert response.cookies['auth_token'] == 'fake-token'

# Testando o logout
def test_logout(client: FlaskClient):
    response = client.post('/logout')
    assert response.status_code == 200
    assert 'auth_token' not in response.cookies

# Testando o check_login
def test_check_login(client: FlaskClient):
    response = client.get('/check_login')
    assert response.status_code == 401  # Sem token

    client.set_cookie('localhost', 'auth_token', 'fake-token')
    response = client.get('/check_login')
    assert response.status_code == 200
    assert response.json['logged_in'] == True

# Testando a criação de um novo usuário
@patch('api.firebase_service.create_user')
def test_create_user(mock_create_user, client: FlaskClient):
    mock_create_user.return_value = None

    response = client.post('/add_User', json={
        'cpf': '12345678900',
        'nome': 'Novo Usuário',
        'email': 'novo@usuario.com',
        'endereco': 'Endereço Teste',
        'telefone': '987654321',
        'senha': 'nova-senha'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Cadastro realizado com sucesso!'

# Testando a atualização de um usuário
@patch('api.firebase_service.update_user')
def test_update_user(mock_update_user, client: FlaskClient):
    mock_update_user.return_value = None

    response = client.put('/user/12345678900', json={
        'nome': 'Usuário Atualizado'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Usuario Atualizado com sucesso!'

# Testando a recuperação de senha
@patch('api.firebase_service.atualizar_senha_usuario')
@patch('api.firebase_service.gerar_senha_aleatoria')
def test_recuperar_senha(mock_gerar_senha, mock_atualizar_senha, client: FlaskClient):
    mock_gerar_senha.return_value = 'nova-senha'
    mock_atualizar_senha.return_value = True

    response = client.post('/enviarEmail', json={'email': 'usuario@exemplo.com'})
    assert response.status_code == 200
    assert response.json['message'] == 'Email Enviado com sucesso!'

# Testando a adição de um prato
@patch('api.firebase_service.add_prato')
def test_add_prato(mock_add_prato, client: FlaskClient):
    mock_add_prato.return_value = 'new-id'

    response = client.post('/add_prato', json={
        'nome': 'Prato Teste',
        'valor': '19.99',
        'url_img': 'http://example.com/image.jpg'
    })
    assert response.status_code == 201
    assert response.json['id'] == 'new-id'

# Testando a exclusão de um prato
@patch('api.firebase_service.delete_prato')
def test_delete_prato(mock_delete_prato, client: FlaskClient):
    mock_delete_prato.return_value = None

    response = client.delete('/delete_prato/123')
    assert response.status_code == 200
    assert response.json['message'] == 'Prato excluído com sucesso!'

# Testando a listagem de unidades
@patch('api.firebase_service.Get_unidades')
def test_listar_unidades(mock_get_unidades, client: FlaskClient):
    mock_get_unidades.return_value = [{'nome': 'Unidade 1'}, {'nome': 'Unidade 2'}]

    response = client.get('/unidades')
    assert response.status_code == 200
    assert response.json == {'unidades': [{'nome': 'Unidade 1'}, {'nome': 'Unidade 2'}]}