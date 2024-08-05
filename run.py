from flask import Flask
from api import api  
from api import html_routes
from api.firebase_service import initialize_firebase


def create_app():
    app = Flask(__name__)
    

    initialize_firebase()

    app.register_blueprint(html_routes)
    app.register_blueprint(api)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
