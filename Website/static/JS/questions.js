const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var questions = [["Корен квадрат от 25", "Корен квадрат от 169", "Корен от 289 е:", "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "4 to the power of 2"], ["2"], ["5"]];
var pos_choisses = [[["2", "5", "4", "7"], ["14", "13", "9", "28561"], ["17", "13", "21", "14"], ["1", "0", "0.5", "-1"], ["126", "144", "12", "412"], ["12", "8", "16", "32"]]];
var answer = [["5", "13", "17", "1", "144", "16"]];
var should_you_do = []
var quest = 0;
var category = 0;
function printQuestion(){
    document.getElementById("question").innerHTML = questions[category][quest];
}
function printChoisses(){
    for (let i = 0; i <= 3; i++) {
        let char = String.fromCharCode(i + 65);
        document.getElementById(char).innerHTML = pos_choisses[category][quest][i];
    }
}
function checkIfCorrect() {
    let ans = false;
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        console.log(answer[category][quest]);
        if (document.getElementById(ch).checked && answer[category][quest] === document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML) {
            ans = true;
        }
    }
    if (ans) {
        console.log("Correct");
    } else {
        console.log("Incorrect");
    }
}


function whenStart(){
    printQuestion();
    printChoisses();

}

function Release(s) {
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        if (ch === s) continue;
        document.getElementById(ch).checked = false;
    }
}
function make_should_you_do(){
    for(let i = 0; i < questions.length; i++){
        let cur = [];
        for(let j = 0; j < questions[i].length; j++){
            cur.push(true);
        }

        should_you_do[i] = cur;
    }
    for(let i =  0; i < should_you_do.length; i++){
        for(let j = 0; j < should_you_do[i].length; j++){
            console.log(should_you_do[i][j]);
        }
        console.log("!W");
    }
    return 0;
}


