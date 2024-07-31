from flask import Flask
from app.firebase_service import initialize_firebase

app = Flask(__name__)
initialize_firebase()

from app import routes