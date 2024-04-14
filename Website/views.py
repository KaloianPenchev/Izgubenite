from transformers import AutoModelForQuestionAnswering, AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from flask import Blueprint, render_template, request, session
from flask_login import login_required, current_user
from .models import Feedback
from . import db
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

views = Blueprint('views', __name__)

@views.route('/feedback', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        feedback = request.form.get('feedback')

        if len(feedback) < 1:
            pass
        else:
            new_feedback = Feedback(student_email=current_user.email, message=feedback, grade="N/A")
            db.session.add(new_feedback)
            db.session.commit()
    feedbacks = Feedback.query.filter_by(student_email=current_user.email).all()
    
    return render_template("student-feedback.html", user=current_user, feedbacks=feedbacks)

@views.route('/reactions/<student_email>', methods=['GET', 'POST'])
@login_required
def reaction(student_email):
    if request.method == 'POST':
        grade = request.form.get('grade')
        if grade and grade != "N/A":
            id = request.form.get('ID')
            feedback = Feedback.query.filter_by(id=id).first()
            feedback.grade = grade
            db.session.commit()
    feedbacks = Feedback.query.filter_by(student_email=student_email).all()
    return render_template("teacher-feedback.html", user=current_user, student_email=student_email, feedbacks=feedbacks)

@views.route('/chatbot', methods=['GET', 'POST'])
@login_required
def ai():
    questions = []
    answers = []
    data = []
    if request.method == 'POST':
        context = request.form.get('context')
        num_questions = int(request.form.get('num_questions'))

        if num_questions > context.count('.') + 1:
            num_questions = context.count('.') + 1

    
        question_tokenizer = AutoTokenizer.from_pretrained("voidful/context-only-question-generator", max_new_tokens=60)
        question_model = AutoModelForSeq2SeqLM.from_pretrained("voidful/context-only-question-generator")

    

        for _ in range(num_questions):
            random_sentence = random.choice(context.split('.')).strip()
            input_text = random_sentence

            
            question_inputs = question_tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
            generated_question = question_model.generate(question_inputs, max_new_tokens=200, num_return_sequences=1, num_beams=2, early_stopping=True)
            new_question = question_tokenizer.decode(generated_question[0], skip_special_tokens=True)

            
            similarity_scores = [calculate_similarity(new_question, prev_question) for prev_question in questions]
            while any(score > 0.8 for score in similarity_scores):
                random_sentence = random.choice(context.split('.')).strip()
                input_text = random_sentence
                question_inputs = question_tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
                generated_question = question_model.generate(question_inputs, max_new_tokens=200, num_return_sequences=1, num_beams=2, early_stopping=True)
                new_question = question_tokenizer.decode(generated_question[0], skip_special_tokens=True)
                new_question = new_question.capitalize()
                similarity_scores = [calculate_similarity(new_question, prev_question) for prev_question in questions]

            
            input_for_ans = {'question': new_question, 'context': random_sentence}
            
        
            new_answer = random_sentence
            
            questions.append(new_question)
            answers.append(new_answer)

        for q, a in zip(questions, answers):
    
            if q.strip()[-1] != '?':
                q += ','

    
            if a.strip()[-1] != '.':
                a += '.'

            data.append({'question': q.capitalize() if q[0].islower() else q, 'answer': a})

    return render_template('ai.html', questions_answers=data)
    
def calculate_similarity(question1, question2):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([question1, question2])
    similarity = cosine_similarity(vectors[0], vectors[1])
    return similarity[0][0]

