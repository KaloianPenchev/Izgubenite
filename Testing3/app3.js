const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var questions = [
    ["Корен квадрат от 25", "Корен квадрат от 169", "Корен от 289 е:", "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "4 на 2 степен е?"],
    ["Каква е формулата за лице на кръг?", "Колко е лицето на кръг с диаметър 16cm", ],
    [""],
    [""]
];
var pos_choisses = [
    [["2", "5", "4", "7"],
        ["14", "13", "9", "28561"],
        ["17", "13", "21", "14"],
        ["1", "0", "0.5", "-1"],
        ["126", "81", "12", "412"],
        ["12", "8", "16", "32"]
    ],
    [
        ["π*r*r", "π*π*r", "2*π*r", "4*r*r"],
        ["16π", "8π", "256π", "72π"],
    ],
    [],
    []
];
var answer = [
    ["5", "13", "17", "1", "81", "16"],
    ["π*r*r", "16π"],
    [],
    []];
var should_you_do = []
var quest = 0;
var category = 0;

function leaveOnlyMain3(){
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    var zum = document.getElementById("main3");
    xum.style.display = "none";
    yum.style.display = "none";
    zum.style.display = "block";
}
function isAllCorrect(){
    for(let i = 0; i < should_you_do[category].length; i++){
        if(should_you_do[category][i] === true)return false;
    }
    return true;
}
function change_place(){
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    if (xum.style.display === "none") {
      xum.style.display = "block";
      yum.style.display = "none";
    } else {
      xum.style.display = "none";
      yum.style.display = "block";
    }
}
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
        should_you_do[category][quest] = false;
        console.log(should_you_do[category][quest]);
        console.log("Correct");
    } else {
        console.log("Incorrect");
    }
    quest++;
    whenStart();
    make_all_unchecked();
}


function whenStart(){
    if(quest === 0){
        if(isAllCorrect()){
            leaveOnlyMain3();
            return;
        }
        change_place();
    }
    if(quest >= questions[category].length){
        quest = 0;
        change_place();
        return;
    }
    if(should_you_do[category][quest] === false){
        quest++;
        whenStart();
        return;
    }
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
    return 0;
}


function make_all_unchecked(){
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        document.getElementById(ch).checked = false;
    }
}
