from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify  # Add jsonify import
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
import json
auth = Blueprint('auth', __name__)

@auth.route('/')
def home():
    return render_template('landing.html', user=current_user)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()

        if user is None:
            flash('Account does not exist.', category='error')

        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            if current_user.role == '1':
                return redirect(url_for('auth.profile_teacher'))
            elif current_user.role == '0':
                return redirect(url_for('auth.profile_student'))
        else:
            flash('Incorrect password, try again.', category='error')

    return render_template('login.html', user=current_user)


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        first_name = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        teach_forstudent = request.form.get('my_teacher')
        user = User.query.filter_by(email=email).first()
        usern = User.query.filter_by(first_name=first_name).first()

        if user:
            flash('Email already exists.', category='error')
        elif usern:
            flash('Username already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif len(password) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(first_name=first_name, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'), role=role, my_teacher=teach_forstudent)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            if current_user.role == '1':
                return redirect(url_for('auth.profile_teacher'))
            elif current_user.role == '0':
                return redirect(url_for('auth.profile_student'))

    return render_template('register.html', user=current_user, teacher_list=User.query.filter_by(role='1').all())


@auth.route('/profile_student')
@login_required
def profile_student():
    return render_template('student.html', user=current_user, studentname=current_user.first_name, studentemail=current_user.email, teachername=current_user.my_teacher)


@auth.route('/profile_teacher')
@login_required
def profile_teacher():
    students_list = User.query.filter_by(role='0').all()
    return render_template('teacher.html', user=current_user, teachername=current_user.first_name, teacheremail=current_user.email, students=students_list, feedback_id=-1)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/feedbackpage')
@login_required
def feedbackpage():
    return redirect(url_for('views.home'))


@auth.route('/test/<category>')
@login_required
def test(category):
    return render_template('questions.html', user=current_user, category=category)

@auth.route('/addtest')
@login_required
def addtest():
    return render_template('add-question.html', user=current_user)

@auth.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        category = int(request.form['category']) - 1
        question = request.form['question']
        option_a = request.form['option_a']
        option_b = request.form['option_b']
        option_c = request.form['option_c']
        option_d = request.form['option_d']
        ans =  request.form['ans']
        explanation = request.form['explanation']
        
        # Now you have all the form data, you can process it as needed.
        
        return modify_json_and_render(category, question, option_a, option_b, option_c, option_d, ans, explanation)


@auth.route('/add-question', methods=['POST', 'GET'])
@login_required
def modify_json_and_render(cat, quest, a, b, c, d, ans,exp):
    try:
        file_path = 'Website/static/arrays.json'
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Modify the data (for example, add a new array)
        data['questions'][cat].append(quest)
        data['pos_choisses'][cat].append([a, b, c, d])
        data['answer'][cat].append(ans)
        data['explanations'][cat].append(exp)
        # Write the modified data back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

        # Return the modified data as JSON response
        return jsonify(data)
    except Exception as e:
        print("Error:", e)
        response = {'error': str(e)}
        return jsonify(response)
