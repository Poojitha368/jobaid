from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "jobaid"

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config['SECRET_KEY'] = 'sredtrfygtuyhioijk'
    # app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:password@localhost/{DB_NAME}'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://poojitha:p%40ssw0rd@ls-8351950865b689bfff6492a24882a37e8a8e80df.cgd4aj6sswr0.us-east-1.rds.amazonaws.com:3306/{DB_NAME}'
    db.init_app(app)

    
    from .views import views
    from .auth import auth

    # Register blueprints
    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(auth,url_prefix='/')


    #importing tables from models
    from .models import User
    # database setup
    create_database(app)


    #where does flask redirect us when we are not logged in
    #So as we mentioned login_required so we are saying
    #that if not logged in go to login route in auth.py
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    #use this function to load the user with the help of id(primary key)
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    with app.app_context():
        db.create_all()
        print('created tables in database')