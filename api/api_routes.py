from datetime import datetime, timedelta, timezone
from venv import logger
from flask import jsonify, Blueprint, request
from . import firebase_service
from .token import authentication

api_routes = Blueprint('api_routes', __name__)

#-------------------------------Area Cliente--------------------------------------

@api_routes.route('/loginUser', methods=['POST'])
def login():
    try:
        id = request.json['cpf']
        senha = request.json['senha']
        type = "usuario"
        dados = firebase_service.FindByid(id, type)
        
        if firebase_service.returnPassword(dados, senha):
            logger.info('Logado com sucesso')
            token = authentication.gerar_token(dados['id'])
            return jsonify({"id": dados['id'], "token": token}), 200
        else:
            return jsonify({"error": "Acesso negado. Dados inválidos."}), 401
    except Exception as e:
        logger.error(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}", 500

@api_routes.route("/add_User", methods=['POST'])
def create_client():
    data = request.get_json()
    cpf = data.get('cpf')
    nome = data.get('nome')
    email = data.get('email')
    endereco = data.get('endereco')
    telefone = data.get('telefone')
    senha = data.get('senha')

    firebase_service.create_user(cpf, nome, email, endereco, telefone, senha)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200

@api_routes.route('/user/<cpf>', methods=['PATCH'])
def update_user(cpf):
    update_data = request.json
    try:
        firebase_service.update_user(cpf, update_data)
        return jsonify({'message': 'Usuario Atualizado com sucesso!'}), 200
    except Exception as e:
        return f"An Error Occurred: {e}", 500


@api_routes.route("/add_pedido", methods=['POST'])
def create__pedido():
    now = datetime.now(timezone.utc)
    offset = timedelta(hours=-3)
    now_local = now + offset
    formatted_date = now_local.strftime("%d de %B de %Y às %H:%M:%S") + " UTC-3"

    data = request.json
    cpf = data.get('cpf')
    endereco = data.get('endereco')
    formadepgmto = data.get('formadepgmto')
    pratos = data.get('pratos')
    telefone_cliente = data.get('telefone_cliente')
    total = data.get('total')
    try :
        firebase_service.create_pedido(cpf, formatted_date, endereco, formadepgmto, pratos, telefone_cliente, total)
        return jsonify({'message': 'Pedido criado com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@api_routes.route('/historico', methods=['GET'])
def visualizar_historico_produtos():
    try:
        cpf = request.args.get('cpf')
        historico = firebase_service.Get_pedidos(cpf)
        return jsonify({"historico": historico}), 200
    except Exception as e:
        logger.error(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}", 500

#-------------------------------Area ADMIN--------------------------------------

@api_routes.route("/add_Admin", methods=['POST'])
def cadastar_admin():
    data = request.get_json()
    cpf = data.get('cpf')
    senha = data.get('senha')

    firebase_service.create_admin(cpf,senha)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200

@api_routes.route('/loginAdm', methods=['POST'])
def loginAdmin():
    try:
        cpf = request.json['cpf']
        senha = request.json['senha']
        type = "admin"
        dados = firebase_service.FindByid(cpf,type)
    

        if firebase_service.returnPassword(dados, senha ):
            logger.info('Logado com sucesso')
            token = authentication.gerar_token(dados['id'])
            return jsonify({"id": dados['id'], "token": token}), 200
        else:
            return jsonify({"error": "Acesso negado. Dados inválidos."}), 401
    except Exception as e:
        logger.error(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}", 500


#-------------------------------Area Produdo--------------------------------------
@api_routes.route('/add_prato', methods=['POST'])
def add_prato():
    data = request.get_json()
    valor = data.get('valor')
    nome = data.get('nome')
    url_img= data.get('url_img')

    firebase_service.add_prato(valor, nome, url_img)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200


@api_routes.route('/delete_prato/', methods=['DELETE'])
def remove_prato(prato_id):
    try:
        firebase_service.delete_prato(prato_id)
        return jsonify({'message': 'prato excluído com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@api_routes.route('/get_pratos', methods=['GET'])
def get_pratos():
    try:
        pratos = firebase_service.Get_pratos()  
        return jsonify(pratos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500





#-------------------------------Area Promoção--------------------------------------
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

@api_routes.route('/delete_promotion/<id>', methods=['DELETE'])
def delete_promotion(id):
    try:
        firebase_service.delete_promotion(id)
        return jsonify({'message': 'Promoção excluída com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@api_routes.route('/get_promotions', methods=['GET'])
def get_promocao():
    try:
        promocao = firebase_service.Get_promocoes()  
        return jsonify(promocao)
    except Exception as e:
        return jsonify({'message': str(e)}), 500



#-------------------------------Area Unidade--------------------------------------
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


@api_routes.route('/delete_restaurant/<nome>', methods=['DELETE'])
def delete_restaurant(nome):
    try:
        firebase_service.delete_restaurant(nome)
        return jsonify({'message': 'Unidade excluída com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@api_routes.route('/unidades', methods=['GET'])
def listar_unidades():
    try:
        unidades = firebase_service.Get_unidades()
        return jsonify({"unidades": unidades}), 200
    except Exception as e:
        logger.error(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}", 500




