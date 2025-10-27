from flask import Blueprint,render_template,request,flash,jsonify
from flask_login import login_required,current_user
from .models import Questions,Interview,Interview_Questions
from . import db

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

@views.route('/sumit_interview_form',methods = ['POST'])
def sumit_interview_form():
    data = request.get_json()
    InterviewName = data.get('name')
    new_interview = Interview(I_name=InterviewName)
    db.session.add(new_interview)
    db.session.commit()
    return jsonify({"new_interviewId":new_interview.I_id})

@views.route('/create_interview',methods = ['POST'])
def create_interview():
    data = request.get_json()
    InterviewId = data.get('InterviewId')
    questions = data.get('questions',[])
    for q in questions:
        interview_question_record = Interview_Questions(I_id=InterviewId,q_id=q.get('q_id'))
        db.session.add(interview_question_record)
    db.session.commit()
    return "created interview successfully"


@views.route('list_interviews',methods=['GET'])
def list_interviews():
    interviews  = Interview.query.all()
    interviewList = []
    for interview in interviews:
        interviewList.append({
            "I_id":interview.I_id,
            "I_name":interview.I_name
        })
    return jsonify(interviewList)

@views.route('/delete_interview',methods=['POST'])
def delete_interview():
    data = request.get_json()
    deletionId = data.get('dId')
    interviewToDelete = Interview.query.get(deletionId)
    db.session.delete(interviewToDelete)
    db.session.commit()
    return "interview deleted sucessfully"



@views.route('/view_interview',methods=['GET'])
def view_interview_html():
    return render_template('view_interview.html')

  
@views.route('/view_interview',methods=['GET'])
def view_interview():
    data = request.get_json()
    viewId = data.get('I_id')
    interview = Interview.query.get(viewId)
    I_name = interview.I_name
    questions = Interview_Questions.query.filter_by(I_id=viewId).all()

    q = []
    for question in questions:
        q.append({
            "q_id" : question.q_id,
            "question":question.question,
            "answer":question.answer,
            "skill":question.skill,
            "difficulty":question.difficulty
        })
    
    viewInterviewData = {
        "I_name" : I_name,
        "questions" : q
    }
    return jsonify(viewInterviewData)