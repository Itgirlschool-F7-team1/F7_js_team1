const moment = require('moment');
require('moment/locale/ru.js');

const Chart = require('chart.js');
const datepicker = require('js-datepicker')

console.dir(document.getElementById('dateSelection_IMT'))

console.log('hi');


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

// if (document.getElementById('userHeight').value === '')
// {alert('1')}



// Кнопка Рассчитать

let btn = document.querySelector('.btn_IMT');
btn.addEventListener('click', calculateIMT);
btn.addEventListener('click', chartUpdate);

// функция расчета ИМТ
function calculateIMT() {

    let userDate = document.getElementById('dateSelection_IMT').value;
    let userHeight = document.getElementById('userHeight').value;
    let userWeight = document.getElementById('userWeight').value;
    let IMT = Math.round(userWeight / (userHeight / 100 * userHeight) * 100);


    if (userDate === '') {
        document.getElementById('errorMessage_date_IMT').innerHTML = 'Поле не заполнено. Введите дату.';
    }

    if (userHeight === '') {
        document.querySelector('.valueIMT').innerHTML = '?';
        document.getElementById('errorMessage_userHeight').innerHTML = 'Поле не заполнено. Введите Ваш рост.';
    }
    if (userWeight === '') {
        document.querySelector('.valueIMT').innerHTML = '?';
        document.getElementById('errorMessage_userWeight').innerHTML = 'Поле не заполнено. Введите Ваш вес.'
    } else {
        // очищаем текст ошибок
        document.getElementById('errorMessage_userHeight').innerHTML = ''
        document.getElementById('errorMessage_userWeight').innerHTML = ''

        //если дата будет заполнена после - убираем текст ошибки
        if (userDate) {
            document.getElementById('errorMessage_date_IMT').innerHTML = '';
        }

        //выводим ИМТ
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
            // document.querySelector('.IMTinfo').style.color: red;
            // сделать цвет текста????
        }
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
function chartUpdate() {
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

// создаем класс, который будет формировать объект
class IMT {
    constructor(today, IMT) {
        this.today = today;
        this.IMT = IMT;
    }
}
// создаем глобальные переменные с массивами
let arrDate_IMT = [];
let arrIMT = [];
// проверка localStorage, если пусто - создаем пустой массив
if (localStorage.getItem('enteredIMT') === null) {
    localStorage.setItem('enteredIMT', '[]');
}

// создаем переменную с кнопкой, вешаем события по клику
let btn_historyIMT = document.getElementById('btn_historyIMT');


btn_historyIMT.addEventListener('click', saveInfoIMT);
//может, повесить на кнопку рассчитать??????????
btn_historyIMT.addEventListener('click', getArrayChartDateIMT);
btn_historyIMT.addEventListener('click', getArrayChartIMT);


btn_historyIMT.addEventListener('click', function () {
    console.log(arrDate_IMT)
    console.log(arrIMT)

});

// создаем функцию по сохранению данных
function saveInfoIMT() {
    const date_IMT = document.getElementById('dateSelection_IMT').value;
    const IMT_value = document.getElementById('valueIMT').innerHTML;

    // условие, при котором создается новый объект и пушатся новые данные
    if (date_IMT && IMT_value) {
        let enterIMTDay = new IMT(date_IMT, IMT_value);
        console.log(enterIMTDay);

        let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
        IMT_Array.push(enterIMTDay);

        //   сортировка по датам (от меньшего к большему)  
        IMT_Array.sort(function (a, b) {
            return new Date(a.today) - new Date(b.today);
        });
        // преобразуем полученные данные из объекта в строку
        let arrayForSaveIMT = JSON.stringify(IMT_Array);
        // запись  в localStorage ключа и строки
        localStorage.setItem('enteredIMT', arrayForSaveIMT);
    }
}

// функция для построения графика (разделяем объект на два массива) - массив дат

function getArrayChartDateIMT() {

    let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
    if (IMT_Array.length > null) {
        arrDate_IMT = IMT_Array.map(function (object) {
            return object.IMT;
        })
        return arrDate_IMT;
    }
}

function getArrayChartIMT() {

    let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
    if (IMT_Array.length > null) {
        arrIMT = IMT_Array.map(function (object) {
            return object.today;
        })
        return arrIMT;
    }
}



// let ctx_historyIMT = document.getElementById('myChart_historyIMT').getContext('2d');

// ctx_historyIMT.canvas.width = 300;
// ctx_historyIMT.canvas.height = 250;





const labels2 = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Динамика Вашего Индекса массы тела',
    data: [65, 59, 80, 81, 56, 55],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const config = {
    type: 'line',
    data: data2,
  };
var myChart2 = new Chart(
    document.getElementById('myChart_historyIMT'),
    config
  );


// от Зои
function stepsChartUpdate() {
    let labelsMotionDiary = getArrayChartDate();
    let dataMotionDiary = getArrayChartSteps();
    let colorsMotionDiary = ['#B1A28D'];
    chartMotionDiary.data.datasets = [{
        labels: labelsMotionDiary,
        label: 'Количество шагов',
        borderWidth: 2,
        fill: true,
        backgroundColor: '#BF9999',
        borderColor: '#fff',
        data: dataMotionDiary,
        pointRadius: 6,
        pointBackgroundColor: colorsMotionDiary
    }];
    chartMotionDiary.update();
}