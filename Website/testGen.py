import random
import json
from flask import Flask, Blueprint, render_template, request, flash, redirect, url_for

generator = Blueprint('auth', __name__)

questions = json.load(open("static\JS\questions.json", "r"))

@generator.route('/maths', methods=['GET', 'POST'])
def generateTest():
    met = [0] * 100
    choose = []
    test = []
    for i in questions:
        if i['category'] == 'maths':
            choose.append(i)
    for i in range(5):
        c = random.randint(0, len(choose) - 1)
        if met[c] == 0:
            met[c] = 1
            test.append(choose[c])
        else:
            i -= 1
    return render_template('test.html', test=test, subject='maths')


@generator.route('/history', methods=['GET', 'POST'])
def generateTest():
    met = [0] * 100
    choose = []
    test = []
    for i in questions:
        if i['category'] == 'history':
            choose.append(i)
    for i in range(5):
        c = random.randint(0, len(choose) - 1)
        if met[c] == 0:
            met[c] = 1
            test.append(choose[c])
        else:
            i -= 1
    return render_template('test.html', test=test, subject='history')


@generator.route('/geography', methods=['GET', 'POST'])
def generateTest():
    met = [0] * 100
    choose = []
    test = []
    for i in questions:
        if i['category'] == 'geography':
            choose.append(i)
    for i in range(5):
        c = random.randint(0, len(choose) - 1)
        if met[c] == 0:
            met[c] = 1
            test.append(choose[c])
        else:
            i -= 1
    return render_template('test.html', test=test, subject='geography')