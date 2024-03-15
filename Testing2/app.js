const nuCategory = new Map();
nuCategory.set(0, "Arithmetic");
nuCategory.set(1, "Geometry");
nuCategory.set(2, "History");
nuCategory.set(3, "Geography");
var questions = [["Корен квадрат от 25", "Корен квадрат от 169", "Корен от 289 е:", "Колко е 1 на степен 0?", "Колко е 3 на степен 4?", "4 to the power of 2"]];
var pos_choisses = [[["2", "5", "4", "7"], ["14", "13", "9", "28561"], ["17", "13", "21", "14"], ["1", "0", "0.5", "-1"], ["126", "144", "12", "412"], ["12", "8", "16", "32"]]];
var answer = [["5", "13", "17", "1", "144", "16"]];
var quest = 0;
let currentQuestionIndex = 0;

