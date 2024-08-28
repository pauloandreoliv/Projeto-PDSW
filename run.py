from datetime import datetime, timezone
from flask import Flask
from api.api_routes import api_routes  
from api.html_routes import html_routes
from flask_mail import Mail
from api.firebase_service import initialize_firebase
from config import Config
mail = Mail() 
 
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    initialize_firebase()

    app.register_blueprint(html_routes)
    app.register_blueprint(api_routes)

    mail.init_app(app)  # Inicializa o Mail com a app
    app.mail = mail 

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)