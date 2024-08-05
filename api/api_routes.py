from flask import jsonify, Blueprint, request
from . import forms
from . import firebase_service

api_routes = Blueprint('api_routes', __name__)

@api_routes.route("/add_User", methods=['POST'])
def cadastar_client():
    data = request.get_json()
    cpf = data.get('cpf')
    nome = data.get('nome')
    email = data.get('email')
    endereco = data.get('endereco')
    telefone = data.get('telefone')
    senha = data.get('senha')

    if firebase_service.user_exists(cpf):
        return jsonify({'message': 'Usuário com esse CPF já existe.'}), 400

    firebase_service.create_user(cpf, nome, email, endereco, telefone, senha)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200



@api_routes.route("/add_Admin", methods=['POST'])
def cadastar_admin():
    data = request.get_json()
    cpf = data.get('cpf')
    senha = data.get('senha')

    if firebase_service.admin_exists(cpf):
        return jsonify({'message': 'Administrador com esse CPF já existe.'}), 400

    firebase_service.create_user(cpf,senha)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200



@api_routes.route('/add_prato', methods=['POST'])
def add_prato():
    data = request.get_json()
    valor = data.get('valor')
    nome = data.get('nome')
    url_img= data.get('url_img')

    if firebase_service.pratp_exists(nome):
        return jsonify({'message': 'Prato com esse nome já existe.'}), 400

    firebase_service.add_prato(valor, nome, url_img)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200



@api_routes.route('/delete_prato/<prato_id>', methods=['DELETE'])
def remove_prato(prato_id):
    try:
        firebase_service.delete_prato(prato_id)
        return jsonify({'message': 'prato excluído com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@api_routes.route('/add_promotion', methods=['POST'])
def add_promotion():
    data = request.get_json()
    nome = data.get('nome')
    url_img = data.get('url_img')
    valor = data.get('valor')

    try:
        firebase_service.add_promotion(nome, url_img, valor)
        return jsonify({'message': 'Promoção cadastrada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api_routes.route('/delete_promotion/<promotion_id>', methods=['DELETE'])
def delete_promotion(promotion_id):
    try:
        firebase_service.delete_promotion(promotion_id)
        return jsonify({'message': 'Promoção excluída com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api_routes.route('/add_restaurant', methods=['POST'])
def add_restaurant():
    data = request.get_json()
    nome = data.get('nome')
    endereco = data.get('endereco')
    url_img = data.get('url_img')

    try:
        firebase_service.add_unidade(nome, endereco, url_img)
        return jsonify({'message': 'Unidade de restaurante cadastrada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

