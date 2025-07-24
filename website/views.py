from flask import Blueprint,render_template,request,flash,jsonify
from flask_login import login_required,current_user
from .models import Questions

views = Blueprint('views',__name__)

@views.route('/')
@login_required
def home():
    return render_template("home.html",user=current_user)


@views.route('/filter_form',methods = ['GET'])
def filter_form():
    return render_template('filter_form.html')

@views.route('/view_questions',methods=['POST','GET'])
def view_questions():
    data = request.get_json()
    print(data)
    skill = data.get('skill')
    difficulties = data.get('difficulties',[])
    
    questions=[]
    query = Questions.query
    if skill:
        query = query.filter_by(skill = skill)
    if difficulties:
        query = query.filter(Questions.difficulty.in_(difficulties))
    questions = query.all()

    q=[]
    for question in questions:
        q.append({
            "q_id" : question.q_id,
            "question":question.question,
            "answer":question.answer,
            "skill":question.skill,
            "difficulty":question.difficulty
        }) 
    return jsonify(q)



@views.route('/finalize_questions',methods=['GET','POST'])
def finalize_questions():
    data = request.get_json()
    qids = data.get('qid',[])

    final_questions = []
    query = Questions.query
    if qids:
        query = query.filter(Questions.q_id.in_(qids))
    final_questions = query.all()

    f_q = []
    for question in final_questions:
        f_q.append({
            "q_id" : question.q_id,
            "question":question.question,
            "answer":question.answer,
            "skill":question.skill,
            "difficulty":question.difficulty
        })
    return jsonify(f_q)


@views.route('/view_final_questions',methods=['GET'])
def view_final_questions():
    return render_template("final_questions.html")