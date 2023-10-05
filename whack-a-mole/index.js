 const button = document.querySelector('[data-button]');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('[data-score]');
const moles = document.querySelectorAll('.mole');
const timer = document.querySelector('[data-timer]');
let lastHole;
let timeUp = false;
let score = 0;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
   
    const time = randomTime(500, 1000); //get a random time to determine how long mole should peep
    const hole = randomHole(holes); //get the random hole from the randomHole function
    
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
   
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);
}
let timeLeft = "";
function startGame() {
    button.textContent = "start";
    timeLeft = 15;
    timer.textContent = timeLeft;
    scoreBoard.innerText = 0;
    timeUp = false;
    score = 0;
    peep();
    updateTimer();
    setTimeout(() => {
        timeUp = true;
        button.textContent = "Play Again";
    }, 15000) //show random moles for 15 seconds
}


function updateTimer(){
    if(timeLeft > 0){
        setTimeout(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            updateTimer();
        }, 1000);
    } else {
        timer.textContent = "Game Over";
    }
}

function wack(e){
    console.log("clicked")
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}
button.addEventListener('click',startGame)
moles.forEach(mole => mole.addEventListener('click', wack))

