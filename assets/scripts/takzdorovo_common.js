// Переключение экрана спорт/питание
function changeScreen(event) {
    const commonButtons = document.querySelectorAll(".header__button");
    const commonContentContainers = document.querySelectorAll(".main__content-container");
    const pinkFooter = document.querySelector(".footer_pink");
    const greenFooter = document.querySelector(".footer_green");
    const target = event.target;

    if (target === document.getElementById("activityButton") || target === document.getElementById("foodButton")){
    commonContentContainers.forEach((contentItem) => {
        contentItem.classList.add('hidden');
    })
    // commonButtons.forEach((buttonItem) => {
    
    // })
    commonButtons.forEach((buttonItem, index) => {
        buttonItem.classList.remove("header__button_active");
        if (buttonItem === target) {
            buttonItem.classList.add("header__button_active");
            commonContentContainers[index].classList.remove('hidden');
        }
    })

    if (target === document.getElementById("activityButton")) {
        document.querySelector(".body").style.cssText = `background-color: #f8eae8;`;
        document.getElementById("activityButton").style.cssText = `color: #eb4b51;`;
        document.getElementById("foodButton").style.cssText = `color: black;`;
        pinkFooter.classList.remove('hidden');
        greenFooter.classList.add('hidden');
    } else if (target === document.getElementById("foodButton")) {
        document.querySelector(".body").style.cssText = `background-color: #d6e7da;`;
        document.getElementById("foodButton").style.cssText = `color: #219653;`;
        document.getElementById("activityButton").style.cssText = `color: black;`;
        pinkFooter.classList.add('hidden');
        greenFooter.classList.remove('hidden');
    }
}
}

document.querySelector(".header__buttons").addEventListener("click", changeScreen);

//Выбор контента для изображения в зависимости от того, какая нажата кнопка

document.querySelectorAll(".content-container__left-column").forEach((contentContainer) =>{

    contentContainer.addEventListener('click', (event)=>{
        const target = event.target;
        // console.log(target);
        if (target.classList.contains('left-column__button') || target.classList.contains('button__text') || target.classList.contains('button__image')){
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


