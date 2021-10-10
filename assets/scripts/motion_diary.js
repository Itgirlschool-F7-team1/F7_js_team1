const Chart = require('chart.js');

// const moment = require('moment');
// require('moment/locale/ru.js');

// объявляю переменную с кнопкой
let btn = document.getElementById('btn');
// вешаю функцию на клик
btn.addEventListener('click', function saveInfo() {
        // Разбираем любой JSON, ранее сохраненный в allEntries
    // getItem , чтобы получить старый список, добавить к нему, а затем сохранить его обратно в localStorage:
            let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
            if (existingEntries == null) existingEntries = [];

            const stepsToday = document.getElementById('localdate').value;
            const steps = document.getElementById('steps_today').value;

            let entry = {
                "date": stepsToday,
                "step": steps
            };
            localStorage.setItem("entry", JSON.stringify(entry));
            // Сохраняю все записи обратно в локальное хранилище
            existingEntries.push(entry);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

// график
    
    
let ctx = document.getElementById('myChart').getContext('2d');
const data = entry;
let chart = new Chart(ctx, {
// Тип графика
type: 'line',
 
// Создание графиков
data: {
    // Точки графиков
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    // График
    datasets: [{
        label: 'Возможно это шагомер', // Название
        backgroundColor: 'rgb(255, 99, 132)', // Цвет закраски
        borderColor: 'rgb(255, 99, 132)', // Цвет линии
        data: data// Данные каждой точки графика
    }]
},
 
// Настройки графиков
options: {}
});
});



