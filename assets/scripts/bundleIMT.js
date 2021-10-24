(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// глобальные переменные

//кнопка Рассчитать
let btn_calc_IMT = document.querySelector('.btn_IMT');

//кнопка Очистить историю
let btn_clear_history_IMT = document.querySelector('.btn_clear_history_IMT');

// массивы для вывода в график
let arrDate_IMT = [];
let arrIMT = [];


// создаем класс, который будет формировать объект
class IMT {
    constructor(today, IMT) {
        this.today = today;
        this.IMT = IMT;
    }
}

// функция расчета ИМТ
let calculateIMT = () => {

    const userDate = document.getElementById('dateSelection_IMT').value;
    const userHeight = document.getElementById('userHeight').value;
    const userWeight = document.getElementById('userWeight').value;
    let IMT = Math.round(userWeight / (userHeight / 100 * userHeight) * 100);


    if (userDate === '') {
        document.getElementById('errorMessage_date_IMT').innerHTML = 'Поле не заполнено. Введите дату.';
    }

//вывод ошибок про рост
    if (userHeight === '') {
        document.querySelector('.valueIMT').innerHTML = '?';
        document.getElementById('errorMessage_userHeight').innerHTML = 'Поле не заполнено. Введите Ваш рост.';
    } else if (document.getElementById('userHeight').validity.rangeOverflow) {
        document.getElementById('errorMessage_userHeight').innerHTML = 'Рост не может быть больше 220 см';
    } else if (document.getElementById('userHeight').validity.rangeUnderflow) {
        document.getElementById('errorMessage_userHeight').innerHTML = 'Рост не может быть меньше 100 см';
    } else {
        document.getElementById('errorMessage_userHeight').innerHTML = ''; 
    }

//вывод ошибок про вес
    if (userWeight === '') {
        document.querySelector('.valueIMT').innerHTML = '?';
        document.getElementById('errorMessage_userWeight').innerHTML = 'Поле не заполнено. Введите Ваш вес.';
    } else if (document.getElementById('userWeight').validity.rangeOverflow) {
        document.getElementById('errorMessage_userWeight').innerHTML = 'Вес не может быть больше 200 кг';
    } else if (document.getElementById('userWeight').validity.rangeUnderflow) {
        document.getElementById('errorMessage_userWeight').innerHTML = 'Вес не может быть меньше 30 кг';
    } else {
        document.getElementById('errorMessage_userWeight').innerHTML = ''; 
    }

//расчет ИМТ
    if ((100<userHeight && userHeight<220) && (30<userWeight && userWeight<200)) {

        // очищаем текст ошибок
        document.getElementById('errorMessage_userHeight').innerHTML = '';
        document.getElementById('errorMessage_userWeight').innerHTML = '';

        //если дата будет заполнена после - убираем текст ошибки
        if (userDate) {
            document.getElementById('errorMessage_date_IMT').innerHTML = '';
        }

        //выводим ИМТ
        document.querySelector('.valueIMT').innerHTML = IMT;

        document.querySelector('.IMTinfo').innerHTML = "";
        if (IMT <= 16) {
            document.querySelector('.IMTinfo').innerHTML = 'Ваш вес ниже нормы (выраженный дефицит массы тела)';
        }

        if (IMT > 16 && IMT <= 18.5) {
            document.querySelector('.IMTinfo').innerHTML = 'Ваш вес ниже нормы (дефицит массы тела)';
        }

        if (IMT > 18.5 && IMT <= 25) {
            document.querySelector('.IMTinfo').innerHTML = 'У Вас нормальный вес';
        }

        if (IMT > 25 && IMT <= 30) {
            document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (предожирение)';
        }
        if (IMT > 30 && IMT <= 35) {
            document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 1 степени)';
        }
        if (IMT > 35 && IMT <= 40) {
            document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 2 степени)';
        }
        if (IMT > 40) {
            document.querySelector('.IMTinfo').innerHTML = 'У Вас избыточная масса тела (Ожирение 3 степени)';
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

let myChart_IMT = new Chart(grafica, {
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
let chartUpdate = () => {
    let IMT = document.querySelector('.valueIMT').innerHTML;

    myChart_IMT.data.datasets = [{
        label: "",
        data: [IMT, 50],
        backgroundColor: 'rgba(96, 125, 139, 1)',
        borderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 6,
    }];
    myChart_IMT.update();
}


//сохранение и вывод всех ИМТ в график динамики

// проверка localStorage, если пусто - создаем пустой массив
if (localStorage.getItem('enteredIMT') === null) {
    localStorage.setItem('enteredIMT', '[]');
}


// создаем функцию по сохранению данных в localStorage
let saveInfoIMT = () => {
    const date_IMT = document.getElementById('dateSelection_IMT').value;
    const IMT_value = document.getElementById('valueIMT').innerHTML;

    // условие, при котором создается новый объект и пушатся новые данные
    if (date_IMT && IMT_value) {
        let enterIMTDay = new IMT(date_IMT, IMT_value);

        let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
        IMT_Array.push(enterIMTDay);

        //   сортировка по датам (от меньшего к большему)  
        IMT_Array.sort(function (a, b) {
            return new Date(a.today) - new Date(b.today);
        });
        // преобразуем полученные данные из объекта в строку
        let arrayForSaveIMT = JSON.stringify(IMT_Array);
        // запись в localStorage ключа и строки
        localStorage.setItem('enteredIMT', arrayForSaveIMT);
    }
}

// функция для построения графика (разделяем объект на два массива) - массив дат

let getArrayChartDateIMT = () => {

    let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
    if (IMT_Array.length > null) {
        arrDate_IMT = IMT_Array.map(function (object) {

            return object.today;
        })
        return arrDate_IMT;
    }
}

//массив индексов
let getArrayChartIMT = () => {

    let IMT_Array = JSON.parse(localStorage.getItem('enteredIMT'));
    if (IMT_Array.length > null) {
        arrIMT = IMT_Array.map(function (object) {
            return object.IMT;
        })
        return arrIMT;
    }
}

//для вывода в шкалы графика
let labelsHistoryIMT = getArrayChartDateIMT();
let dataHistoryIMT = getArrayChartIMT();
let colorsHistoryIMT = ['#b1a28d'];

const ctx_historyIMT = document.getElementById('myChart_historyIMT').getContext('2d');

let chart_historyIMT = new Chart(
    document.getElementById('myChart_historyIMT'), {
        type: 'line',
        data: {
            labels: labelsHistoryIMT,
            datasets: [{
                label: 'Динамика Вашего ИМТ',
                data: dataHistoryIMT,
                fill: false,
                borderColor: '#eb4b51',
                tension: 0.1,
                pointBackgroundColor: colorsHistoryIMT,
                pointRadius: 3,
                pointStyle: 'star',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // назначили оси Y начинать отсчет с нуля
                }
            }
        }
    }
);

//фукнция автоматического обновления графика при вводе новых данных
let chart_historyIMT_Update = () => {
    let labelsHistoryIMT = getArrayChartDateIMT();
    let dataHistoryIMT = getArrayChartIMT();
    let colorsHistoryIMT = ['#b1a28d'];
    chart_historyIMT.data = {
        labels: labelsHistoryIMT,
        datasets: [{
            label: 'Динамика Вашего ИМТ',
            data: dataHistoryIMT,
            fill: false,
            borderColor: '#eb4b51',
            tension: 0.1,
            pointBackgroundColor: colorsHistoryIMT,
            pointRadius: 3,
            pointStyle: 'star',
            borderWidth: 1
        }],
        options: {
            scales: {
                y: {
                    beginAtZero: true // назначили оси Y начинать отсчет с нуля
                }
            }
        }
    }
    chart_historyIMT.update();
}

let clearHistoryIMT = () => {
    localStorage.setItem('enteredIMT', '[]');
}

let clear_chart_historyIMT = () => {
    let labelsHistoryIMT = [];
    let dataHistoryIMT = [];
    let colorsHistoryIMT = ['#B1A28D'];
    chart_historyIMT.data = {
        labels: labelsHistoryIMT,
        datasets: [{
            label: 'Динамика Вашего Индекса массы тела',
            data: dataHistoryIMT,
            fill: false,
            borderColor: '#EB4B51',
            tension: 0.1,
            pointBackgroundColor: colorsHistoryIMT,
            pointRadius: 3,
            pointStyle: 'star',
            borderWidth: 1
        }],
    }
    chart_historyIMT.update();
  }


btn_calc_IMT.addEventListener('click', calculateIMT);//расчет ИМТ
btn_calc_IMT.addEventListener('click', chartUpdate);//одновение данных для графика

// вешаем на кнопку функции по сохранению и выводу в график
btn_calc_IMT.addEventListener('click', saveInfoIMT);
btn_calc_IMT.addEventListener('click', getArrayChartDateIMT);
btn_calc_IMT.addEventListener('click', getArrayChartIMT);
btn_calc_IMT.addEventListener('click', chart_historyIMT_Update);

//очистка истории (графика)
btn_clear_history_IMT.addEventListener('click', clearHistoryIMT);
btn_clear_history_IMT.addEventListener('click', clear_chart_historyIMT);

},{}]},{},[1]);
