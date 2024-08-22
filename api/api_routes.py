from datetime import datetime, timedelta, timezone
from venv import logger
from flask import jsonify, Blueprint, request, make_response
from . import firebase_service
from .token import authentication

api_routes = Blueprint('api_routes', __name__)

#-------------------------------Login--------------------------------------

@api_routes.route('/loginUser', methods=['POST'])
def login():
    try:
        cpf = request.json['cpf']
        senha = request.json['senha']
        type = "usuario"
        dados = firebase_service.FindByCpf(cpf, type)
        
        if not dados:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        if dados['senha'] == senha:
            token = authentication.gerar_token(dados['id'])
            
            response = make_response(jsonify({
                'success': True,
                'nome': dados['nome'],
                'endereco': dados['endereco'],
                'cpf': dados['cpf'],
                'telefone': dados['telefone'],
            }), 200)
            
            response.set_cookie('auth_token', token, httponly=True, secure=True, samesite='Lax')
            return response
        else:
            return jsonify({"error": "Acesso negado. Dados inválidos."}), 401
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

 
@api_routes.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logout realizado com sucesso'})

    response.delete_cookie('auth_token')
    
    return response


@api_routes.route('/check_login', methods=['GET'])
def check_login():
    token = request.cookies.get('auth_token')
    if not token:
        return jsonify({"logged_in": False}), 401

    else:
        return jsonify({"logged_in": True})
  
#-----------------------------------------Usuer-----------------------------------------------------------------------------

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


@api_routes.route('/user/<cpf>', methods=['PUT'])
def update_user(cpf):
    token = request.cookies.get('auth_token')
    if not token:
        return jsonify({"error": "Token não encontrado"}), 401
    
    try:
        update_data = request.json
        firebase_service.update_user(cpf, update_data)
        return jsonify({'message': 'Usuario Atualizado com sucesso!'}), 200
    except Exception as e:
        return f"An Error Occurred: {e}", 500


@api_routes.route('/getUser', methods=['GET'])
def get_usuario():
    token = request.cookies.get('auth_token')
    if not token:
        return jsonify({"error": "Token não encontrado"}), 401   
    try:
        token_decodificado = authentication.validar_token(token)
        user_id = token_decodificado['id']
        
        dados_usuario = firebase_service.FindUserById(user_id)  
        
        if dados_usuario:
            return jsonify(dados_usuario), 200
        else:
            return jsonify({"error": "Usuário não encontrado"}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 401

#----------------------------------------------Pedidos----------------------------------------------------------------

@api_routes.route("/add_pedido", methods=['POST'])
def create__pedido():
    now = datetime.now(timezone.utc)
    offset = timedelta(hours=-3)
    now_local = now + offset
    formatted_date = now_local.strftime("%d de %B de %Y às %H:%M:%S") 

    data = request.json
    cpf = data.get('cpf')
    endereco = data.get('endereco')
    telefone_cliente = data.get('telefone_cliente')
    formadepgmto = data.get('formadepgmto')
    pratos = data.get('pratos')
    total = data.get('total')
    try :
        firebase_service.create_pedido(cpf, formatted_date, endereco, formadepgmto, pratos, telefone_cliente, total)
        return jsonify({'message': 'Pedido criado com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    


@api_routes.route('/historico/<cpf>', methods=['GET'])
def visualizar_historico_produtos(cpf):
    try:
        historico = firebase_service.Get_pedidos(cpf)
        return jsonify({"historico": historico}), 200
    except Exception as e:
        logger.error(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}", 500
    

@api_routes.route('/historicoAdmin', methods=['GET'])
def historico_admin():
    try:
        pedidos = firebase_service.getAll_pedidos()
        if pedidos is None:
            pedidos = [] 
        return jsonify(pedidos)
    except Exception as e:
        print(f"Erro ao buscar pedidos: {e}")
        return jsonify({"error": "Erro ao buscar pedidos"}), 500

#-------------------------------Area ADMIN--------------------------------------

@api_routes.route("/add_Admin", methods=['POST'])
def cadastar_admin():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    senha = data.get('senha')

    firebase_service.create_admin(nome,cpf,senha)

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200

@api_routes.route('/loginAdm', methods=['POST'])
def loginAdim():
    try:
        cpf = request.json['cpf']
        senha = request.json['senha']
        type = "admin"
        dados = firebase_service.FindByCpf(cpf, type)
        
        if not dados:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        if dados['senha'] == senha:
            token = authentication.gerar_token(dados['id'])
            
            response = make_response(jsonify({
                'success': True,
                'nome': dados['nome'],
                'cpf': dados['cpf'],
            }), 200)
            
            response.set_cookie('auth_token', token, httponly=True, secure=True, samesite='Lax')
            return response
        else:
            return jsonify({"error": "Acesso negado. Dados inválidos."}), 401
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


#-------------------------------Area Produdo--------------------------------------
@api_routes.route('/add_prato', methods=['POST'])
def add_prato():
    try:
        dados = request.json
        nome = dados.get('nome')
        valor = dados.get('valor')
        url = dados.get('url_img')

        if not nome or not valor or not url:
            return jsonify({"success": False, "message": "Todos os campos são obrigatórios."}), 400

        novo_prato_ref = firebase_service.add_prato(nome, valor, url)

        return jsonify({"success": True, "id": novo_prato_ref}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    


@api_routes.route('/delete_prato/<id>', methods=['DELETE'])
def remove_prato(id):
    try:
        firebase_service.delete_prato(id)
        return jsonify({'message': 'Prato excluído com sucesso!'}), 200
    except Exception as e:
        # Log the error for debugging
        print(f"Erro ao excluir prato: {e}")
        return jsonify({'message': 'Erro ao excluir prato. Detalhes: ' + str(e)}), 500

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
        promocao = firebase_service.Get_promotion()  
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
    mapa = data.get('mapa')

    try:
        firebase_service.add_unidade(nome, endereco, url_img, mapa)
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




