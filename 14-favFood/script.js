
const API_KEY = "785ebc3387d74ddf9a0e66bc48554d04";

const recipeList = document.querySelector("#recipe-list");
const ingredients = document.querySelector("[data-ingredients]");
const showRecipe = document.querySelector("[data-showRecipe]");
const closeBtn = document.querySelector("[data-closeBtn]");
let recipeData = false;
let flag = false;
const recipes = [];


async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    // recipeData =true
     recipes.push(data.recipes);
    return data.recipes;
}

function displayRecipes(recipes){
    
    recipes.forEach((recipe,index) => {
        let html = "";
        const descriptionClass = `description-${index}`;
        const instructionsClass = `instructions-${index}`;

        html = `
        <li class="recipe-item">
        <div class="title">${recipe.title}</div>

        <div class="description  ${descriptionClass} active">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients</h3>
        <div class="ingredients">
         ${recipe.extendedIngredients.slice(0,3).map(ingredient => `<span key={ingredient.id}>${ingredient.originalName},</span>`).join("")}
         <span>...</span>
         </div>
         </div>
         
         <div class="instructions ${instructionsClass}">
          ${recipe.summary.slice(0,300)}<span>...</span>
         </div>
         <button class="btn ">View Recipe</button>
    </li>
        `;
        recipes.push(recipe);
        recipeList.innerHTML += html;
    });
   
    hoverItems();
}


// hover over recipe description , call toggleFunction
//  <a href="${recipe.sourceUrl}" target="_blank" class="btn">View Recipe</a>

function viewRecipe(index){
    console.log("index",index)
    console.log(recipes[0][index])
   const recipeToShow = recipes[0][index];
   const title = document.querySelector("[data-showRecipeTitle]");
    const image = document.querySelector("[data-showRecipeImg]");
    const ingredients = document.querySelector("[data-showRecipeIngredients]");
    const preparation = document.querySelector("[data-showRecipePreparation]");
    const summary = document.querySelector("[data-showRecipeSummary]");

    title.innerText = recipeToShow.title;
    image.src = recipeToShow.image;
    // summary.innerText = recipeToShow.summary;
    ingredients.innerHTML = recipeToShow.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
    preparation.innerHTML = recipeToShow.instructions;
}

function hoverItems(){
    const recipeItems = document.querySelectorAll(".recipe-item");
    const buttons = document.querySelectorAll(".btn");
    recipeItems.forEach((recipe , index)=>{
        recipe.addEventListener("mouseover",()=>{
                toggleFunction(index);
        })

       //remove mouse from recipe
         recipe.addEventListener("mouseout",()=>{
          
            //   alert(`out ${index}`)
                toggleFunction(index);
         
        })
    })

    buttons.forEach((button,index)=>{
        // console.log("button",index);
        // console.log(recipes);
        // console.log("recipes[index]",recipes[0][index])
        button.addEventListener("click",()=>{
            console.log("recipes[index]",recipes[0][index]);
            viewRecipe(index);
            showRecipe.classList.add("active");
            recipeList.classList.remove("active");
        })
    })
}

closeBtn.addEventListener("click",()=>{
    showRecipe.classList.remove("active");
    recipeList.classList.add("active");
})


function toggleFunction(index){
    const descriptionIndex = `.description-${index}`;
    const instructionsIndex = `.instructions-${index}`;

    document.querySelector(descriptionIndex).classList.toggle("active");
    document.querySelector(instructionsIndex).classList.toggle("active");
}


async function init(){
    recipeList.classList.add("active");
    const recipes = await getRecipes();
    displayRecipes(recipes);
    
}

const refreshBtn = document.querySelector("[data-refreshBtn]");
refreshBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    recipeList.innerHTML = "";
    init();
})

init();
