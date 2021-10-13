const Chart = require('chart.js');

// const moment = require('moment');
// require('moment/locale/ru.js');


// Вообще другой вариант



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


let btn = document.getElementById('btn');
btn.addEventListener('click', saveInfo);
// btn.addEventListener('click', chartUpdate);


function saveInfo() {
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



// график
    let labels = arrDate;
    let data = arrSteps;
    let colors = ['#b1a28d'];

    let myChart = document.getElementById("myChart").getContext('2d');
  
    let chart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Количество шагов',
                borderWidth: 2,
                fill: true,
                backgroundColor: '#bf9999',
                borderColor:'#fff',
                data: data,
                pointRadius: 6,
                pointBackgroundColor:colors 
                
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
                    max: 15000
                }
            }

        },

    })
   

}



