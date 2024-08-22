from flask import Flask
from api.api_routes import api_routes  
from api.html_routes import html_routes
from api.firebase_service import initialize_firebase

 
def create_app():
    app = Flask(__name__)
    

    initialize_firebase()

    app.register_blueprint(html_routes)
    app.register_blueprint(api_routes)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
