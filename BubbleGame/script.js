const bubbleBottom = document.querySelector(".bubbleBottom");
const timerval = document.querySelector(".timer");
const hitval = document.querySelector("[data-hitVal]");
const scoreVal = document.querySelector("[data-score]");

var timer = 60;
var score =0

function increaseScore(){
    score +=10;
    scoreVal.innerText = score;
}


function hitNumber(){
   var randomNum = Math.floor(Math.random()*10)
   hitval.innerText = randomNum;
}

function createBubble(){
    var bubbles = "" ;
    for(let i=1;i<217;i++){
        let rndNumber = Math.floor(Math.random()*10)
        bubbles += `  <div class="bubble"> ${rndNumber} </div>`
    }
    bubbleBottom.innerHTML = bubbles;
}


function runTimer(){
  
  var timerInterval = setInterval(()=>{
    if(timer>0){
        timer--;
        timerval.innerText = timer;
    }
    else{
        clearInterval(timerInterval);
        bubbleBottom.innerHTML = `<h1>Game Over</h1>`
    }
  },1000)
}

function handleBubbleClick(e){
    console.log(e.target.innerText)
}

bubbleBottom.addEventListener("click",(e)=>{
    var clickedNum = Number(e.target.innerText);
    if(clickedNum == hitval.innerText){
        increaseScore();
        hitNumber();
        createBubble();
    }
});

 hitNumber();
 runTimer();
 createBubble();