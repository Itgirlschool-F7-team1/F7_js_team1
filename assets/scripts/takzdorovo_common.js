// Переключение экрана спорт/питание
let changeScreen = (event) => {
    const commonButtons = document.querySelectorAll(".header__button");
    const commonContentContainers = document.querySelectorAll(".main__content-container");
    const pinkFooter = document.querySelector(".footer_pink");
    const greenFooter = document.querySelector(".footer_green");
    const target = event.target;
    const activityButton = document.getElementById("activityButton");
    const foodButton = document.getElementById("foodButton");
    const body = document.querySelector(".body");

    if (target === activityButton || target === foodButton){
    commonContentContainers.forEach((contentItem) => {
        contentItem.classList.add('hidden');
    })

    commonButtons.forEach((buttonItem, index) => {
        buttonItem.classList.remove("header__button_active");
        if (buttonItem === target) {
            buttonItem.classList.add("header__button_active");
            commonContentContainers[index].classList.remove('hidden');
        }
    })

    if (target === activityButton) {
        body.classList.remove('body_green');
        body.classList.add('body_pink');
        activityButton.classList.add('header__button_pink');
        foodButton.classList.remove('header__button_green');
        pinkFooter.classList.remove('hidden');
        greenFooter.classList.add('hidden');
    } else if (target === foodButton) {
        body.classList.remove('body_pink');
        body.classList.add('body_green');
        foodButton.classList.add('header__button_green');
        activityButton.classList.remove('header__button_pink');
        pinkFooter.classList.add('hidden');
        greenFooter.classList.remove('hidden');
    }
}
}

//Выбор контента для изображения в зависимости от того, какая нажата кнопка

document.querySelectorAll(".content-container__left-column").forEach((contentContainer) =>{

    contentContainer.addEventListener('click', (event)=>{
        const target = event.target;

        if (target.classList.contains('left-column__button') || target.classList.contains('button__text') || target.classList.contains('button__image')){
        const commonContentContainers = document.querySelectorAll(".main__content-container");
        commonContentContainers.forEach((contentItem) => {
            contentItem.classList.add('hidden');
        })
        document.querySelector('.main__content-container-empty').classList.remove('hidden');
        const tabsContentElements = document.querySelectorAll('[data-tabs-field]');
        tabsContentElements.forEach(content =>{
            if(content.dataset.tabsField === target.dataset.tabsHandler){
                content.classList.remove('hidden');
            } else{
                content.classList.add('hidden');
            }
        })
    }
    })
})

//кнопка закрытия возвращает на предыдущий экран
//зеленые
document.querySelectorAll('.close-button_green').forEach(button=>{
    button.addEventListener('click', () =>{
        document.querySelector('.main__content-container-empty').classList.add('hidden');
        document.querySelector('.main__content-container_green').classList.remove('hidden');
})
})

//розовые
document.querySelectorAll('.close-button_pink').forEach(button=>{
    button.addEventListener('click', () =>{
        document.querySelector('.main__content-container-empty').classList.add('hidden');
        document.querySelector('.main__content-container_pink').classList.remove('hidden');
})
})

document.querySelector(".header__buttons").addEventListener("click", changeScreen);