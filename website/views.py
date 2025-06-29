from flask import Blueprint,render_template,request,flash
from flask_login import login_required,current_user
from .models import Questions

views = Blueprint('views',__name__)

@views.route('/')
@login_required
def home():
    return render_template("home.html",user=current_user)

@views.route('/view_questions',methods=['POST','GET'])
def view_questions():
    if request.method == 'POST':
        skill=request.form['skill']
        difficulties = request.form.getlist('difficulty')
        print(request.form)
        # print(questions)

        # if request.form['easy']:
        #     easy=request.form['easy']
        # if request.form['medium']:
        #     medium=request.form['medium']
        # if request.form['hard']:
        #     hard=request.form['hard'] 
        # print(request.form.getlist('difficulty'))
        # questions = Questions.query.all()
        if skill:
            questions = Questions.query.filter(Questions.skill ==  skill,Questions.difficulty.in_(difficulties)).all()
        else:
            questions = Questions.query.filter(Questions.difficulty.in_(difficulties)).all()
        
        if not questions:
            flash("No questions are present",category='error')
        # print(questions)
        '''q=[]
        for question in questions:
            q.append({
                "q_id" : question.q_id,
                "questions":question.question,
                "answer":question.answer,
                "skill":question.skill,
                "difficulty":question.difficulty
            })
        return q'''

    return render_template('view_questions.html',questions=questions)

