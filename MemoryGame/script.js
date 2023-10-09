const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const restartButton = document.querySelector('[data-restartBtn]');
  const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
      },
      {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
      },
      {
        name: 'pizza',
        img: 'images/pizza.png'
      },
      {
        name: 'milkshake',
        img: 'images/milkshake.png'
      },
      {
        name: 'hotdog',
        img: 'images/hotdog.png'
      },
      {
        name: 'fries',
        img: 'images/fries.png'
      },
      {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
      },
      {
        name: 'pizza',
        img: 'images/pizza.png'
      },
      {
        name: 'milkshake',
        img: 'images/milkshake.png'
      },
      {
        name: 'hotdog',
        img: 'images/hotdog.png'
      }
  ]

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [] ;

  cardArray.sort(() => 0.5 - Math.random())
  function flipCard(){
     let cardId = this.getAttribute('data-id');
     cardsChosen.push(cardArray[cardId].name);
     cardsChosenId.push(cardId);

     this.setAttribute('src', cardArray[cardId].img);

     if(cardsChosen.length === 2){
        setTimeout(checkForMatch , 500);
     }
  }

  function checkForMatch(){
        const cards = document.querySelectorAll('img');
        // console.log("check for match " , cards);
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if(optionOneId == optionTwoId){
            cards[optionOneId].setAttribute('src', 'images/blank.png'); 
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            
        }
        else if(cardsChosen[0] === cardsChosen[1]){
            
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click' , flipCard);
            cards[optionTwoId].removeEventListener('click' , flipCard);
            cardsWon.push(cardsChosen);
        }
        else{
           cards[optionOneId].setAttribute('src', 'images/blank.png');
           cards[optionTwoId].setAttribute('src', 'images/blank.png');
           
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length === cardArray.length/2){
            for(let i=0;i<cards.length;i++){
                cards[i].setAttribute('src' , '');
            }

            resultDisplay.textContent = "Congratulations! You found them all";
            restartGame();  
        }
    }

  function restartGame(){
    restartButton.classList.add("active");
    restartButton.addEventListener('click' ,createBoard);
  }
  //create board 
  function createBoard(){
    restartButton.classList.remove("active");
    resultDisplay.textContent = 0;
    for(let i=0;i<cardArray.length ;i++){
        const card = document.createElement('img')
        card.setAttribute('src' , 'images/blank.png');
        card.setAttribute('data-id' , i);
        card.addEventListener('click' , flipCard);
        grid.appendChild(card);
    }
  }

  createBoard();