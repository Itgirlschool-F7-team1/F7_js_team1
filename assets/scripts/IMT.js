const Chart = require('chart.js');
const datepicker = require('js-datepicker')
const moment = require('moment');
require('moment/locale/ru.js');


console.log('hi');

//ИМТ = m/h2, где: m — масса тела в килограммах, h — рост в метрах!!!!! (надо см делить на 100).

//сделать i, при клике появляется описание
//Индекс массы тела (англ. BMI - body mass index) величина, позволяющая оценить степень соответствия массы человека и его роста и тем самым косвенно судить о том, является ли масса недостаточной, нормальной или избыточной.

// дата
//может, не использовать datepicker?
//непонятный формат
// let incomeDate = datepicker(document.getElementById("dateSelection"), {
//     startDay: 1,
//     customDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
//     customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
// });

// let now = moment();
// document.querySelector('#dateSelection').value = now.format("DD.MM.YYYY");

// localStorage.setItem(`dateSelection${index}`, incomeDate.dateSelected);



// Кнопка Рассчитать

let btn = document.querySelector('.btn');
btn.addEventListener('click', calculateIMT);
btn.addEventListener('click', chartUpdate);

// функция расчета ИМТ
function calculateIMT() {
    let userHeight = document.getElementById('userHeight').value;
    let userWeight = document.getElementById('userWeight').value;
    let IMT = Math.round(userWeight / (userHeight / 100 * userHeight) * 100);

    document.querySelector('.valueIMT').innerHTML = IMT;

    document.querySelector('.IMTinfo').innerHTML = "";
    if (IMT <= 16) { //180-40
        document.querySelector('.IMTinfo').innerHTML = 'Ваш вес ниже нормы (выраженный дефицит массы тела)';
    }

    if (IMT > 16 && IMT <= 18.5) { //180-55
        document.querySelector('.IMTinfo').innerHTML = 'Ваш вес ниже нормы (дефицит массы тела)';
    }

    if (IMT > 18.5 && IMT <= 25) { //170-60
        document.querySelector('.IMTinfo').innerHTML = 'У Вас нормальный вес';
    }

    if (IMT > 25 && IMT <= 30) { //170-80
        document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (предожирение)';
    }
    if (IMT > 30 && IMT <= 35) { //170-90
        document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 1 степени)';
    }
    if (IMT > 35 && IMT <= 40) {
        document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 2 степени)';
    }
    if (IMT > 40) {
        document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 3 степени)';
    }
};


    // график-шкала

    const grafica = document.getElementById('grafica');
    const tags = [""]

    const dataIMT = {
        label: "",
        data: [0, 50],
        backgroundColor: 'rgba(96, 125, 139, 1)',

        borderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 6,
    };

    let myChart = new Chart(grafica, {
        type: 'line',
        data: {
            labels: tags,
            datasets: [
                dataIMT,
            ]
        },
        options: {

            indexAxis: 'y',
            scales: {
                x: {
                    // beginAtZero: true
                    min: 6,
                    max: 60
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: true,
                    },
                },
            }
        }
    });

    // функция построения шкалы ИМТ
function chartUpdate(){
    let IMT = document.querySelector('.valueIMT').innerHTML;

    myChart.data.datasets = [{
        label: "",
        data: [IMT, 50],
        backgroundColor: 'rgba(96, 125, 139, 1)',
        borderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 6,
    }];
    myChart.update();
}

// попытка засунуть все в localStorage

