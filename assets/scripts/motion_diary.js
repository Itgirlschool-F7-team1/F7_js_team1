const Chart = require('chart.js');

// const moment = require('moment');
// require('moment/locale/ru.js');



let btn = document.getElementById('btn');
// создаем массивы для данных
let arrDate = [];
let arrSteps = [];
// проверяем, есть ли что-нибудь в lS
document.addEventListener("DOMContentLoaded", function (event) {
    if (localStorage.getItem('stepsToday') != null) {
        arrDate = JSON.parse(localStorage.getItem('stepsToday'));
    }
    if (localStorage.getItem('steps') != null) {
        arrSteps = JSON.parse(localStorage.getItem('steps'));
    }
});

btn.addEventListener('click', function saveInfo() {
    let stepsToday = document.getElementById('localdate').value;
    // console.log(stepsToday);
    let steps = document.getElementById('steps_today').value;
    // console.log(steps);


    arrDate.push(stepsToday);
    localStorage.setItem('stepsToday', JSON.stringify(arrDate));
    // console.log(arrDate);
    arrSteps.push(steps);
    localStorage.setItem('steps', JSON.stringify(arrSteps));
    // console.log(arrSteps);

})