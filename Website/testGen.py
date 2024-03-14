questions = [
    {
        "question": "How much is the square root of 25?",
        "options": ["625", "5", "6", "7"],
        "answer": "5",
        "category": "maths"
    },
    {
        "question": "How much is the square root of 169?",
        "options": ["14", "13", "9", "28561"],
        "answer": "13",
        "category": "maths"
    },
    {
        "question": "The square root of 289 is?:",
        "options": ["17", "13", "21", "14"],
        "answer": "17",
        "category": "maths"
    },
    {
        "question": "How much is 1 to the power of 0?",
        "options": ["1", "0", "0.5", "-1"],
        "answer": "1",
        "category": "maths"
    },
    {
        "question": "How much is 3 to the power of 4?",
        "options": ["126", "81", "12", "412"],
        "answer": "81",
        "category": "maths"
    },
    {
        "question": "How much is 4 to the power of 2?",
        "options": ["12", "8", "16", "32"],
        "answer": "16",
        "category": "maths"
    },
    {
        "question": "What is the formula to calculate the area of a circle?",
        "options": ["π*r*r", "π*π*r", "2*π*r", "4*r*r"],
        "answer": "π*r*r",
        "category": "maths"
    },
    {
        "question": "What is the area of a circle with a 16cm diameter",
        "options": ["32π", "16π", "256π", "8π"],
        "answer": "32π",
        "category": "maths"
    },
    {
        "question": "What is the area of a circle with a 6cm radius",
        "options": ["12π", "36π", "126π", "218π"],
        "answer": "36π",
        "category": "maths"
    },
    {
        "question": "At least how many points do you need to form a plane?",
        "options": ["0", "1", "2", "3"],
        "answer": "3",
        "category": "maths"
    },
    {
        "question": "At least how many points do you need to form a segment?",
        "options": ["1", "4", "2", "3"],
        "answer": "2",
        "category": "maths"
    },
    {
        "question": "How many points does a nonagon have?",
        "options": ["7", "3", "9", "6"],
        "answer": "9",
        "category": "maths"
    },
    {
        "question": "A right-angled triangle ABC(C=90°) has coordinates of points A(2, 4) and B(6, 8).Find the coordinates of point C.",
        "options": ["C(6, 4)", "C(2, 6)", "C(4, 6)", "C(8, 2)"],
        "answer": "C(6, 4)",
        "category": "maths"
    },
    {
        "question": "What are the roots of the equation: x*x - 3 * 3 = 0?",
        "options": ["3 и -3", "1 и 0", "2 и 3", "no real roots"],
        "answer": "3 и -3",
        "category": "maths"
    },
    {
        "question": "What are the roots of the equation: 4*x*x + x - 5 = 0?",
        "options": ["2 и 4", "-1 и 1.25", "2 и 6", "no real roots"],
        "answer": "3 и -3",
        "category": "maths"
    },
    {
        "question": "What are the roots of the equation: 4*x*x + x + 3 + 8*x*x = 0?",
        "options": ["6 и -2", "-1 и 3", "-4 и 3", "no real roots"],
        "answer": "няма реални корени",
        "category": "maths"
    },
    {
        "question": "Who is thought to be \"the father of history\"?",
        "options": ["Platon", "Aristotle", "Herodotus", "Socrates"],
        "answer": "Херодот",
        "category": "history"
    },
    {
        "question": "What is the first bulgarian contitution called?",
        "options": ["The Revivalist Constitution", "The Plovdiv Constitution", "The Stanbolovian Constitution", "The Tarnovo Constitution"],
        "answer": "Търновска",
        "category": "history"
    },
    {
        "question": "What year does bulgaria declare independece from the Ottoman empire?",
        "options": ["1787", "2023", "1878", "1867"],
        "answer": "1878",
        "category": "history"
    },
    {
        "question": "Under which ruler were the Bulgarians baptized??",
        "options": ["Boris I", "Peter I", "Simeon", "Krum"],
        "answer": "Boris I",
        "category": "history"
    },
    {
        "question": "What is the square root of 25?",
        "options": ["4", "5", "6", "7"],
        "answer": "5",
        "category": "history"
    },
    {
        "question": "Which nation the the island Bali belong to?",
        "options": ["Indonesia", "Malaysia", "New Zeland", "Australia"],
        "answer": "Indonesia",
        "category": "geography"
    },
    {
        "question": "Which is the largest country in the world?",
        "options": ["Canada", "USA", "India", "Russia"],
        "answer": "Russia",
        "category": "geography"
    },
    {
        "question": "Inside which country is mount Everest located inside of?",
        "options": ["Nepal", "China", "Bhutan", "Pakistan"],
        "answer": "Nepal",
        "category": "geography"
    },
    {
        "question": "Which city is th capital of Australia?",
        "options": ["Sidney", "Purt", "Canberra", "Melbourne"],
        "answer": "Canberra",
        "category": "geography"
    },
    {
        "question": "КHow much of the earth is tcovered by water",
        "options": ["71%", "62%", "88%", "40.5%"],
        "answer": "71%",
        "category": "geography"
    }
]

import random
import json
from flask import Flask, Blueprint, render_template, request, flash, redirect, url_for

generator = Blueprint('auth', __name__)

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