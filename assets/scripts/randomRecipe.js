const Chart = require('Chart.js');

const grafica = document.getElementById('grafica');

const tags = [""]

const dataSales2020 = {
    label: "",
    data: [25.5, 50], 
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
            dataSales2020,
        ]
    },
    options: {
        
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
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

