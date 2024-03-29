var questions = [
    [
        "Корен квадрат от 25",
        "Корен квадрат от 169", 
        "Корен от 289 е:",
        "Колко е 1 на степен 0?",
        "Колко е 3 на степен 4?",
        "4 на 2 степен е?",
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
        ["126", "81", "12", "412"],
        ["12", "8", "16", "32"],
    ],
    [
        ["π*r*r", "π*π*r", "2*π*r", "4*r*r"],
        ["16π", "8π", "256π", "72π"],
	    ["12π", "36π", "126π", "218π"],
        ["0", "1", "2", "3"],
        ["C(6,4)", "C(2,6)", "C(4,6)", "C(8,2)"],
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
    ["5", "13", "17", "1", "81", "16"],
    ["π*r*r", "16π","36π","3","C(6,4)", "няма реални корени"],
    ["Херодот", "Търновска", "1878", "Борис I",],
    ["Индонезия", "Русия", "Непал", "Канбера", "71%"],

];
var explanations = [
    [
        "The square root of 25 is 5 because 5 * 5 = 25.",
        "The square root of 169 is 13 because 13 * 13 = 169.",
        "The square root of 289 is 17 because 17 * 17 = 289.",
        "Any nonzero number raised to the power of 0 is 1.",
        "3 raised to the power of 4 is 81 because 3 * 3 * 3 * 3 = 81.",
        "4 raised to the power of 2 is 16 because 4 * 4 = 16."
    ],
    [
        "The formula for the area of a circle is π * r^2, where r is the radius.",
        "The diameter of the circle is 16cm, so the radius is half of that, which is 8cm. Substituting into the formula, the area is π * (8)^2 = 64π cm^2.",
        "The radius of the circle is given as 6cm. Substituting into the formula, the area is π * (6)^2 = 36π cm^2.",
        "Three points are required to define a plane in 3D space.",
        "To find the coordinates of point C, we take the average of the x-coordinates and the average of the y-coordinates of points A and B, resulting in (4, 6)."
    ],
    [
        "Herodotus is often referred to as the 'Father of History' for his work 'The Histories'.",
        "The first Bulgarian Constitution is known as the Tarnovo Constitution, adopted in 1879.",
        "Bulgaria was liberated from Ottoman rule in 1878 after the Russo-Turkish War.",
        "The Bulgarians were baptized during the reign of Khan Boris I (Boris-Mikhail) in the 9th century."
    ],
    [
        "Bali is located in Indonesia.",
        "Russia is the largest country in the world by land area.",
        "Mount Everest is located on the border between Nepal and China (Tibet).",
        "Canberra is the capital city of Australia.",
        "Approximately 71% of the Earth's surface is covered by oceans."
    ]
]
var nuCategory = ["Алгебра", "Геометрия", "История", "География"];
var should_you_do = [];
var order = [];
var quest;
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
    xum.style.display = "none";
    yum.style.display = "none";
    zum.style.display = "block";
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
    if (xum.style.display === "none") {
      xum.style.display = "flex";
      yum.style.display = "none";
    } else {
      xum.style.display = "none";
      yum.style.display = "flex";
    }
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
    pos_choisses[cat].push([c1, c2, c3, c4]);
    answer[cat].push(s);
    explanations[cat].push(exp);
}