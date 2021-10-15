// обязательно загружать  moment перед chart.js
// const moment = require('moment');
// require('moment/locale/ru.js');

const Chart = require('chart.js');

// создаем класс, который будет формировать объект
class CounterS {
    constructor(today, steps) {
        this.today = today;
        this.steps = steps;
    }
}

// создаем глобальные переменные с массивами
let arrDate = [];
let arrSteps = [];

// проверка localStorage, если пусто - создаем пустой массив
if (localStorage.getItem('enteredSteps') === null) {
    localStorage.setItem('enteredSteps', '[]');
}

// создаем переменную с кнопкой, вешаем события по клику
let btnMotionDiary = document.getElementById('btn_md');

btnMotionDiary.addEventListener('click', saveInfoSteps);
btnMotionDiary.addEventListener('click', stepsChartUpdate);

// создаем функцию по сохранению данных
function saveInfoSteps() {
    const stepsToday = document.getElementById('localdate').value;
    const steps = document.getElementById('steps_today').value;
    

    // вывод ошибок

    if (stepsToday === '') {
        document.getElementById('errorMessage_dateMd').innerHTML = 'Error! Введите, пожалуйста, дату.';
    }
    if (steps === '') {
        document.getElementById('errorMessage_stepsMd').innerHTML = 'Error! Введите, пожалуйста, число.';
    }

   

    // условие, при котором создается новый объект и пушатся доп.данные
    if (steps && stepsToday) {
        let enterStepsDay = new CounterS(stepsToday, steps)

        let stepsArray = JSON.parse(localStorage.getItem('enteredSteps'))
        stepsArray.push(enterStepsDay)

        //   сортировка по датам (от меньшего к большему)  
        stepsArray.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.today) - new Date(b.today);
        });

        // преобразуем полученные данные из объекта в строку
        let arrayForSave = JSON.stringify(stepsArray);
        // запись  в localStorage ключа и строки
        localStorage.setItem('enteredSteps', arrayForSave)

        // очищаем 
        document.getElementById('steps_today').value = '';
        document.getElementById('localdate').value = '';
        
        console.log(stepsArray)
        console.log(localStorage.getItem('enteredSteps'))

    }

}


// функция для записи в график даты(разделяем объект на две части для построения графика)

function getArrayChartDate() {

    let stepsArray = JSON.parse(localStorage.getItem('enteredSteps'))
    if (stepsArray.length > null) {
        arrDate = stepsArray.map(
            function (object) {
                return object.today

            }
        )
        return arrDate
    }
}

// функция для записи в график шагов

function getArrayChartSteps() {

    let stepsArray = JSON.parse(localStorage.getItem('enteredSteps'))
    if (stepsArray.length > null) {
        arrSteps = stepsArray.map(
            function (object) {
                return object.steps

            }
        )
        return arrSteps
    }
}



//     // график

//  записываем в переменные функции, потому что не читает, если просто написать массивы

let labelsMotionDiary = getArrayChartDate();
let dataMotionDiary = getArrayChartSteps();
let colorsMotionDiary = ['#b1a28d'];

let myChartMotionDiary = document.getElementById("myChartMotionDiary").getContext('2d');

myChartMotionDiary.canvas.width = 1200;
myChartMotionDiary.canvas.height = 350;

let chartMotionDiary = new Chart(myChartMotionDiary, {
    type: 'line',
    data: {
        labels: labelsMotionDiary,
        datasets: [{
            label: 'Количество шагов',
            borderWidth: 2,
            fill: true,
            backgroundColor: '#bf9999',
            cubicInterpolationMode: 'monotone', // сглаживание углов
            borderColor: '#fff',
            data: dataMotionDiary,
            pointRadius: 6,
            pointBackgroundColor: colorsMotionDiary

        }]
    },
    options: {

        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
                min: 0,
                max: 40000
            }
        },



    },

})



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