const btnMotionDiary = document.querySelector('#btn_md');
const btnMeanMotionDiary = document.querySelector('#btn_mean');
const colorOne = ['#b1a28d'];
const colorTwo = '#bf9999';
const colorThree = '#fff';


let arrDate = [];
let arrSteps = [];

// класс, который будет формировать объект
class CounterS {
    constructor(today, steps) {
        this.today = today;
        this.steps = steps;
    }
}
// проверка localStorage, если пусто - создаем пустой массив
if (localStorage.getItem('enteredSteps') === null) {
    localStorage.setItem('enteredSteps', '[]');
}

// создаем функцию по сохранению данных
function saveInfoSteps() {
    const stepsToday = document.querySelector('#localdate').value;
    const steps = document.querySelector('#steps_today').value;

    // вывод ошибок

    if (stepsToday === '') {
        document.querySelector('#errorMessage_dateMd').innerHTML = 'Error! Введите, пожалуйста, дату.';
    } else {
        document.querySelector('#errorMessage_dateMd').innerHTML = ''
    }
    if (steps === '') {
        document.querySelector('#errorMessage_stepsMd').innerHTML = 'Error! Введите, пожалуйста, число.';
    } else {
        document.querySelector('#errorMessage_stepsMd').innerHTML = ''

    }

    // поддержка и мотивация пользователя

    document.querySelector('#personalRecords_box').innerHTML = " ";

    if (steps <= 250) {
        document.querySelector('#personalRecords_box').innerHTML = 'Для победы необходимо мужество сделать первый шаг.';
    } else if (steps > 250 && steps <= 1500) {
        document.querySelector('#personalRecords_box').innerHTML = 'Нет победителя сильнее того, кто сумел победить самого себя';
    } else if (steps > 1500 && steps <= 3000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Дороги выложены, делай шаг увереннее, ведь двери все распахнуты для тех,кто чист намерениями.';
    } else if (steps > 3000 && steps <= 8000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Время всегда на шаг опережает нас — но мысли наши опережают время!';
    } else if (steps > 8000 && steps <= 13000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Иди, куда влечет тебя свободный ум.';
    } else if (steps > 13000 && steps <= 17000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Истина - в середине.';
    } else if (steps > 17000 && steps <= 22000) {
        document.querySelector('#personalRecords_box').innerHTML = '...если получится, я сделаю следующий шаг, а потом посмотрю, куда меня это заведёт.';
    } else if (steps > 22000 && steps <= 26000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Мы знаем, кто мы есть, но не знаем, кем мы можем быть.';
    } else if (steps > 26000 && steps <= 30000) {
        document.querySelector('#personalRecords_box').innerHTML = 'О, не лети так Жизнь!<br>…Слегка замедли шаг…<br>Мне важен каждый миг и маленький пустяк.';
    } else if (steps > 30000 && steps <= 35000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Nunquam retrorsum, semper ingrediendum.';
    } else if (steps > 35000 && steps <= 40000) {
        document.querySelector('#personalRecords_box').innerHTML = 'Приятны завершенные труды.';
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
        document.querySelector('#steps_today').value = '';
        document.querySelector('#localdate').value = '';

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

// график

const labelsMotionDiary = getArrayChartDate();
const dataMotionDiary = getArrayChartSteps();
const colorsMotionDiary = colorOne;

const myChartMotionDiary = document.querySelector("#myChartMotionDiary").getContext('2d');

const chartMotionDiary = new Chart(myChartMotionDiary, {
    type: 'line',
    data: {
        labels: labelsMotionDiary,
        datasets: [{
            label: 'Количество шагов',
            borderWidth: 2,
            fill: true,
            backgroundColor: colorTwo,
            cubicInterpolationMode: 'monotone', // сглаживание углов
            borderColor: colorThree,
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
            y: {
                min: 0,
                max: 40000
            }
        },

    },

})

// обновление графика
function stepsChartUpdate() {
    const labelsMotionDiary = getArrayChartDate();
    const dataMotionDiary = getArrayChartSteps();
    const colorsMotionDiary = colorOne;
    chartMotionDiary.data.labels = labelsMotionDiary;
    chartMotionDiary.data.datasets = [{
        label: 'Количество шагов',
        borderWidth: 2,
        fill: true,
        backgroundColor: colorTwo,
        borderColor: colorThree,
        data: dataMotionDiary,
        pointRadius: 6,
        pointBackgroundColor: colorsMotionDiary
    }];
    chartMotionDiary.update();
}

function averageValueCalculation() {

    let arrStepsAll = getArrayChartSteps();
    let sum = 0;
    let count = arrStepsAll.length;

    for (i = 0; i < count; i++)
        sum += +arrStepsAll[i];

    let averageValue = sum / count;
    document.querySelector('#personalRecords_mean').innerHTML = Math.round(averageValue);

}

// кнопки "сохранить", "обновление графика", "рассчет среднего значения"
btnMotionDiary.addEventListener('click', saveInfoSteps);
btnMotionDiary.addEventListener('click', stepsChartUpdate);
btnMeanMotionDiary.addEventListener('click', averageValueCalculation);