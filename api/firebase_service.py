import firebase_admin
from firebase_admin import credentials, firestore, db
from datetime import datetime, timezone
from flask_mail import Mail, Message
from flask import current_app
import pytz

def initialize_firebase():
    cred = credentials.Certificate('api\key\key.json')
    firebase_admin.initialize_app(cred)
    global db
    db = firestore.client()

def create_admin(nome, cpf, senha):

    doc_ref = db.collection('admin').add({
        'nome': nome,
        'cpf': cpf,
        'senha': senha
    })

def create_user(cpf, nome, email, endereco, telefone, senha):

    doc_ref = db.collection('usuario').add({
        'cpf': cpf,
        'nome': nome,
        'email': email,
        'endereco': endereco,
        'telefone': telefone,
        'senha': senha
    })

def add_prato (nome, valor, url):
    doc_ref = db.collection('prato').add({
        'nome': nome,
        'url_img': url,
        'valor': valor
    })


def delete_prato(prato_id):
    doc_ref = db.collection('prato').document(prato_id)
    doc_ref.delete()

def add_promotion(nome, url_img, valor):
    doc_ref = db.collection('promocao').add({
        'nome': nome,
        'url_img': url_img,
        'valor': valor
    })

def delete_promotion(promotion_id):
    doc_ref = db.collection('promocao').document(promotion_id)
    doc_ref.delete()

def add_unidade(nome, endereco, url_img, mapa):
    doc_ref = db.collection('unidade').add({
        'nome': nome,
        'url_img': url_img,
        'endereco': endereco,
        'mapa': mapa
    })

def delete_restaurant(id):
    doc_ref = db.collection('unidade').document(id)
    doc_ref.delete()

def create_pedido(cpf, formatted_date, endereco, formadepgmto, pratos, telefone_cliente, total):
    doc_ref = db.collection('pedido').add({
        'cpf': cpf,
        'data': formatted_date,
        'endereco': endereco,
        'formadepgmto': formadepgmto,
        'pratos': pratos,
        'telefone_cliente': telefone_cliente,
        'total': total
    })

def update_user(cpf, update_data ):
    doc_ref = db.collection('usuario')
    query = doc_ref.where('cpf', '==', cpf).stream()
    user_docs = list(query)
    if not user_docs:
        return False, "Usuário não encontrado"
    else :  
        user_doc = user_docs[0]
        user_ref = doc_ref.document(user_doc.id)
        user_ref.update(update_data)
        return True, "Usuário atualizado com sucesso"
    
    
     
def FindByCpf(cpf, tipo):
    if tipo == "admin":
        doc_ref = db.collection('admin')
    elif tipo == "usuario": 
        doc_ref = db.collection('usuario')

    query = doc_ref.where('cpf', '==', cpf).stream()
    user_docs = list(query)
    if not user_docs:
        return False, "Usuário não encontrado"
    else :  
        user_doc = user_docs[0]
        user_data = user_doc.to_dict() 
        user_data['id'] = user_doc.id
        return user_data

def FindUserById(user_id):
    try:
        usuarios_ref = db.collection('usuario')
        usuario_doc = usuarios_ref.document(user_id).get()
        if usuario_doc.exists:
            return usuario_doc.to_dict() 
        else:
            return None  
    except Exception as e:
        raise RuntimeError(f"Erro ao buscar usuário: {e}")


def Get_unidades():
    unidades_ref = db.collection('unidade').stream()
    unidades = []
    for unidade in unidades_ref:
        unidade_data = unidade.to_dict()
        unidade_data['id'] = unidade.id
        unidades.append(unidade_data)
    return unidades
    

def Get_pratos():
    pratos_ref = db.collection('prato').stream()
    pratos = []
    for prato in pratos_ref:
        prato_data = prato.to_dict()
        prato_data['id'] = prato.id  
        pratos.append(prato_data)
    return pratos

def Get_promotion():
    promocoes_ref = db.collection('promocao').stream()
    promocoes = []
    for promocao in promocoes_ref:
        promocao_data = promocao.to_dict()
        promocao_data['id'] = promocao.id 
        promocoes.append(promocao_data)
    return promocoes

def Get_pedidos(cpf):
    pedidos_ref = db.collection('pedido').where('cpf', '==', cpf).stream()
    historico = []
    for pedido in pedidos_ref:
        pedido_data = pedido.to_dict()
        historico.append(pedido_data)
    return historico


def get_all_orders():
    try:
        pedidos_ref = db.collection('pedido')
        pedidos = pedidos_ref.stream()
        pedidos_list = []

        for pedido in pedidos:
            pedido_dict = pedido.to_dict()
            pedido_dict['id'] = pedido.id  
            pedidos_list.append(pedido_dict)

        return pedidos_list
    except Exception as e:
        raise RuntimeError(f"Erro ao buscar pedidos: {str(e)}")
    

def get_orders_by_date(inicio_do_dia, fim_do_dia):
    try:
        pedidos_ref = db.collection('pedido')
        pedidos = pedidos_ref.stream()
        pedidos_list = []

        print(f"Início do dia: {inicio_do_dia}") 
        print(f"Fim do dia: {fim_do_dia}")        
        
        for pedido in pedidos:
            pedido_dict = pedido.to_dict()
            data_str = pedido_dict.get('data')
            
            print(f"Data recuperada: {data_str}")  
            
            if data_str:
                try:

                    data_str = data_str.replace('UTC-3', '').strip()
                    data = datetime.strptime(data_str, "%d de %B de %Y às %H:%M:%S")
                    
                
                    data = data.replace(tzinfo=pytz.timezone('America/Sao_Paulo'))
                    data_timestamp = data.astimezone(timezone.utc)
                    
                    print(f"Data convertida: {data_timestamp}")  
                    
               
                    if inicio_do_dia <= data_timestamp <= fim_do_dia:
                        print(f"Pedido dentro do intervalo: {pedido_dict}")  
                        pedido_dict['id'] = pedido.id 
                        pedidos_list.append(pedido_dict)
                    else:
                        print(f"Pedido fora do intervalo: {data_timestamp}")  
                except ValueError as e:
                    print(f"Erro ao converter data para o pedido {pedido.id}: {data_str} - {e}")

        print(f"Pedidos encontrados: {len(pedidos_list)}") 
        return pedidos_list
    except Exception as e:
        raise RuntimeError(f"Erro ao buscar pedidos: {str(e)}")


def get_user_by_email(email):
    users_ref = db.collection('usuario')
    query = users_ref.where('email', '==', email).stream()
    
    for user in query:
        return user.to_dict()
    return None

def send_email(to, subject, body):
    mail = Mail(current_app)
    msg = Message(subject, recipients=[to])
    msg.body = body
    mail.send(msg)

def atualizar_senha_usuario(email, nova_senha):
    usuarios_ref = db.collection('usuario')
    query = usuarios_ref.where('email', '==', email).stream()

    for usuario in query:
        doc_ref = db.collection('usuario').document(usuario.id)
        doc_ref.update({'senha': nova_senha})
        return True

    return False 