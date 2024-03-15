var questions = [
    [
        "Корен квадрат от 25", 
        "Корен квадрат от 169", "Корен от 289 е:", 
        "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "4 на 2 степен е?",
        //"Кои са корените на уравнението: x*x - 3 * 3 = 0?",
        //"Кои са корените на уравнението: 4*x*x + x - 5 = 0?",
        //"Кои са корените на уравнението: 4*x*x + x + 3 + 8*x*x = 0?",
    ], 
    [
        "Каква е формулата за лице на кръг?", 
        "Колко е лицето на кръг с диаметър 16cm", 
        "Колко е лицето на кръг с радиус 6cm", 
        "Колко най-малко точки могат да образуват равнина?", 
        "Правоъгълен триъгълник с прав ъгъл при точка C има координати на точки А(2, 4) и B(6, 8). Намерете координататите на точка C."
    ], 
    [
        "Кой се смята за \"баща на историята\"?",
        "Как се нарича първата Конститузия в България?",
        "Коя година България се освобождава от турско робство?",
        "При кой владетел са покръстени българите?",
        

    ], 
    [
        "Къде се намира остров Бали?",
        "Коя е най-голямата държава в света?",
        "В коя държава се намира връх Еверест?",
        "Коя е столицата на Австралия?",
        "Каква част от повърхността на Земята е покрита от океан?"
        
    ]
];

var pos_choisses = [
    [
	    ["2", "5", "4", "7"], 
        ["14", "13", "9", "28561"], 
        ["17", "13", "21", "14"], 
        ["1", "0", "0.5", "-1"], 
        ["126", "144", "12", "412"], 
        ["12", "8", "16", "32"],
        //["3и-3", "1и0", "2и3", "нямареалникорени"],
      //  ["2и4", "1и-1.25", "4и-5", "нямареалникорени"],
        //["6и-2", "-1и3", "-4и3", "нямареалникорени"],
        
    ],
    [
        ["π*r*r", "π*π*r", "2*π*r", "4*r*r"],
        ["16π", "8π", "256π", "72π"],
	    ["12π", "36π", "126π", "218π"],
        ["0", "1", "2", "3"],
        ["C(6, 4)", "C(2, 6)", "C(4, 6)", "C(8, 2)"],
    ], 
    [
        ["Платон", "Аристотел", "Херодот", "Сократ"],
        ["Възрожденска", "Пловдивска", "Стамболовска", "Търновска"],
        ["1787", "2023", "1878", "1867"],
         ["Борис I", "Петър I", "Симеон", "Крум"],
    ], 
    [
        ["Индонезия", "Малайзия", "Нова Зеландия", "Австралия"],
        ["Канада", "САЩ", "Индия", "Русия"],
        ["Непал", "Китай", "Бутан", "Япония"],
        ["Сидни", "Пърт", "Канбера", "Мелбърн"],
        ["71%", "62%", "88%", "40.5%"]

    ]
];
var answer = [
    ["5", "13", "17", "1", "144", "16","3 и -3", "4 и -5", ], 
    ["π*r*r", "16π","36π","3","C(6, 4)", "няма реални корени"], 
    ["Херодот", "Търновска", "1878", "Борис I",], 
    ["Индонезия", "Русия", "Непал", "Канбера", "71%"],

];
const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var should_you_do = []
var quest = 0;
var category;

function makeAllDefaut(){
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49 + 16);
        let x = document.getElementById(ch);
        x.style.backgroundColor = "#6CA0ED";
    }
}
function receiveCategory(num) {
    console.log(num);
    category = num;
    console.log(category);
}

function leaveOnlyMain3(){
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    var zum = document.getElementById("main3");
    xum.style.display = "none";
    yum.style.display = "none";
    zum.style.display = "block";
}
function isAllCorrect(){
    console.log(category);
    for(let i = 0; i < should_you_do[category].length; i++){
        if(should_you_do[category][i] === true)return false;
    }
    return true;
}
function change_place(){
    var yum = document.getElementById("main");
    var xum = document.getElementById("main2");
    if (xum.style.display === "none") {
      xum.style.display = "flex";
      yum.style.display = "none";
    } else {
      xum.style.display = "none";
      yum.style.display = "flex";
    }
}
/*function canYouSubmit(){
    for(let i = 0; i <= 3; i++){
        let ch = String.fromCharCode(i + 49);
        if(document.getElementById(ch).checked)return true;
    }
    return false;
}*/
function printQuestion(){
    console.log(category);
    document.getElementById("question").innerHTML = questions[category][quest];
}
function printChoisses(){
    for (let i = 0; i <= 3; i++) {
        let char = String.fromCharCode(i + 65);
        document.getElementById(char).innerHTML = pos_choisses[category][quest][i];
    }
}

function toTheNextQuestion(){
    quest++;
    whenStart();
    make_all_unchecked();
    makeAllDefaut();
}
function checkIfCorrect() {
    let curr;

    let ans = false;
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        console.log(answer[category][quest]);
        if(document.getElementById(ch).checked) curr = i + 49;
        if (document.getElementById(ch).checked && answer[category][quest] === document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML) {
            ans = true;
        }
    }
    returnIfCorrect(ans, String.fromCharCode(curr + 16));


}
function returnIfCorrect(ans, ch){
    console.log(ch);
    if (ans) {
        should_you_do[category][quest] = false;
        console.log(should_you_do[category][quest]);
        console.log("Correct");
        let x = document.getElementById(ch);
        x.style.backgroundColor = "green";
        return true;
    } else {
        let x = document.getElementById(ch);
        x.style.backgroundColor = "red";
        console.log("Incorrect");
        return false;
    }
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
