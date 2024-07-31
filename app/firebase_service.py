import firebase_admin
from firebase_admin import credentials, db

def initialize_firebase():
    cred = credentials.Certificate('')
    firebase_admin.initialize_app(cred, {
        'databaseURL': ''
    })

def get_data():
    ref = db.reference('')
    return ref.get()

def add_data():
    ref = db.reference('')
    ref.push()