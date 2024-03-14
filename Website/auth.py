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
            
            return redirect(url_for('auth.profile_student'))
                #if current_user.role == '0':
                    #return redirect(url_for('auth.profile-student'))
                #else:
                    #return redirect(url_for('auth.profile-teacher'))

        else:
            flash('Incorrect password, try again.', category='error')
        

    return render_template('login.html', user=current_user)

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        
        first_name = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        # if user:
        #     flash('Email already exists.', category='error')
        #     print("2")
        # else:
        new_user = User(first_name=first_name, email=email, password=generate_password_hash(
            password, method='pbkdf2:sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        flash('Account created!', category='success')
        
        return redirect(url_for('auth.profile_student'))

    return render_template('register.html', user=current_user)




@auth.route('/profile_student')
@login_required
def profile_student():
    #role = current_user.role
    
    return render_template('student.html', user=current_user)

@auth.route('/profile_teacher')
@login_required
def profile_teacher():
    #role = current_user.role
    return render_template('teacher.html', user=current_user)



@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return render_template('login.html' , user=current_user)
    

