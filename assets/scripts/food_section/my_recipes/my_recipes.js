class Recipe {
    constructor(category, recipeName, photoUrl, ingredients, description, id) {
        this.category = category;
        this.recipeName = recipeName;
        this.photoUrl = photoUrl;
        this.ingredients = ingredients;
        this.description = description;
        this.id = id;
    }
}


const recipeCategorySubtitle = document.querySelector('.recipes__subtitle');
const enterRecipeBlock = document.querySelector('.recipe-section__enter-recipe');
const recipesBlock = document.querySelector('.recipe-section__recipes');
const enterRecipeCloseButton = document.querySelector('#enterRecipeCloseButton');
const hamburgerMenuButton = document.getElementById('recipeMenu01');
const cards = document.querySelector('.recipe-section__cards');
const enterRecipeError = document.querySelector('.enter-recipe__error');

//Проверка хранилища
if (localStorage.getItem('enteredRecipes') === null) {
    localStorage.setItem('enteredRecipes', '[]');
}
if (localStorage.getItem('idIndex') === null) {
    localStorage.setItem('idIndex', 1);
}


//получаем url фотографии
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

//Сохраняем в хранилище введенные данные
async function getRecipeData() {

    const photoSrc = await getPhotoUrl();

    let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));

    const category = document.getElementById('recipeCategory').value;
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const description = document.getElementById('recipeText').value;
    let idIndex = localStorage.getItem('idIndex');


    if (category && recipeName && ingredients && description) {
        enterRecipeError.innerHTML = "";

        let enteredRecipe = new Recipe(category, recipeName, photoSrc, ingredients, description, idIndex);
        let inputs = document.querySelectorAll(".enter-recipe__input");
        for (let input of inputs) {
            input.value = "";
        }
        document.getElementById("enter-recipe__fileformlabel").innerHTML = "";
        recipes.push(enteredRecipe);
        localStorage.setItem('enteredRecipes', JSON.stringify(recipes));
        idIndex++;
        localStorage.setItem('idIndex', JSON.stringify(idIndex));
    } else {
        enterRecipeError.innerHTML = "Вы заполнили не все поля";
        return;
    }
}

//генерируем маленькие карточки
let showRecipes = (Array) => {
    if (localStorage.getItem('enteredRecipes').length === 2) {
        cards.innerHTML = "Здесь будут ваши рецепты. Пожалуйста, добавьте первый рецепт."
        recipeCategorySubtitle.innerHTML = "";
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


//Разворачиваем карточки при нажатии и сворачиваем при повторном нажатии
let showFullCard =(event) => {
    const target = event.target;
    let targetParent = target.closest(".recipe-section__card");
    const cardArray = document.querySelectorAll('.recipe-section__card');
    let arrayToShow;
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));

    if (cardArray.length === recipes.length) {
        arrayToShow = recipes;
    } else {
        arrayToShow = [];
            cardArray.forEach((cardArrayItem, index) => {
            recipes.forEach((recipe) =>{
                if (cardArrayItem.id === recipe.id){
                    arrayToShow.push(recipe);
                }
            })
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
        document.querySelector(".card-active").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}

//фильтруем рецепты при выборе категории
let filterRecipes = (event) => {
    const target = event.target;;
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    let newArray;

    if (target.classList.value === 'tags__item') {
        recipeCategorySubtitle.innerHTML = target.innerHTML;
    } else {
        recipeCategorySubtitle.innerHTML = "";
        newArray = recipes;
    }

    newArray = recipes.filter((recipeItem) => {
        if (recipeItem.category === target.id || (recipeItem.category + 'Alt') === target.id) {
            return recipeItem;
        }
    })

    return newArray;
}


//открытие и закрытие формы для добавления рецепта
document.getElementById('asideAddButton').addEventListener('click', () => {
    recipesBlock.classList.add('hidden');
    enterRecipeBlock.classList.remove('hidden');
})

enterRecipeCloseButton.addEventListener('click', () => {
    enterRecipeBlock.classList.add('hidden');
    recipesBlock.classList.remove('hidden');
})

//сохраняем данные
document.getElementById('enterRecipeSaveButton').addEventListener('click', getRecipeData);


//генерируем карточки
document.addEventListener("DOMContentLoaded", () => {
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    recipeCategorySubtitle.innerHTML = "";
    showRecipes(recipes);
});
enterRecipeCloseButton.addEventListener('click', () => {
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    recipeCategorySubtitle.innerHTML = "";
    showRecipes(recipes);
});

document.getElementById('myRecipesBtn').addEventListener('click', () => {
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    recipeCategorySubtitle.innerHTML = "";
    showRecipes(recipes);
});



//при выборе категории показываем отфильтрованный список рецептов
document.querySelector('.tags__list').addEventListener('click', function () {
    const recipes = filterRecipes(event);
    showRecipes(recipes);
    // const enterRecipeForm = document.querySelector('.recipe-section__enter-recipe');
    if (!enterRecipeBlock.classList.contains('hidden')) {
        enterRecipeBlock.classList.add('hidden');
        document.querySelector('.recipe-section__recipes').classList.remove('hidden');
    }
});
document.querySelector('.tags__list_alternative').addEventListener('click', function () {
    const recipes = filterRecipes(event);
    showRecipes(recipes);
    // const enterRecipeForm = document.querySelector('.recipe-section__enter-recipe');
    if (!enterRecipeBlock.classList.contains('hidden')) {
        enterRecipeBlock.classList.add('hidden');
        document.querySelector('.recipe-section__recipes').classList.remove('hidden');
    }
});

//разворачиваем и сжимаем арточки при клике
cards.addEventListener("click", showFullCard);

//гамбургер меню: открытие и закрытие
hamburgerMenuButton.addEventListener('click', () => {
    hamburgerMenuButton.classList.toggle('active');
    document.querySelector('.tags__list_alternative').classList.toggle('hidden');
});