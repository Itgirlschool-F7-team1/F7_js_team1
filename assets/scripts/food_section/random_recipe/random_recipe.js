const randomRecipeContainer = document.querySelector(".random-recipe-section__container");
const randomRecipeInfo = document.querySelector('.random-recipe-section__info-shadow');
const randomRecipeApi = `https://api.spoonacular.com/recipes/random?number=1&apiKey=5f32bda9da1044e5aef1e657650e5b7b`;


//загрузка случайного рецепта и поиск рецептов
let showCardsRandomRecipe = () => {
    const recipeSearchTag = document.querySelector(".random-recipe-section__input").value;
    const recipeImgAmount = document.querySelector("#img-amount").value;
    if (recipeSearchTag !== "") {

        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeSearchTag}&number=${recipeImgAmount}&apiKey=5f32bda9da1044e5aef1e657650e5b7b`)
            .then(response => response.json())
            .then(cards => {
                randomRecipeContainer.innerHTML = "";
                try {
                    cards.forEach((card, i) => {
                        const recipeId = card.id;
                        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=5f32bda9da1044e5aef1e657650e5b7b`)
                            .then(response => response.json())
                            .then(recipeData => {
                                try {
                                    let recipeUrl = recipeData.sourceUrl;
                                    if (recipeData === undefined) {
                                        throw new SyntaxError("Попробуйте повторить запрос: пришли некорректные данные");
                                    }

                                    randomRecipeContainer.innerHTML += `<div class="random-recipe-section__little-container">
                                    <h4 href="${card.title}" class="random-recipe-section__subtitle">${card.title}</h4>
                                    <img src="${card.image}" alt="${i+1} картинка" class="random-recipe-section__img"><br/>
                                    <a href="${recipeUrl}" class="random-recipe-section__link">Ссылка на рецепт</a>
                                    </div>`;
                                } catch (error) {
                                    console.log(error);
                                    randomRecipeContainer.innerHTML = error.message;
                                };
                            })
                            .catch(error => {
                                console.log(error);
                                randomRecipeContainer.innerHTML = "Проверьте подключение и попробуйте повторить запрос."
                            });
                    })
                    if (cards.length === 0) {
                        throw new ReferenceError("Попробуйте изменить запрос: такой тег не найден. Поиск доступен только на английском языке.");
                    }
                    if (cards === undefined) {
                        throw new SyntaxError("Попробуйте повторить запрос: пришли некорректные данные");
                    }
                } catch (error) {
                    console.log(error);
                    randomRecipeContainer.innerHTML = error.message;
                }
            })
            .catch(error => {
                console.log(error);
                randomRecipeContainer.innerHTML = "Проверьте подключение и попробуйте повторить запрос."
            });
    } else {
        randomRecipeContainer.innerHTML = "Вы не внесли тег для поиска";

        fetch(randomRecipeApi)
            .then(response => response.json())
            .then(randomRecipe => {
                randomRecipeContainer.innerHTML = "";
                try {
                    randomRecipeContainer.innerHTML += `<div class="random-recipe-section__little-container">
                    <h4 href="${randomRecipe.recipes[0].title}" class="random-recipe-section__subtitle">${randomRecipe.recipes[0].title}</h4>
                    <img src="${randomRecipe.recipes[0].image}" alt="картинка" class="random-recipe-section__img"><br/>
                    <a href="${randomRecipe.recipes[0].sourceUrl}" class="random-recipe-section__link">Ссылка на рецепт</a>
                    </div>`;
                    if (randomRecipe.length === 0) {
                        throw new ReferenceError("Что-то пошло не так. Попробуйте найти рецепты самостоятельно. Введите тег для поиска.");
                    }
                    if (randomRecipe === undefined) {
                        throw new SyntaxError("Попробуйте повторить запрос: пришли некорректные данные");
                    }
                } catch (error) {
                    console.log(error);
                    randomRecipeContainer.innerHTML = error.message;
                };
            })
            .catch(error => {
                console.log(error);
                randomRecipeContainer.innerHTML = "Проверьте подключение и попробуйте повторить запрос."
            });
    }
}

document.querySelector(".random-recipe-section__button").addEventListener("click", showCardsRandomRecipe);
document.getElementById('randomRecipeBtn').addEventListener("click", showCardsRandomRecipe);


//открытие и закрытие окошка с подсказками
document.querySelector('.random-recipe-section__question-img').addEventListener('click', () => {
    randomRecipeInfo.classList.remove('hidden');
})

document.getElementById('randomRecipeInfoCloseButton').addEventListener('click', () => {
    randomRecipeInfo.classList.add('hidden');
})