document.getElementById("recipePhoto").addEventListener('change', getName);

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

document.getElementById('asideAddButton').addEventListener('click', () => {
    document.querySelector('.recipe-section__recipes').classList.add('hidden');
    document.querySelector('.recipe-section__enter-recipe').classList.remove('hidden');
})

document.querySelector('#enterRecipeCloseButton').addEventListener('click', () => {
    document.querySelector('.recipe-section__enter-recipe').classList.add('hidden');
    document.querySelector('.recipe-section__recipes').classList.remove('hidden');

})

if (localStorage.getItem('enteredRecipes') === null) {
    localStorage.setItem('enteredRecipes', '[]');
}
if (localStorage.getItem('idIndex') === null) {
    localStorage.setItem('idIndex', 1);
}

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

function showRecipes() {
    const cards = document.querySelector('.recipe-section__cards');
    if (localStorage.getItem('enteredRecipes').length === 2) {
        cards.innerHTML = "Здесь будут ваши рецепты. Пожалуйста, добавьте первый рецепт."
        document.querySelector('.recipes__subtitle').innerHTML = "";
    } else {
        let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
        cards.innerHTML = "";

        for (let i = 0; i < recipes.length; i++) {
            cards.innerHTML += `<div class="recipe-section__card" id="${recipes[i].id}">
            <div class="card__img-container">
            <img src="${recipes[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                        <h5 class="card__subtitle">${recipes[i].recipeName}</h5>
        </div>`;
        }

    }

}
document.addEventListener("DOMContentLoaded", showRecipes);
document.getElementById('enterRecipeCloseButton').addEventListener('click', showRecipes);

function filterRecipes(event) {
    const target = event.target;
    const cards = document.querySelector('.recipe-section__cards');
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));

    if (recipes != null) {
        let newArray = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].category === target.id || (recipes[i].category + 'Alt') === target.id) {
                newArray.push(recipes[i]);
            } else {
                continue;
            }
        }
        if (localStorage.getItem('enteredRecipes') === null) {
            cards.innerHTML = "Здесь будут ваши рецепты. Пожалуйста, добавьте первый рецепт."
            document.querySelector('.recipes__subtitle').innerHTML = "";
        } else {
            // let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
            cards.innerHTML = "";
            if (target.classList.value === 'tags__item') {
                document.querySelector('.recipes__subtitle').innerHTML = target.innerHTML;
            } else {
                document.querySelector('.recipes__subtitle').innerHTML = "";
                cards.innerHTML = "";

                for (let i = 0; i < recipes.length; i++) {
                    cards.innerHTML += `<div class="recipe-section__card" id="${recipes[i].id}">
            <div class="card__img-container">
            <img src="${recipes[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                        <h5 class="card__subtitle">${recipes[i].recipeName}</h5>
        </div>`;
                }
            }
            for (let i = 0; i < newArray.length; i++) {
                cards.innerHTML += `<div class="recipe-section__card" id="${newArray[i].id}">
            <div class="card__img-container">
            <img src="${newArray[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                <h5 class="card__subtitle">${newArray[i].recipeName}</h5>
        </div>`;
            }
        }
    } else {
        return;
    }
}
document.querySelector('.tags__list').addEventListener('click', filterRecipes);
document.querySelector('.tags__list_alternative').addEventListener('click', filterRecipes);


function showFullCard(event) {
    const target = event.target;
    let targetParent = target.closest(".recipe-section__card");
    // const cards = document.querySelector('.recipe-section__cards');
    const cardArray = document.querySelectorAll('.recipe-section__card');
    const card = document.querySelector('.recipe-section__card');
    // console.log(card.outerHTML);

    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    // console.log(target.id);
if(target.classList.contains('card-active')){

    target.classList.remove('card-active');
    cardArray.forEach((card, index)=> {card.innerHTML = `<div class="card__img-container">
    <img src="${recipes[index].photoUrl}" alt="Тарелка" class="card__img"></div>
                <h5 class="card__subtitle">${recipes[index].recipeName}</h5>`;
});
}else{
    if (target.classList.value === 'recipe-section__card' || target.classList.value === 'card__img' || target.classList.value === 'card__subtitle') {
        cardArray.forEach(card => {
            card.classList.remove('card-active');
        })
        target.classList.add('card-active');
    }

    for (let i = 0; i < recipes.length; i++) {
        let cardInnerText = "";
// console.log(target.id);
// console.log(cardArray[i].id);

    if (target.id === cardArray[i].id || targetParent.id === cardArray[i].id) {
        targetParent.classList.add('card-active');
        cardInnerText += `<p class="card__description"><span class="card__bold-text">Описание: </span>${recipes[i].description}</p>
<p class="card__ingredients"><span class="card__bold-text">Ингредиенты: </span>${recipes[i].ingredients}</p>
<div class="card__img-container">
<img src="${recipes[i].photoUrl}" alt="Тарелка" class="card__img"></div>
    <h5 class="card__subtitle">${recipes[i].recipeName}</h5>`;
        cardArray[i].innerHTML = cardInnerText;
    } else {
        cardInnerText += `<div class="card__img-container">
        <img src="${recipes[i].photoUrl}" alt="Тарелка" class="card__img"></div>
                    <h5 class="card__subtitle">${recipes[i].recipeName}</h5>`;
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

document.getElementById('recipeMenu01').addEventListener('click', () =>{
    document.getElementById('recipeMenu01').classList.toggle('active');
    document.querySelector('.tags__list_alternative').classList.toggle('hidden');
});
