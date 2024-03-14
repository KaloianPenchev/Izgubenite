const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var questions = [["Колко е коренът на 25?", "How much is the square root of 169?", "Корен от 289 е:", "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "Колко е 4 на степен 2?"]];
var pos_choisses = [[["2", "5", "4", "7"], ["14", "13", "9", "28561"], ["17", "13", "21", "14"], ["1", "0", "0.5", "-1"], ["126", "144", "12", "412"], ["12", "8", "16", "32"]]];
var answer = [["5", "13", "17", "1", "144", "44"]];
function whenStart(category){
    for(let quest = 0; quest < questions[category].length; quest++){
        document.getElementById("p1").innerHTML = questions[category][quest];
        for (let i = 0; i <= 3; i++) {
            let char = String.fromCharCode(i + 65);
            document.getElementById(char).innerHTML = pos_choisses[category][quest][i];
        }
    }
}
/* addsQuestion
function addQuestion(s, i, a, b, c, d, j) {
    questions[i].push(s);
    pos_choisses[i].push({a, b, c, d});
    answer.push(j);
}*/

function Release(s) {
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        //console.log(ch);
        if (ch === s) continue;
        document.getElementById(ch).checked = false;
    }
    return 0;
}

function Sub(category, quest) {
    let ans = false;
    for (let i = 0; i <= 3; i++) {
        let ch = String.fromCharCode(i + 49);
        console.log(document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML)
        if (document.getElementById(ch).checked && answer[category][quest] === document.getElementById(String.fromCharCode((i + 49 + 16))).innerHTML) {
            ans = true;
        }
    }
    if (ans) {
        console.log("Correct");
    } else console.log("Incorrect");
    return 0;
}