
// Функции для стилизации инпута для загрузки фотографии
document.querySelector(".enter-recipe__fileform").addEventListener("click", clickInput = () => {
    document.querySelector("#recipePhoto").click();
});


function getName() {
    let i;
    let str = document.getElementById("recipePhoto").value;
    if (str.lastIndexOf('\\')) {
        i = str.lastIndexOf('\\') + 1;
    } else {
        i = str.lastIndexOf('/') + 1;
    }
    let filename = str.slice(i);
    let uploaded = document.getElementById("enter-recipe__fileformlabel");
    uploaded.innerHTML = filename;
}


//открытие и закрытие формы для добавления рецепта
document.getElementById('asideAddButton').addEventListener('click', () => {
    document.querySelector('.recipe-section__recipes').classList.add('hidden');
    document.querySelector('.recipe-section__enter-recipe').classList.remove('hidden');
})

document.querySelector('#enterRecipeCloseButton').addEventListener('click', () => {
    document.querySelector('.recipe-section__enter-recipe').classList.add('hidden');
    document.querySelector('.recipe-section__recipes').classList.remove('hidden');

})
//Проверка хранилища
if (localStorage.getItem('enteredRecipes') === null) {
    localStorage.setItem('enteredRecipes', '[]');
}
if (localStorage.getItem('idIndex') === null) {
    localStorage.setItem('idIndex', 1);
}


//Сохраняем в хранилище введенные данные
async function getRecipeData() {
    let getPhotoUrl = () => {
        const inputRecipePhoto = document.getElementById("recipePhoto").files[0];
        if (inputRecipePhoto) {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(inputRecipePhoto)
            })
        } else {
            return "./assets/images/plate.png";
        }
    }

    const photoSrc = await getPhotoUrl();

    let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    // console.log(recipes);
    const category = document.getElementById('recipeCategory').value;
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const description = document.getElementById('recipeText').value;
    let idIndex = localStorage.getItem('idIndex');


    if (category && recipeName && ingredients && description) {
        document.querySelector('.enter-recipe__error').innerHTML = "";

        let enteredRecipe = new Recipe(category, recipeName, photoSrc, ingredients, description, idIndex);
        // console.log(enteredRecipe);
        let inputs = document.querySelectorAll(".enter-recipe__input");
        for (let input of inputs) {
            input.value = "";
        }
        document.getElementById("enter-recipe__fileformlabel").innerHTML = "";

        recipes.push(enteredRecipe);

        // console.log(recipes);
        localStorage.setItem('enteredRecipes', JSON.stringify(recipes));
        idIndex++;
        localStorage.setItem('idIndex', JSON.stringify(idIndex));
        // console.log(localStorage.getItem('enteredRecipes'));
    } else {
        document.querySelector('.enter-recipe__error').innerHTML = "Вы заполнили не все поля";
        return;
    }
}

document.getElementById('enterRecipeSaveButton').addEventListener('click', getRecipeData)



//генерируем маленькие карточки
function showRecipes(Array) {
    const cards = document.querySelector('.recipe-section__cards');
    if (localStorage.getItem('enteredRecipes').length === 2) {
        cards.innerHTML = "Здесь будут ваши рецепты. Пожалуйста, добавьте первый рецепт."
        document.querySelector('.recipes__subtitle').innerHTML = "";
    } else {
        cards.innerHTML = "";
        for (let i = 0; i < Array.length; i++) {
            cards.innerHTML += `<div class="recipe-section__card" id="${Array[i].id}">
            <div class="card__img-container">
            <img src="${Array[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                        <h5 class="card__subtitle">${Array[i].recipeName}</h5>
        </div>`;
        }

    }

}
document.addEventListener("DOMContentLoaded", function () {
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    document.querySelector('.recipes__subtitle').innerHTML = "";
    showRecipes(recipes);
});
document.getElementById('enterRecipeCloseButton').addEventListener('click', function () {
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    document.querySelector('.recipes__subtitle').innerHTML = "";
    showRecipes(recipes);
});

