from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)
# @auth.route('/')
# def login_page():
#     return render_template('login.html' , user=current_user)

@auth.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            if current_user.role == '1':
                return redirect(url_for('auth.profile_teacher'))
            elif current_user.role == '0':
                return redirect(url_for('auth.profile_student'))
        else:
            flash('Incorrect password, try again.', category='error')
        
    return render_template('login.html', user=current_user )

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        
        first_name = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        print(request.form)
        user = User.query.filter_by(email=email).first()
        
        new_user = User(first_name=first_name, email=email, password=generate_password_hash(
            password, method='pbkdf2:sha256') , role=role)
        
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
    
    return render_template('student.html', user=current_user, studentname=current_user.first_name , studentemail=current_user.email)

@auth.route('/profile_teacher')
@login_required
def profile_teacher():
    return render_template('teacher.html', user=current_user, teachername=current_user.first_name , teacheremail=current_user.email)



@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
    
    
@auth.route('/feedbackpage')
@login_required
def feedbackpage():
    if current_user.role == '1':
        return render_template('teacher-feedback.html', user=current_user)
    elif current_user.role == '0':
        return render_template('student-feedback.html', user=current_user)
    

