
const questionsWrapper = document.querySelector("[data-questions]");
const answerOptions = document.querySelector("[data-answerOptions]")
const startBtn = document.querySelector("[data-startButton]")
const currentQuestionNumber = document.querySelector("[data-currentQuestionNumber]")
const totalQuestions = document.querySelector("[data-totalQuestions]")
const submitBtn = document.querySelector("[data-submitBtn]")
const nextBtn = document.querySelector("[data-nextBtn]")

const numQuestions = document.querySelector("#num-questions"); 
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const timePerQuestion = document.querySelector("#time");

const quizEndWrapper = document.querySelector(".end-quiz");
const quizQuestionsWrapper = document.querySelector(".quiz-questions");
const startQuizWrapper = document.querySelector(".start-quiz");
const restartBtn = document.querySelector("[data-restartBtn]");

const finalScore = document.querySelector("[data-finalScore]");
const totalScore = document.querySelector("[data-totalScore]");

let questions = [];
let currentQue = 0;
let time = 30;
let score = 0;

function init(){
  quizEndWrapper.classList.remove("active");
  quizQuestionsWrapper.classList.remove("active");
  startQuizWrapper.classList.add("active");
}

init();

function quizEnd(score,total){
  quizQuestionsWrapper.classList.remove("active");
  quizEndWrapper.classList.add("active");
  finalScore.textContent = score;
  totalScore.textContent = `${total}`;
}

 restartBtn.addEventListener("click",restartQuiz)

function restartQuiz(){
    init();
}

 async function quizStart(){
  // console.log("quiz started");
 

  const num = numQuestions.value,
  cat = category.value,
  diff = difficulty.value;

  loadingAnimation();

  startQuizWrapper.classList.remove("active");
  quizQuestionsWrapper.classList.add("active");

  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    // console.log("started")
    await fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data.results)
        questions = data.results;
        showQuestion(questions[0])
    })
    .catch((error)=>{console.log(error)})
}


function showQuestion(question){
      submitBtn.classList.add("active");
      nextBtn.classList.remove("active");
      submitBtn.disabled = true;
      questionsWrapper.innerHTML = question.question;
      answerOptions.innerHTML = "";
      const answers = [...question.incorrect_answers,
        question.correct_answer.toString()];
      answers.sort(()=> Math.random() - 0.5);
    
      answers.forEach((answer)=>{
        answerOptions.innerHTML += `
        <div class="answer ">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
        `
      }) 
      currentQue++;
      currentQuestionNumber.innerText = currentQue;
      totalQuestions.innerText = questions.length;

      const answerDiv = document.querySelectorAll(".answer");
      answerDiv.forEach((answer)=>{
        answer.addEventListener("click",()=>{
          if(!answer.classList.contains("selected")){
             answerDiv.forEach((answer)=>{
                answer.classList.remove("selected")
             })
             answer.classList.add("selected")
             submitBtn.disabled = false;
          }
        })
      })

      time = timePerQuestion.value;
      startTimer(time);
}

startBtn.addEventListener("click",quizStart);

function startTimer(time){
  let timer = setInterval(()=>{
    time--;
    if(time === 3){
       playAudio("countdown.mp3");
    }
    if(time >=0){
      progress(time);
    }
    else{
      checkAnswer();
      clearInterval(timer);
    }
  },1000);
};

const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-text");

function progress(value){
  const percentage = value/time * 100;
  // console.log(percentage)
  progressBar.style.width = `${percentage}%`;
  progressText.innerText = value;
}


function checkAnswer(){
    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer)=>{
      if(answer.classList.contains("selected")){
        if(answer.innerText === questions[currentQue-1].correct_answer){
          answer.classList.add("correct");
          score++;
        }
        else{
         answer.classList.add("incorrect");
        }
      }
      else{
       if(answer.innerText === questions[currentQue-1].correct_answer){
         answer.classList.add("correct");
       }
      }
    })

    submitBtn.classList.remove("active");
    nextBtn.classList.add("active");
    nextBtn.disabled = false;
}

submitBtn.addEventListener("click",checkAnswer);
nextBtn.addEventListener("click",()=>{
  // console.log("next btn clicked")
  if(currentQue === questions.length){
    // console.log("quiz ended")
    answerOptions.innerHTML = "";
    currentQuestionNumber.innerText = "";
    totalQuestions.innerText = "";
    submitBtn.classList.remove("active");
    nextBtn.classList.remove("active");

    quizEnd(score,questions.length);

     questions = [];
     currentQue = 0;
     time = 30;
     score = 0;

     
    return;
  }
  showQuestion(questions[currentQue])
});


const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

function loadingAnimation(){
  startBtn.innerHTML = "Loading";
  startBtn.disabled = true;
  const loadingInterval = setInterval(()=>{
    if(startBtn.innerHTML.length ===10){
      startBtn.innerHTML = "Loading";
      // clearInterval(loadingInterval);
    }
    else{
      startBtn.innerHTML += ".";
    }
  },500)

};



