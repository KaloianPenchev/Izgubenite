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
            new_feedback = Feedback(student_id=current_user.id, message=feedback)
            db.session.add(new_feedback)
            db.session.commit()
            flash('Feedback added!', category='success')

    return render_template("student-feedback.html", user=current_user)