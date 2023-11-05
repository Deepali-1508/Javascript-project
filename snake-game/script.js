let snakeArray = [{x:2,y:14}];
let foodPosition= {x:10,y:3};
let inputDir = {x:0,y:0};
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let hscore =0;
let level = "easy";


const yourScore = document.querySelector('#score');
const highScore = document.querySelector('#highScore');
const playBtn = document.querySelector("[data-playBtn]")
const easyBtn = document.querySelector("[data-easyBtn]")
const mediumBtn = document.querySelector("[data-mediumBtn]")
const hardBtn = document.querySelector("[data-hardBtn]")


if(level === "easy"){
  speed = 10;
}
else if(level === "medium"){
  speed = 15;
}
else if(level === "hard"){
  speed = 20;
}

easyBtn.addEventListener('click',()=>{
  level = "easy";
  speed = 10;
  easyBtn.classList.add('active');
  mediumBtn.classList.remove('active');
  hardBtn.classList.remove('active');
})

mediumBtn.addEventListener('click',()=>{
  level = "medium";
  speed = 15;
  easyBtn.classList.remove('active');
  mediumBtn.classList.add('active');
  hardBtn.classList.remove('active');
})

hardBtn.addEventListener('click',()=>{
  level = "hard";
  speed = 20;
  easyBtn.classList.remove('active');
  mediumBtn.classList.remove('active');
  hardBtn.classList.add('active');
})



//sound
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let board = document.getElementsByClassName('board')[0];

//if local storage contains the hscore set it to hscore
if(localStorage.length>0){
  hscore = localStorage.getItem('hscore');
  highScore.innerText = hscore;
}

//function
function main(cTime){
  window.requestAnimationFrame(main);
//   console.log(cTime)
  if((cTime-lastPaintTime)/1000<1/speed){
     return;
  }
  lastPaintTime = cTime;
  gameEngine()
}




function isCollide(snake){
  //bump into yourself
  for(let i=1;i<snakeArray.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y ===snake[0].y){
      return true;
    }
  }
  //bump into wall
  if(snake[0].x >= 18 || snake[0].y >=18 || snake[0].x <=0 || snake[0].y <= 0){
    return true;
  }
  return false;
}

function gameEngine(){
   //updating the snake array and food
 //collide condition
  if(isCollide(snakeArray)){
    gameOverSound.play();
    musicSound.pause();
    snakeArray = [{x:2,y:14}];
    alert("Game over!")
    inputDir = {x:0,y:0};
    score = 0;
    yourScore.innerText = score;
    highScore.innerText = localStorage.getItem('hscore');
    musicSound.pause();
  }

  //if you have eaten the food then update the food
  if(snakeArray[0].y === foodPosition.y && snakeArray[0].x === foodPosition.x){
    foodSound.play();
    score +=1;
    yourScore.textContent = score;
    if(score > hscore){
      hscore = score;
      highScore.textContent = hscore;
      localStorage.setItem('hscore',hscore);
    }

    snakeArray.unshift({x:snakeArray[0].x,y:snakeArray[0].y})
    let a=2;
    let b=16;
    foodPosition = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
   
  }

  //moving the snake
  for(let i=snakeArray.length-2;i>=0;i--){
    snakeArray[i+1] = {...snakeArray[i]};
  }
  snakeArray[0].x += inputDir.x;
  snakeArray[0].y += inputDir.y;



  //PART 2:
  //display the snake and food
   board.innerHTML="";
   snakeArray.forEach((e,index)=>{
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart=e.x;

    if(index === 0){
        snakeElement.classList.add('snake-head');
        
      // //  const snakeHead = document.querySelector('.snake-head');
      // snakeElement.style.transform = 'rotate(0)';
 
// // Update the rotatio n based on the direction
if (inputDir.x === 1) {
    // Right
    snakeElement.style.transform = 'rotate(0deg)';
} else if (inputDir.x === -1) {
    // Left
    snakeElement.style.transform = 'rotate(180deg)';
    snakeElement.style.transform= 'scaleX(-1)';
    snakeElement.style.filter= 'FlipH';

} else if (inputDir.y === 1) {
    // Down
    snakeElement.style.transform = 'rotate(90deg)'; 
} else if (inputDir.y === -1) {
    // Up
    snakeElement.style.transform = 'rotate(-90deg)';
}
        
    }
    else{
        snakeElement.classList.add('snake-body');
    }

    board.appendChild(snakeElement);
   })

   let foodElement = document.createElement('div');
   foodElement.style.gridRowStart = foodPosition.y;
   foodElement.style.gridColumnStart = foodPosition.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);
}
 

//implementation
//main logic


// musicSound.play();
window.requestAnimationFrame(main)


playBtn.addEventListener('click',()=>{
  musicSound.play();
  inputDir = {x:1,y:0};
  window.requestAnimationFrame(main)
}
)

window.addEventListener('keydown',(e) => {
    inputDir = {x:1,y:0};
    console.log(e)
    musicSound.play();

    switch(e.key){
      case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
        break;

      case "ArrowLeft":
        inputDir.x=-1; 
        inputDir.y=0;
        break;
      
      case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
        break;

      default:
        break; 
    }
})

