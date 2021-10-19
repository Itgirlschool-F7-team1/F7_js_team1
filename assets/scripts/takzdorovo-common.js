// Переключение экрана спорт/питание
function changeScreen(event) {
    const commonButtons = document.querySelectorAll(".header__button");
    const commonContentContainers = document.querySelectorAll(".main__content-container");
    const target = event.target;

    if (target === document.getElementById("activityButton") || target === document.getElementById("foodButton")){
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
}

document.querySelector(".header__buttons").addEventListener("click", changeScreen);

//Выбор контента для изображения в зависимости от того, какая нажата кнопка

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



//кнопка закрытия возвращает на предыдущий экран
//зеленые
document.querySelectorAll('.close-button_green').forEach(button=>{
    button.addEventListener('click', function(){
        document.querySelector('.main__content-container-empty').classList.add('hidden');
        document.querySelector('.main__content-container_green').classList.remove('hidden');
})
})

//розовые
document.querySelectorAll('.close-button_pink').forEach(button=>{
    button.addEventListener('click', function(){
        document.querySelector('.main__content-container-empty').classList.add('hidden');
        document.querySelector('.main__content-container_pink').classList.remove('hidden');
})
})


