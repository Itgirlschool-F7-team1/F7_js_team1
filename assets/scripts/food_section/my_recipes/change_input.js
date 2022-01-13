// Функции для стилизации инпута для загрузки фотографии
document.querySelector(".enter-recipe__fileform").addEventListener(
  "click",
  (clickInput = () => {
    document.querySelector("#recipePhoto").click();
  })
);

let getName = () => {
  let i;
  let str = document.getElementById("recipePhoto").value;
  if (str.lastIndexOf("\\")) {
    i = str.lastIndexOf("\\") + 1;
  } else {
    i = str.lastIndexOf("/") + 1;
  }
  let filename = str.slice(i);
  let uploaded = document.getElementById("enter-recipe__fileformlabel");
  uploaded.innerHTML = filename;
};

document.querySelector(".enter-recipe__photo").onchange = () => {
  getName(this.value);
};
