const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2] ,[3,4,5], [6,7,8],[0,3, 6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
//initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]
    //Empty boxes in empty
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "auto"
        //something to add here
        box.classList.remove("win");

        //initialise box with css properties again
        // box.classList = `box box${index+1}`
        
    })
    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame()

function swapPlayer(){
    if(currentPlayer === "X")
       currentPlayer ="O"
    else
      currentPlayer = "X"

    //UI update
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

function checkGameOver(){
   let answer = "";
   winningPositions.forEach((position)=>{

      if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") 
      &&( gameGrid[position[0]] === gameGrid[position[1]]) &&( gameGrid[position[1]] === gameGrid[position[2]])){
          //check if winner is X
          if(gameGrid[position[0]] ===  "X")
             answer = "X";
           else
             answer = "O"

    //disable pointer events
    boxes.forEach((box)=>{
        box.style.pointerEvents = "none"
    })

    //now we know X/O is a winner
    console.log(boxes[position[0]])
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
    }
   });

   if(answer !==""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
   }

   //when there is tie
   let fillCount =0;
   gameGrid.forEach((box)=>{
    if(box !== "")
      fillCount++;
   })

   //board is filled , game is TIE
   if(fillCount === 9){
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active")
   }
}

function handleClick(index){

    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        swapPlayer();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
   box.addEventListener("click",()=>{
    handleClick(index);
   })
})

newGameBtn.addEventListener("click",initGame);
