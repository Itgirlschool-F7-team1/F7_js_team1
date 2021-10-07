

function changeScreen(event) {
    const commonButtons = document.querySelectorAll(".header__button");
    const commonContentContainers = document.querySelectorAll(".main__content-container");
    const target = event.target;

    commonContentContainers.forEach((contentItem) => {
        contentItem.classList.add('hidden');
    })
    commonButtons.forEach((buttonItem) => {
        buttonItem.classList.remove("header__button_active");
    })
    commonButtons.forEach((buttonItem, index) => {

        if (buttonItem === target) {
            buttonItem.classList.add("header__button_active");
            commonContentContainers[index].classList.remove('hidden');
        }
    })

    if (target === document.getElementById("activityButton")) {
        document.querySelector(".body").style.cssText = `background-color: #f8eae8;`;
        document.getElementById("activityButton").style.cssText = `color: #eb4b51;`;
        document.getElementById("foodButton").style.cssText = `color: black;`;
    } else if (target === document.getElementById("foodButton")) {
        document.querySelector(".body").style.cssText = `background-color: #d6e7da;`;
        document.getElementById("foodButton").style.cssText = `color: #219653;`;
        document.getElementById("activityButton").style.cssText = `color: black;`;
    }
}

document.querySelector(".header__buttons").addEventListener("click", changeScreen);

document.querySelectorAll(".content-container__left-column").forEach((contentContainer) =>{

    contentContainer.addEventListener('click', (event)=>{
        const target = event.target;
        const commonContentContainers = document.querySelectorAll(".main__content-container");
        commonContentContainers.forEach((contentItem) => {
            contentItem.classList.add('hidden');
        })
        document.querySelector('.main__content-container-empty').classList.remove('hidden');
        // const tabsHandlerElements = document.querySelectorAll('[data-tabs-handler]');
        const tabsContentElements = document.querySelectorAll('[data-tabs-field]');
        tabsContentElements.forEach(content =>{
            if(content.dataset.tabsField === target.dataset.tabsHandler){
                content.classList.remove('hidden');
            } else{
                content.classList.add('hidden');
            }
        })
        
    })
})



// const Chart = require('chart.js');
// const ctx = document.getElementById('myChart');
// const tags = ["Январь", "Февраль", "Март", "Апрель"]
// // У нас может быть несколько наборов данных. Давайте начнем с одного
// const dataSales2020 = {
//     label: "Продажи за месяц",
//     data: [5000, 1500, 8000, 5102], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
//     backgroundColor: 'rgba(54, 162, 235, 0.2)', // Цвет фона
//     borderColor: 'rgba(54, 162, 235, 1)', // Цвет границ
//     borderWidth: 1,// Толщина границ
// };
// new Chart(ctx, {
//     type: 'line',// Тип графики
//     data: {
//         labels: tags,
//         datasets: [
//             dataSales2020,
//             // Больше данных здесь....
//         ]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }],
//         },
//     }
// });
//browserify takzdorovo-common.js -o bundle1.js