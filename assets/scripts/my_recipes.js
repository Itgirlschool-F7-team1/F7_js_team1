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

document.querySelector('.enter-recipe__close-button').addEventListener('click', () => {
    document.querySelector('.recipe-section__enter-recipe').classList.add('hidden');
    document.querySelector('.recipe-section__recipes').classList.remove('hidden');

})


class Recipe {
    constructor(category, recipeName, photoUrl, ingredients, description) {
        this.category = category;
        this.recipeName = recipeName;
        this.photoUrl = photoUrl;
        this.ingredients = ingredients;
        this.description = description;
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
            return "";
        }
    }

    const photoSrc = await getPhotoUrl();

    if (localStorage.getItem('enteredRecipes') === null) {
        localStorage.setItem('enteredRecipes', '[]');
    }

    let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    // console.log(recipes);
    const category = document.getElementById('recipeCategory').value;
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const description = document.getElementById('recipeText').value;



    if (category && recipeName && ingredients && description) {
        document.querySelector('.enter-recipe__error').innerHTML = "";

        let enteredRecipe = new Recipe(category, recipeName, photoSrc, ingredients, description);
        // console.log(enteredRecipe);
        let inputs = document.querySelectorAll(".enter-recipe__input");
        for (let input of inputs) {
            input.value = "";
        }
        document.getElementById("enter-recipe__fileformlabel").innerHTML = "";

        recipes.push(enteredRecipe);

        // console.log(recipes);
        localStorage.setItem('enteredRecipes', JSON.stringify(recipes));
        // console.log(localStorage.getItem('enteredRecipes'));
    } else {
        document.querySelector('.enter-recipe__error').innerHTML = "Вы заполнили не все поля";
        return;
    }
}

document.getElementById('enterRecipeSaveButton').addEventListener('click', getRecipeData)

function showRecipes() {
    const cards = document.querySelector('.recipe-section__cards');
    if (localStorage.getItem('enteredRecipes') === null) {
        cards.innerHTML = "Здесь будут ваши рецепты. Пожалуйста, добавьте первый рецепт."
        document.querySelector('.recipes__subtitle').innerHTML = "";
    } else {
        let recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
        cards.innerHTML = "";
        let src;
        for (let i = 0; i < recipes.length; i++) {
            // console.log(recipes[i]);
            if (recipes[i].photoUrl === "" || !recipes[i].photoUrl) {
                src = "./assets/images/plate.png";
            } else {
                src = recipes[i].photoUrl;
            }

            cards.innerHTML += `<div class="recipe-section__card">
            <div class="card__img-container">
            <img src="${src}" alt="Тарелка" class="card__img"></div>
                        <h5 class="card__subtitle">${recipes[i].recipeName}</h5>
        </div>`;
        }

    }

}
document.addEventListener("DOMContentLoaded", showRecipes);
document.querySelector('.enter-recipe__close-button').addEventListener('click', showRecipes);

function filterRecipes(event) {
    const target = event.target;
    const cards = document.querySelector('.recipe-section__cards');
    const recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    // console.log(recipes);
    // let tagsItems = document.querySelectorAll('.tags__item');
    if (recipes != null) {

        let newArray = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].category === target.id) {
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
            }
            let src;
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].photoUrl === "" || !newArray[i].photoUrl) {
                    src = "./assets/images/plate.png";
                } else {
                    src = newArray[i].photoUrl;
                }

                cards.innerHTML += `<div class="recipe-section__card">
            <div class="card__img-container">
            <img src="${src}" alt="Тарелка" class="card__img"></div>
                <h5 class="card__subtitle">${newArray[i].recipeName}</h5>
        </div>`;
            }
        }
    } else {
        return;
    }
}
document.querySelector('.tags__list').addEventListener('click', filterRecipes);