from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DB_NAME = "jobaid"

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config['SECRET_KEY'] = 'sredtrfygtuyhioijk'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:password@localhost/{DB_NAME}'
    db.init_app(app)
    
    from .views import views
    from .auth import auth

    # Register blueprints
    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(auth,url_prefix='/')
    return app