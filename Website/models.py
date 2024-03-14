from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150))
    password = db.Column(db.String(150))
    role = db.Column(db.String(150))

class Feedback(db.Model):
    student_email = db.Column(db.Text)
    message = db.Column(db.Text)
    grade = db.Column(db.Text)