var questions;

var pos_choisses;
var answer;
var explanations;
var nuCategory = ["Алгебра", "Геометрия", "История", "География"];
var should_you_do = [];
var order = [];
var nuCategory = ["Алгебра", "Геометрия", "История", "География"];
var should_you_do = [];
var order = [];
var quest = 0;
var category;
var submitCounter = 0;
function pleaseWork(){
    let rightAns = 0;
    const q = questions[category].length;
    console.log(should_you_do[category]);
    console.log("quest = " + quest + "order[quest] = " + order[quest]);
    for (let i = 0; i < should_you_do[category].length; i++) {
        if (should_you_do[category][i] === false) {
            rightAns++;
        }
    }
    document.getElementById("numOfRightAnswers").innerHTML = ("Твоите верни отговори са " + rightAns + "/" + q);
}
function makeOrder(){
    for(let i = 0; i < questions[category].length; i++)order.push(i);
    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = order[i];
        order[i] = order[j];
        order[j] = temp;
    }
}

function changeColor(s, num){
    for(let i = 1; i <= 4; i++){
        let x = document.getElementById(String.fromCharCode(i + 64));
        if(x.style.color === "green" || x.style.color === "red")continue;
        x.style.color = "#6CA0ED";
    }
    if(document.getElementById(s).checked && submitCounter < 1){
        let x = document.getElementById(String.fromCharCode(num + 64));
        x.style.color = "yellow";
    }
}
function makeAllDefaut(){
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49 + 16);
        let x = document.getElementById(ch);
        x.style.color = "#6CA0ED";
    }
}
function receiveCategory(num) {
    category = num;
}

function leaveOnlyMain3(){
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    var zum = document.getElementById("main3");
    var aum = document.getElementById("sol");
    xum.style.display = "none";
    yum.style.display = "none";
    zum.style.display = "block";
    aum.style.display = "none";
}
function isAllCorrect(){
    for(let i = 0; i < should_you_do[category].length; i++){
        if(should_you_do[category][i] === true) {
            return false;
        }
    }
    return true;
}
function change_place(){
    pleaseWork();
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    var aum = document.getElementById("sol");
    if (xum.style.display === "none") {
      xum.style.display = "flex";
      yum.style.display = "none";
    } else {
      xum.style.display = "none";
      yum.style.display = "flex";
    }
    aum.style.display = "none";
}

function printQuestion(){
    document.getElementById("question").innerHTML = questions[category][order[quest]];
}

function printChoisses(){
    for (let i = 0; i <= 3; i++) {
        let char = String.fromCharCode(i + 65);
        document.getElementById(char).innerHTML = char + ") " + pos_choisses[category][order[quest]][i];
    }
}

function toTheNextQuestion(){
    submitCounter = 0;
    quest++;
    if(isAllCorrect()){
        leaveOnlyMain3();
        return;
    }
    whenStart();
    make_all_unchecked();
    makeAllDefaut();
    pleaseWork();
}
function checkIfCorrect() {
    if(submitCounter >= 1)return;
    let current;
    let tru = 0;
    let ans = false;
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        console.log(answer[category][order[quest]]);
        if(document.getElementById(ch).checked) current = i + 49 + 16;
        if ((String.fromCharCode(i + 65)) + ") "  + answer[category][order[quest]] === document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML) {
            tru = i + 49 + 16;
        }
    }
    var xum = document.getElementById("expl");
    xum.style.display = "block";
    return returnIfCorrect( String.fromCharCode(current) ,String.fromCharCode(tru));
}

function showSolution(){
    var yum = document.getElementById("sol");
    yum.style.display = "flex";
    console.log(order[quest] + "Please work");
    document.getElementById("soltext").innerHTML = explanations[category][order[quest]];
    var zum = document.getElementById("expl");
    zum.style.display = "none";
}

function returnIfCorrect(ch, tru){
    if (ch === tru) {
        should_you_do[category][order[quest]] = false;
        let x = document.getElementById(ch);
        x.style.color = "green";
        return true;
    } else {
        console.log("CHU = " + ch);
        let x = document.getElementById(ch);
        x.style.color = "red";
        console.log("TRU = " + tru);
        let y = document.getElementById(tru);
        y.style.color = "green";
        return false;
    }
}

function whenStart(){
    if(quest === 0){
        if(isAllCorrect()){
            leaveOnlyMain3();
            return;
        }
        console.log("quest = " + quest + "isAllCorrect() = " + isAllCorrect());
        change_place();
    }
    if(quest >= questions[category].length){
        quest = 0;
        console.log("STE POLUDEQ");
        change_place();
        return;
    }
    if(should_you_do[category][order[quest]] === false){
        quest++;
        whenStart();
        return;
    }
    printQuestion();
    printChoisses();
    let xum = document.getElementById("sol");
    xum.style.display="none";
    let yum = document.getElementById("expl");
    yum.style.display="none";
}

function Release(s) {
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        if (ch === s) continue;
        document.getElementById(ch).checked = false;
    }
}

function make_should_you_do2(){
    if(should_you_do.length === 0)make_should_you_do();
    else{
        for(let i = 0; i < questions.length; i++){
            for(let j = 0; j < questions[i].length; j++){
                should_you_do[i][j] = true;
            }
        }
    }
}

function make_should_you_do(){
    should_you_do = [];
    for(let i = 0; i < questions.length; i++){
        should_you_do.push([]);
        for(let j = 0; j < questions[i].length; j++){
            should_you_do[i].push(true);
        }
    }
}

function make_all_unchecked(){
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        document.getElementById(ch).checked = false;
    }
}

function addQuestion(cat, que, c1, c2, c3, c4, s, exp){
    questions[cat].push(que);
    console.log("R#@$R#$");
    pos_choisses[cat].push([c1, c2, c3, c4]);
    answer[cat].push(s);
    explanations[cat].push(exp);
    console.log(questions[cat].length);
}