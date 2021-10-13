function showCardsRandomRecipe() {

  let recipeSearchTag = document.querySelector(".random-recipe-section__input").value;
  let recipeImgAmount = document.querySelector("#img-amount").value;
  if (recipeSearchTag != "") {

      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeSearchTag}&number=${recipeImgAmount}&apiKey=5f32bda9da1044e5aef1e657650e5b7b`
      )
          .then(response => response.json())
          .then(cards => {
              document.querySelector(".random-recipe-section__container").innerHTML = "";
              // console.log(cards);

              try {
                  cards.forEach((card, i) => {
                    const recipeId = card.id;
                    // console.log(recipeId);
                    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=5f32bda9da1044e5aef1e657650e5b7b`
                    )
                        .then(response => response.json())
                        .then(recipeData => {
                            try {
                              let recipeUrl = recipeData.sourceUrl;
                              // console.log(recipeData.sourceUrl);
                                if (recipeData === undefined) {
                                    throw new SyntaxError("Попробуйте повторить запрос: пришли некорректные данные");
                                }
                                
                      document.querySelector(".random-recipe-section__container").innerHTML += `<div class="random-recipe-section__little-container">
                      <h4 href="${card.title}" class="random-recipe-section__link">${card.title}</h4>
                      <img src="${card.image}" alt="${i+1} картинка" class="random-recipe-section__img"><br/>
                      <a href="${recipeUrl}" class="random-recipe-section__link">Ссылка на ${i+1} рецепт</a>
                      </div>`;

                            } catch (error) {
                                console.log(error);
                                document.querySelector(".random-recipe-section__container").innerHTML = error.message;
                            };
                        })
              
                        .catch(error => {
                            console.log(error);
                            document.querySelector(".random-recipe-section__container").innerHTML = "Проверьте подключение и попробуйте повторить запрос."
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
                  document.querySelector(".random-recipe-section__container").innerHTML = error.message;
              };
          })

          .catch(error => {
              console.log(error);
              document.querySelector(".random-recipe-section__container").innerHTML = "Проверьте подключение и попробуйте повторить запрос."
          });
  } else {
      document.querySelector(".random-recipe-section__container").innerHTML = "Вы не внесли тег для поиска";

      fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=5f32bda9da1044e5aef1e657650e5b7b`
      )
          .then(response => response.json())
          .then(randomRecipe => {
              document.querySelector(".random-recipe-section__container").innerHTML = "";
              // console.log(cards);

              try {
                    // console.log(randomRecipe.recipes[0]);
                                
                      document.querySelector(".random-recipe-section__container").innerHTML += `<div class="random-recipe-section__little-container">
                      <h4 href="${randomRecipe.recipes[0].title}" class="random-recipe-section__link">${randomRecipe.recipes[0].title}</h4>
                      <img src="${randomRecipe.recipes[0].image}" alt="картинка" class="random-recipe-section__img"><br/>
                      <a href="${randomRecipe.recipes[0].sourceUrl}" class="random-recipe-section__link">Ссылка на рецепт</a>
                      </div>`;

                  // if (randomRecipe.length === 0) {
                  //     throw new ReferenceError("Попробуйте изменить запрос: такой тег не найден. Поиск доступен только на английском языке.");
                  // }
                  if (randomRecipe === undefined) {
                      throw new SyntaxError("Попробуйте повторить запрос: пришли некорректные данные");
                  }
              } catch (error) {
                  console.log(error);
                  document.querySelector(".random-recipe-section__container").innerHTML = error.message;
              };
          })
          .catch(error => {
              console.log(error);
              document.querySelector(".random-recipe-section__container").innerHTML = "Проверьте подключение и попробуйте повторить запрос."
          });
  }
}

document.querySelector(".random-recipe-section__button").addEventListener("click", showCardsRandomRecipe);
// document.addEventListener("DOMContentLoaded", showCardsRandomRecipe);

