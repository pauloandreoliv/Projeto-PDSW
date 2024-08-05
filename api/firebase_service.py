import firebase_admin
from firebase_admin import credentials, firestore, db

def initialize_firebase():
    cred = credentials.Certificate('api\key\key.json')
    firebase_admin.initialize_app(cred)
    
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

def delete_promotion(promotion_id):
    doc_ref = db.collection('promocao').document(promotion_id)
    doc_ref.delete()


def add_unidade(nome, url_img, endereco):
    doc_ref = db.collection('unidade').add({
        'nome': nome,
        'url_img': url_img,
        'endereco': endereco
    })

def create_pedido(cpf, data, endereco, formadepgmto, id, pratos, telefone_cliente, total):
    doc_ref = db.collection('pedido').add({
        'cpf': cpf,
        'data': data,
        'endereco': endereco,
        'formadepgmto': formadepgmto,
        'id': id,
        'pratos': pratos,
        'telefone_cliente': telefone_cliente,
        'total': total
    })

def user_exists(cpf):
    user_ref = db.collection('usuario').where('cpf', '==', cpf).get()
    return len(user_ref) > 0

def admin_exists(cpf):
    admin_ref = db.collection('admin').where('cpf', '==', cpf).get()
    return len(admin_ref) > 0

def prato_exists(nome):
    prato_ref = db.collection('prato').where('nome', '==', nome).get()
    return len(prato_ref) > 0


