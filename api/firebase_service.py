import firebase_admin
from firebase_admin import credentials, firestore, db


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
    #doc_id = doc_ref[1].id 

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

def add_unidade(nome, url_img, endereco, mapa):
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

def getAll_pedidos():
    pedidos_ref = db.collection('pedido')
    historico = []
    for pedido in pedidos_ref.stream():
        pedido_data = pedido.to_dict()
        historico.append(pedido_data)
    return historico