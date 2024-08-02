import firebase_admin
from firebase_admin import credentials, auth, firestore, db

def initialize_firebase():
    cred = credentials.Certificate('')
    firebase_admin.initialize_app(cred)
    global db
    db = firestore.client()

def create_admin(cpf, senha):
    doc_ref = db.collection('admin').document()
    doc_ref.set({
        'cpf': cpf,
        'senha': senha
    })

def create_user(cpf, nome, email, endereco, telefone, senha):
    doc_ref = db.collection('usuario').document()
    doc_ref.set({
        'cpf': cpf,
        'nome': nome,
        'email': email,
        'endereco': endereco,
        'telefone': telefone,
        'senha': senha
    })

def add_product(nome, url_img, valor):
    doc_ref = db.collection('prato').document()
    doc_ref.set({
        'nome': nome,
        'url_img': url_img,
        'valor': valor
    })

def add_promotion(nome, url_img, valor):
    doc_ref = db.collection('promocao').document()
    doc_ref.set({
        'nome': nome,
        'url_img': url_img,
        'valor': valor
    })

def add_unit(nome, url, endereco):
    doc_ref = db.collection('unidade').document()
    doc_ref.set({
        'nome': nome,
        'url': url,
        'endereco': endereco
    })

def create_order(data, endereco, formadepgmto, pratos, total):
    doc_ref = db.collection('pedido').document()
    doc_ref.set({
        'data': data,
        'endereco': endereco,
        'formadepgmto': formadepgmto,
        'pratos': pratos,
        'total': total
    })