const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var questions = [["Корен квадрат от 25", "Корен квадрат от 169", "Корен от 289 е:", "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "4 to the power of 2"], ["2"], ["5"]];
var pos_choisses = [[["2", "5", "4", "7"], ["14", "13", "9", "28561"], ["17", "13", "21", "14"], ["1", "0", "0.5", "-1"], ["126", "144", "12", "412"], ["12", "8", "16", "32"]]];
var answer = [["5", "13", "17", "1", "144", "16"]];
var shoul_you_do = []
var quest = 0;
let currentQuestionIndex = 0;
function make_should_you_do(){
    for(let i = 0; i < questions.length; i++){
        let cur = [];
        for(let j = 0; j < questions[i].length; j++){
            cur.push(true);
        }
        shoul_you_do[i] = cur;
    }
}


function whenStart(category, quest){
    while(shoul_you_do[category][quest] == false){
        quest++;
    )
    if(quest === questions[category].length){
        return;
    }
    document.getElementById("p1").innerHTML = questions[category][quest];
    for (let i = 0; i <= 3; i++) {
        let char = String.fromCharCode(i + 65);
        document.getElementById(char).innerHTML = pos_choisses[category][quest][i];
    }
    console.log(quest);
    document.getElementById("p1").innerHTML = questions[category][quest];

    // Update the global variable to reflect the current question index
    currentQuestionIndex = quest;
}

function Release(s) {
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        if (ch === s) continue;
        document.getElementById(ch).checked = false;
    }
}

function Sub(category) {
    let ans = false;
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        console.log(currentQuestionIndex);
        console.log(answer[category][currentQuestionIndex]);
        if (document.getElementById(ch).checked && answer[category][currentQuestionIndex] === document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML) {
            ans = true;
        }
    }
    if (ans) {
        console.log("Correct");
        shoul_you_do[category][currentQuestionIndex] = false;
        currentQuestionIndex++;
        whenStart(category, currentQuestionIndex);
    } else {
        console.log("Incorrect");
    }
}
/*function addQuestion(s, i, a, b, c, d, j) {
    questions[i].push(s);
    pos_choisses[i].push({a, b, c, d});
    answer.push(j);
}*/
