const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h3>Ruko jara sabar karo</h3>";

  try {

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  recipeContainer.innerHTML = "";

  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = ` <img src="${meal.strMealThumb}">
        <h3> ${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p> 
        <p><span>${meal.strCategory}</span> Category</p> 
         `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);
    // eventlistener to recipe button
    button.addEventListener("click", () => {
      openRecipePopUp(meal);
    });
    recipeContainer.appendChild(recipeDiv);
  });

}catch(error){
  recipeContainer.innerHTML = "<h2>Check typo or search another meal</h2>";
}
};

//function to fetch ingrendients

const fetchIngredients = (meal) =>{
 let ingrendientsList = ""
 for(let i= 1; i<=20; i++){
  const ingrendient = meal[`strIngredient${i}`]
  if(ingrendient){
    const measure = meal[`strMeasure${i}`]
    ingrendientsList += `<li>${measure} ${ingrendient} </li>`
  } else{
    break
  }
 }
 return ingrendientsList;
}


const openRecipePopUp = (meal) =>{
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredienist"> ${fetchIngredients(meal)}  </ul>
  <div>
  <h3 class="instructions">Instructions:</h3>
  <p class="recipeInstructions">${meal.strInstructions}</p>
</div>
  `
  
  recipeDetailsContent.parentElement.style.display = "block"
}

recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});
