from flask import Flask
from api import api  
from api.firebase_service import initialize_firebase


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config') 

    initialize_firebase()


    app.register_blueprint(api)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
