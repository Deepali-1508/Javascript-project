

document.addEventListener('DOMContentLoaded',()=>{
  const scoreContainer = document.querySelector('.score-container');
  const gameOverContainer = document.querySelector('.game-over-container');

  let grid = createGrid();
  let squares = Array.from(grid.querySelectorAll('div'))
  const score = document.querySelector('[data-score]');
  const fScore = document.querySelector('[data-fScore]')
  const startBtn = document.querySelector('[data-startBtn]');
  const reStartBtn = document.querySelector('[data-reStartBtn]');
// let squares = Array.from(document.querySelectorAll('.grid-container div'))
   const width = 10;
   const GRID_WIDTH = 10;
   let currScore =0;
   let timerId;
   const colors = [
    'url(images/blue_block.png)',
    'url(images/pink_block.png)',
    'url(images/purple_block.png)',
    'url(images/peach_block.png)',
    'url(images/yellow_block.png)'
  ]
  let randomColors = Math.floor(Math.random()*colors.length);


function createGrid(){
  scoreContainer.classList.add('active');
  let gridContainer = document.querySelector('[data-gridContainer]');

  for(let i=0;i<200;i++){
    let div = document.createElement('div');
    // div.classList.add('square')
    
    //set the end path
    if(i>=190){
      div.classList.add('block2');
    }
    gridContainer.appendChild(div);
  }

  return gridContainer;
}


const lTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
  [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
]

const zTetromino = [
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
]


const tTetromino = [
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
]

const oTetromino = [
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
]

const iTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
]


const theTetrominoes = [iTetromino,oTetromino,tTetromino,zTetromino,lTetromino];
let random = Math.floor(Math.random()*theTetrominoes.length)
let currentRotation = Math.floor(Math.random()* lTetromino.length);
let currentPosition = 4;
let currentTetromino = theTetrominoes[random][currentRotation];


function draw(){
  currentTetromino.forEach((index)=>{
    squares[currentPosition + index].classList.add('block');
    squares[currentPosition + index].style.backgroundImage = colors[randomColors]
  })
}

function undraw(){
  currentTetromino.forEach((index)=>{
    squares[currentPosition+index].classList.remove('block')
    squares[currentPosition + index].style.backgroundImage = 'none';
  })
}

function freeze(){
  if (currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken') || squares[currentPosition + index + width].classList.contains('block2'))) {
    currentTetromino.forEach(index => squares[currentPosition+index].classList.add('taken'))

    //start new tetromino falling
     random =Math.floor(Math.random()*theTetrominoes.length)
    currentRotation = Math.floor(Math.random()* lTetromino.length);
    currentTetromino = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    randomColors = Math.floor(Math.random()*colors.length)
    draw();
    addScore();
    gameOver();
  }
}
// timerId = setInterval(moveDown, 1000)

startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }

    draw()
    currScore = 0;
    score.innerHTML = currScore;
    timerId = setInterval(moveDown, 1000)
    random = Math.floor(Math.random() * theTetrominoes.length)
    
})



function moveDown(){
  undraw();
  currentPosition +=width;
  draw();
  freeze();
  gameOver();
}

// moveDown();

   document.addEventListener('keydown',(e)=>{
    e.preventDefault();
    if(e.code === 'ArrowLeft'){
      moveLeft();
    }
    if(e.code === 'ArrowRight'){
      moveright();
    }
    if(e.code === 'ArrowUp'){
      rotate();
    }
    if(e.code === 'ArrowDown'){
      moveDown();
    }
   })

   function moveLeft(){
    undraw();
    const isAtLeftEdge = currentTetromino.some(index => (currentPosition+index)%width ===0);
    if(!isAtLeftEdge){
      currentPosition -=1;
    }
    if(currentTetromino.some(index => squares[currentPosition+index].classList.contains('taken'))){
      currentPosition +=1;
    }

    draw();
   }

   function moveright(){
    undraw();
    const isAtRightEdge = currentTetromino.some(index => (currentPosition+index)%width === width-1);
    if(!isAtRightEdge){
      currentPosition +=1;
    }

    if(currentTetromino.some(index =>squares[currentPosition+index].classList.contains('taken'))){
      currentPosition -=1;
    }
    draw();
   }

   function rotate(){
    undraw();
    currentRotation++;
    if(currentRotation ===currentTetromino.length){
      currentRotation =0;
    }
    currentTetromino = theTetrominoes[random][currentRotation];
    draw()
   }

   

   function addScore(){
    for(let i=0;i<200;i+=GRID_WIDTH){
      const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
      if(row.every(index => squares[index].classList.contains('taken'))){
        currScore+=10
        score.innerHTML = currScore;

        row.forEach(index =>{
          squares[index].classList.remove('taken')
          squares[index].classList.remove('block')
          squares[index].style.backgroundImage = 'none'; // Clear background image
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        grid.innerHTML = '';
        squares.forEach(cell => grid.appendChild(cell))

      }
    }
   }

   function gameOver() {
    if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken') && Math.floor((currentPosition + index) / width) <= 1)) {
      clearInterval(timerId);
      fScore.innerHTML= currScore;
      console.log(currScore)
      scoreContainer.classList.remove('active');
      gameOverContainer.classList.add('active');
    }
  }
  

  reStartBtn.addEventListener('click',()=>{
      grid.innerHTML='';
      grid = createGrid();
      squares = Array.from(grid.querySelectorAll('div'));
      scoreContainer.classList.add('active');
      gameOverContainer.classList.remove('active')
    })
  
  
})
