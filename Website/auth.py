from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)


@auth.route('/', methods=['GET', 'POST'])
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
        usert = User.query.filter_by(first_name=teach_forstudent).first()

        if user:
            flash('Email already exists.', category='error')
        elif usern:
            flash('Username already exists.', category='error')
        elif not usert:
            flash('Teacher does not exist.', category='error')
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

    return render_template('register.html', user=current_user)


@auth.route('/profile_student')
@login_required
def profile_student():
    return render_template('student.html', user=current_user, studentname=current_user.first_name, studentemail=current_user.email)


@auth.route('/profile_teacher')
@login_required
def profile_teacher():
    print("Successfully logged in!")
    students_list = User.query.filter_by(role='0', my_teacher=current_user.first_name).all()
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