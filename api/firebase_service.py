import firebase_admin
from firebase_admin import credentials, firestore, db


def initialize_firebase():
    cred = credentials.Certificate('api\key\key.json')
    firebase_admin.initialize_app(cred)
    global db
    db = firestore.client()

def create_admin(cpf, senha):

    doc_ref = db.collection('admin').add({
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

def add_prato (nome, url_img, valor):

    doc_ref = db.collection('prato').add({
        'nome': nome,
        'url_img': url_img,
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

def delete_promotion(id):
    doc_ref = db.collection('promocao').document(id)
    doc_ref.delete()


def add_unidade(nome, url_img, endereco):
    doc_ref = db.collection('unidade').add({
        'nome': nome,
        'url_img': url_img,
        'endereco': endereco
    })

def delete_restaurant(id):
    doc_ref = db.collection('unidade').document(id)
    doc_ref.delete()

def create_pedido(cpf, data, endereco, formadepgmto, pratos, telefone_cliente, total):
    doc_ref = db.collection('pedido').add({
        'cpf': cpf,
        'data': data,
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
     
def FindByCpf(cpf, type):
    if type == "admin":
        doc_ref = db.collection('admin')
    elif type == "usuario":
        doc_ref = db.collection('usuario')

    query = doc_ref.where('cpf', '==', cpf).stream()
    user_docs = list(query)
    if not user_docs:
        return False, "Usuário não encontrado"
    else :  
        user_doc = user_docs[0]
        user_ref = doc_ref.document(user_doc.id)
        return user_ref

def returnPassoword(dados, senha):
    return dados and dados.get('senha') == senha