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
            flash('Feedback added!', category='success')
    feedbacks = Feedback.query.filter_by(student_email=current_user.email).all()
    return render_template("student-feedback.html", user=current_user, feedbacks=feedbacks)

@views.route('/reaction/<student_email>/<feedback_id>', methods=['GET','POST'])
@login_required
def reacting(student_email, feedback_id):
    if request.method == 'POST' and feedback_id != -1:
        grade = request.form.get('reaction')
        if len(grade) < 1:
            flash('Please select a grade!', category='error')
        else:
            feedback = Feedback.query.filter_by(id=feedback_id).first()
            feedback.grade = grade
            db.session.commit()
            flash('Feedback graded!', category='success')
    feedbacks = Feedback.query.filter_by(student_email=student_email).all()
    student = User.query.filter_by(email=student_email).first()
    return render_template("teacher-feedback.html",  user=current_user, feedbacks=feedbacks, fname=student.first_name, feedback_id=-1)
