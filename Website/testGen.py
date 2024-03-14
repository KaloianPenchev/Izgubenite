import random
import json
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required

gen = Blueprint('gen', __name__)

jsonFile = open("Website/static/JS/questions.json")
questions = json.load(jsonFile)

@gen.route('/maths', methods=['GET', 'POST'])
@login_required
def generateTestMat():
    met = []
    choose = []
    test = []
    for i in questions['maths']:
        for j in questions['maths'][i]:
            choose.append(j)
    for i in choose:
        print(i)
    for i in range(5):
        c = random.choice(choose)
        test.append(c)
        choose.remove(c)
    return render_template('test.html', test=test, subject='maths')


@gen.route('/history', methods=['GET', 'POST'])
@login_required
def generateTestHis():
    met = []
    choose = []
    test = []
    for i in questions['history']:
        for j in questions['history'][i]:
            choose.append(j)
    for i in choose:
        print(i)
    for i in range(5):
        c = random.choice(choose)
        test.append(c)
        choose.remove(c)
    return render_template('test.html', test=test, subject='history')


@gen.route('/geography', methods=['GET', 'POST'])
@login_required
def generateTestGeo():
    met = []
    choose = []
    test = []
    for i in questions['geography']:
        for j in questions['geography'][i]:
            choose.append(j)
    for i in choose:
        print(i)
    for i in range(5):
        c = random.choice(choose)
        test.append(c)
        choose.remove(c)
    return render_template('test.html', test=test, subject='geography')