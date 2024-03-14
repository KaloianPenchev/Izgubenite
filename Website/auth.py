from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db   
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)
@auth.route('/')
def login():
    return render_template('login.html' , user=current_user)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                if current_user.role == '0':
                    return redirect(url_for('auth.profile-student'))
                else:
                    return redirect(url_for('auth.profile-teacher'))

            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template('login.html', user=current_user)

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        first_name = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif not first_name:
            flash('Name is required', category='error')
        elif not email:
            flash('Email is required', category='error')
        elif not password:
            flash('Password is required', category='error')
        elif not role:
            flash('Role is required', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password, method='pbkdf2:sha256') , role=role)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            if current_user.role == '0':
                return redirect(url_for('auth.profile-student') , user=current_user)
            else:
                return redirect(url_for('auth.profile-teacher') , user=current_user)
            

    return render_template('sign_up.html', user=current_user)


@auth.route('/profile-student')
@login_required
def profile_student():
    role = current_user.role
    return render_template('student.html', user=current_user, role=role, username=current_user.first_name, email=current_user.email)

@auth.route('/profile-teacher')
@login_required
def profile_teacher():
    role = current_user.role
    return render_template('teacher.html', user=current_user, role=role, username=current_user.first_name, email=current_user.email)



@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return render_template('login.html' , user=current_user)
    

