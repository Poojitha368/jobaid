from flask import Blueprint,render_template,request,flash

auth = Blueprint('auth',__name__)

@auth.route('/login',methods = ['GET', 'POST'])
def login():
    data = request.form
    print(data['email'])
    print(data['password'])
    return render_template("login.html")
@auth.route('/logout')
def logout():
    return render_template("logout.html")

@auth.route('/sign-up', methods = ['GET', 'POST' ])
def signup():
    if request.method == 'POST':
        user_data = request.form
        email = user_data['email']
        password = user_data['password']

        if len(email) < 4:
            flash("Email must be greater than 4 chars", category = "error")
        else:
            flash("Account created",category = "success")

    return render_template("signup.html")