document.querySelector('.tags__list').addEventListener('click', function () {
    const recipes = filterRecipes(event);
    showRecipes(recipes);
const enterRecipeForm = document.querySelector('.recipe-section__enter-recipe');
if(!enterRecipeForm.classList.contains('hidden')){
    enterRecipeForm.classList.add('hidden');
    document.querySelector('.recipe-section__recipes').classList.remove('hidden');
}
});
document.querySelector('.tags__list_alternative').addEventListener('click', function () {
    const recipes = filterRecipes(event);
    showRecipes(recipes);
    const enterRecipeForm = document.querySelector('.recipe-section__enter-recipe');
    if(!enterRecipeForm.classList.contains('hidden')){
        enterRecipeForm.classList.add('hidden');
        document.querySelector('.recipe-section__recipes').classList.remove('hidden');
    }
});


//Разворачиваем карточки при нажатии и сворачиваем при повторном нажатии
function showFullCard(event) {
    const target = event.target;
    let targetParent = target.closest(".recipe-section__card");
    const cardArray = document.querySelectorAll('.recipe-section__card');
    let arrayToShow;
    // console.log(card.outerHTML);
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    // console.log(target.id);
    if (cardArray.length === recipes.length) {
        arrayToShow = recipes;
    } else {
        arrayToShow = [];
        cardArray.forEach(cardArrayItem => {
            for (let i = 0; i < recipes.length; i++) {
                if (cardArrayItem.id === recipes[i].id) {
                    arrayToShow.push(recipes[i]);
                    break;
                } else {
                    continue;
                }
            }
        })
    }
    if (target.classList.contains('card-active')) {
        target.classList.remove('card-active');
        cardArray.forEach((card, index) => {
            card.innerHTML = `<div class="card__img-container">
            <img src="${arrayToShow[index].photoUrl}" alt="Тарелка" class="card__img"></div>
            <h5 class="card__subtitle">${arrayToShow[index].recipeName}</h5>`;
        });
    } else {
        // console.log(arrayToShow);
        if (target.classList.value === 'recipe-section__card' || target.classList.value === 'card__img' || target.classList.value === 'card__subtitle') {
            cardArray.forEach(card => {
                card.classList.remove('card-active');
            })
            target.classList.add('card-active');
        } else {
            return;
        }
        for (let i = 0; i < arrayToShow.length; i++) {
            let cardInnerText = "";
            // console.log(target.id);
            // console.log(cardArray[i].id);

            if (target.id === cardArray[i].id || targetParent.id === cardArray[i].id) {
                targetParent.classList.add('card-active');
                cardInnerText += `<p class="card__description"><span class="card__bold-text">Описание: </span>${arrayToShow[i].description}</p>
                <p class="card__ingredients"><span class="card__bold-text">Ингредиенты: </span>${arrayToShow[i].ingredients}</p>
                <div class="card__img-container">
                <img src="${arrayToShow[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                <h5 class="card__subtitle">${arrayToShow[i].recipeName}</h5>`;
                cardArray[i].innerHTML = cardInnerText;
            } else {
                cardInnerText += `<div class="card__img-container">
                <img src="${arrayToShow[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                <h5 class="card__subtitle">${arrayToShow[i].recipeName}</h5>`;
                cardArray[i].innerHTML = cardInnerText;
                continue;
            }
        }
        // console.log(document.querySelector(".card-active"));
        document.querySelector(".card-active").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}
document.querySelector('.recipe-section__cards').addEventListener("click", showFullCard);

//гамбургер меню: открытие и закрытие
document.getElementById('recipeMenu01').addEventListener('click', () => {
    document.getElementById('recipeMenu01').classList.toggle('active');
    document.querySelector('.tags__list_alternative').classList.toggle('hidden');
});

//фильтруем рецепты при выборе категории
function filterRecipes(event) {
    const target = event.target;;
    // const cards = document.querySelector('.recipe-section__cards');
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    let newArray = [];

    if (target.classList.value === 'tags__item') {
        document.querySelector('.recipes__subtitle').innerHTML = target.innerHTML;
    } else {
        document.querySelector('.recipes__subtitle').innerHTML = "";
        newArray = recipes;
    }
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].category === target.id || (recipes[i].category + 'Alt') === target.id) {
            newArray.push(recipes[i]);
        } else {
            continue;
        }
    }
    return newArray;
}