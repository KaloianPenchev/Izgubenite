from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    role = db.Column(db.String(150))
    my_teacher = db.Column(db.String(150), default='__none__')

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_email = db.Column(db.String(150))
    message = db.Column(db.Text)
    grade = db.Column(db.String(5))
    comment = db.Column(db.Text, default = 'N/A')

    def __repr__(self) -> str:
        return f"{self.student_email} - {self.message} - {self.grade}"