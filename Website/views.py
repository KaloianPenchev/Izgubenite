from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Feedback, User
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/feedback', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        feedback = request.form.get('feedback')

        if len(feedback) < 1:
            flash('Feedback is too short!', category='error')
        else:
            new_feedback = Feedback(student_email=current_user.email, message=feedback, grade="N/A")
            db.session.add(new_feedback)
            db.session.commit()
    feedbacks = Feedback.query.filter_by(student_email=current_user.email).all()
    sum = 0
    cnt = 0
    for feedback in feedbacks:
        if feedback.grade != "N/A":
            sum += int(feedback.grade)
            cnt += 1
    return render_template("student-feedback.html", user=current_user, feedbacks=feedbacks, sum=sum, cnt=cnt)

@views.route('/reactions/<student_email>', methods=['GET', 'POST'])
@login_required
def reaction(student_email):
    if request.method == 'POST':
        grade = request.form.get('grade')
        if grade and grade != "N/A":
            id = request.form.get('ID')
            
            feedback = Feedback.query.filter_by(id=id).first()
            feedback.grade = grade
            db.session.commit()
    feedbacks = Feedback.query.filter_by(student_email=student_email).all()
    sum = 0
    cnt = 0
    for feedback in feedbacks:
        if feedback.grade != "N/A":
            sum += int(feedback.grade)
            cnt += 1
    return render_template("teacher-feedback.html", user=current_user, student_email=student_email, feedbacks=feedbacks, sum=sum, cnt=cnt)