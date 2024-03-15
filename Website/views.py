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

@views.route('/reaction/<student_first_name>/<student_email>', methods=['GET','POST'])
@login_required
def reacting(student_first_name, student_email):
    feedbacks = Feedback.query.filter_by(student_email=student_email).all()
    return render_template("teacher-feedback.html",  user=current_user, feedbacks=feedbacks, fname=student_first_name)
