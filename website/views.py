from flask import Blueprint,render_template
from flask_login import login_required,current_user
from .models import Questions

views = Blueprint('views',__name__)

@views.route('/')
@login_required
def home():
    return render_template("home.html",user=current_user)

@views.route('/view_questions')
def view_questions():
    questions = Questions.query.all()
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
