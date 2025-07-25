from . import db
from flask_login import UserMixin 
from sqlalchemy.sql import func


# # schema of Notes table
# class Note(db.Model):
#     id = db.Column(db.Integer,primary_key=True)
#     data = db.Column(db.String(10000))
#     date = db.Column(db.DateTime(),default = func.now())
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    


# schema of users table
class User(db.Model,UserMixin):
    id = db.Column(db.Integer,primary_key = True)
    email = db.Column(db.String(150),unique = True)
    password = db.Column(db.String(150))
    # notes = db.relationship('Note')

class Questions(db.Model):
    q_id = db.Column(db.Integer,primary_key = True)
    question = db.Column(db.Text)
    answer = db.Column(db.Text)
    skill = db.Column(db.Text)
    difficulty = db.Column(db.String(6))

class Interview(db.Model):
    I_id = db.Column(db.Integer,primary_key=True,autoincrement = True)
    I_name = db.Column(db.String(150))
