from flask import Blueprint,render_template,request,flash,redirect,url_for
from .models import User
#for not storing password as it is given bu user, for hashing the password
from werkzeug.security import generate_password_hash,check_password_hash
from . import db
from flask_login import login_user,login_required,logout_user,current_user


auth = Blueprint('auth',__name__)


#login route
@auth.route('/login',methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        email = data['email']
        password = data['password']

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password,password):
                login_user(user,remember = True)
                flash("logged in successfully",category='success')
                return redirect(url_for('views.home'))
            else:
                flash("incorrect password",category='error')
        else:
            flash("user doesnot exists",category='error')
    return render_template("login.html",user=current_user)


#logout route
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))



#signup route
@auth.route('/sign-up', methods = ['GET', 'POST' ])
def signup():
    if request.method == 'POST':
        user_data = request.form
        email = user_data['email']
        password = user_data['password']

        user = User.query.filter_by(email = email).first()

        if len(email) < 4:
            flash("Email must be greater than 4 chars", category = "error")
        else:
            if not user:
                new_user = User(email = email,password = generate_password_hash(password,method="pbkdf2:sha256"))
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user)
                flash("Account created",category = "success")
                return redirect(url_for('views.home'))
            else:
                flash("User already exists",category='error')


    return render_template("signup.html",user=current_user)