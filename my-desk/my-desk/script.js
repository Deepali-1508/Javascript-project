const clockBtn = document.getElementById('clockBtn');
const calculatorBtn = document.getElementById('calculatorBtn');
const crossBtn = document.getElementById('crossBtn');
const timerBtn = document.getElementById('timerBtn');

const myList = document.getElementById('my-list');
const calculator = document.getElementById('calculator');
const cross = document.getElementById('cross');
const clock = document.getElementById('clock');
const timer = document.getElementById('timer');


function addActiveClass(name){
    name.classList.add('active');
}
function removeActiveClass(name){
    name.classList.remove('active');
}

crossBtn.addEventListener('click',()=>{
    addActiveClass(myList);
    removeActiveClass(cross);
    removeActiveClass(calculator);
    removeActiveClass(clock);
    removeActiveClass(timer);
})

calculatorBtn.addEventListener('click',()=>{
    addActiveClass(calculator);
    removeActiveClass(myList);
    addActiveClass(cross);
})

clockBtn.addEventListener('click',()=>{
    addActiveClass(clock);
    removeActiveClass(myList);
    addActiveClass(cross);
});

timerBtn.addEventListener('click',()=>{
    addActiveClass(timer);
    removeActiveClass(myList);
    addActiveClass(cross);
});

function init(){
    addActiveClass(myList);
    removeActiveClass(calculator);
    removeActiveClass(cross);
}

init();

//calculator 
let input = document.getElementById('input');

//functions
function getInput(num){
    input.value += num;
}

function clearInput(){
    input.value = '';
}

function deleteNumber(){
    input.value = input.value.slice(0,-1);
}

function getResult(){
    let result = math.evaluate(input.value);
    input.value = result.toLocaleString('en');  
}


// //clock
const time = document.getElementById('time');
const secondNeedle = document.getElementById('second-hand');
const hourNeedle = document.getElementById('hour-hand');
const minuteNeedle = document.getElementById('minute-hand');

setInterval(()=>{
const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = "AM";
    // Convert to 12 hour format AND CHANGE INITO PM


    if(h===0){
        h = 12; // this is 12 hour format and 12am is 0 hour
    }
    if(h>12){
        h = h-12;
        session = "PM";
    }

    h = (h<10) ? "0"+h: h;
    m = (m<10) ? "0"+m: m;
    s = (s<10) ? "0"+s: s;


    time.innerHTML = `${h}:${m}:${s} ${session}`;
    secondNeedle.style.transform = `rotate(${s*6}deg`;
    hourNeedle.style.transform = `rotate(${h*30}deg`;
    minuteNeedle.style.transform = `rotate(${m*6}deg`;

},1000)



// //count down timer

const setHour = document.getElementById('hour');
const alarmAudio = new Audio('assets/alarm.mp3');
const setMinute = document.getElementById('minute');
const setSecond = document.getElementById('second');

const stopBtn = document.getElementById('stopTime');
const resetBtn = document.getElementById('resetTime');
const startButton = document.getElementById('startTime');

const timerContainer = document.querySelector('.timer-container');
const showTimerContainer = document.querySelector('.show-timer-container');

// Get the .timer-display element
const timerDisplay = document.querySelector(".timer-display");
let minuteDisplay = document.getElementById('minute-display');
let secondDisplay = document.getElementById('second-display');
// Add a scroll event listener to the container


// function addingEventListener(time){
//     time.addEventListener("wheel", function(event) {
   
//         const deltaY = event.deltaY;
//         // Determine the number of steps to scroll
//         const steps = Math.floor(Math.abs(deltaY) / 32); // 32 is the height of each number
//        time.style.transform = `translateY(calc(${getComputedStyle(time).transform.split(',')[5]}px - ${deltaY}px))`;
      
//        // Calculate the position of the center of the container
//        const containerRect = time.getBoundingClientRect();
//        const containerCenterX = containerRect.left + containerRect.width / 2;
//        const containerCenterY = containerRect.top + containerRect.height / 2;
     
//        // Use the center coordinates to get the element at that point
//        const visibleNumber = document.elementFromPoint(containerCenterX, containerCenterY);
     
//        // Update the visible number based on the selected number
//     //    demo.textContent = visibleNumber.textContent;
//     //    console.log(demo.textContent)
//        console.log(visibleNumber.textContent)
//        return visibleNumber.textContent;
//     });
// }
// const startButton = document.getElementById('startTime');

// function getNumber(){
//     let hour = addingEventListener(timerDisplay);
//     console.log(hour)
//      let minute = addingEventListener(minuteDisplay);
//      let second = addingEventListener(secondDisplay);
//      startButton.addEventListener('click',()=>{
//          startTime(hour,minute,second);
//      })
// }
//  getNumber();

function addingEventListener(time, callback) {
    let isScrolling;

    time.addEventListener("wheel", function(event) {
        // Clear any existing timeout to debounce the event
       
        clearTimeout(isScrolling);

        // Set a timeout to execute the callback after a short delay
        isScrolling = setTimeout(function() {
            const deltaY = event.deltaY;
            // console.log(deltaY)
             const steps = Math.floor(Math.abs(deltaY) / 32);
            //  console.log("steps",steps);

            time.style.transform = `translateY(calc(${getComputedStyle(time).transform.split(',')[5]}px - ${deltaY}px))`;
            // console.log("style",time.style.transform);

            const containerRect = time.getBoundingClientRect();
            // console.log("container/Rect",containerRect)
            const containerCenterX = containerRect.left + containerRect.width / 2;
            // console.log("containerCenterX",containerCenterX)
            const containerCenterY = containerRect.top + containerRect.height / 2;
            // console.log("containerCenterY",containerCenterY)

            const visibleNumber = document.elementFromPoint(containerCenterX, containerCenterY);

            // Call the callback function with the visible number
            console.log("addingEventListener", time, visibleNumber.textContent);
            callback(visibleNumber.textContent);
        }, 200); // Adjust the delay as needed
    });
}

let hour=0;
let minute=0;
let second=0;

function getNumber() {
    timerContainer.classList.add('active');
    showTimerContainer.classList.remove('active');
    addingEventListener(timerDisplay, function(value) {
         hour =  Math.ceil(parseInt(value));
    });

    addingEventListener(minuteDisplay, function(value) {
        minute = Math.ceil(parseInt(value));
        
    });

    addingEventListener(secondDisplay, function(value) {
       
            second = Math.ceil(parseInt(value));
       
        
       
    });
    
}

getNumber();
startButton.addEventListener('click', (e) => {
    // showTimerContainer.classList.add('active');
    // timerContainer.classList.remove('active');
    // alert("hello")
    // console.log(hour,minute,second)
    e.preventDefault();
    showTimerContainer.classList.add('active');
    timerContainer.classList.remove('active');
    startTime(hour, minute, second);
});

stopBtn.addEventListener('click',()=>{
    stopTime();
});

resetBtn.addEventListener('click',()=>{
    resetTime();
});

let intervalId; // to store the interval id
function startTime(hours,minutes,seconds){
    
     intervalId = setInterval(()=>{
        if(seconds>0){
            seconds--;
        }
        else{
            
            if(minutes>0){
                minutes--;
                seconds = 59;
            }
            else{
                if(hours>0){
                    minutes = 59;
                    hours--;
                }
                else{
                   
                    alarmAudio.play();
                    setTimeout(()=>{
                        resetTime();
                    },1000)
                    alert("Time is up ! Alarm Ringing .....");
                    alarmAudio.pause();
                   
                }
            }

        }
        setHour.innerHTML = hours;
        setMinute.innerHTML = minutes;
        setSecond.innerHTML = seconds;
},1000)

}

function stopTime(){
    hour = parseInt(setHour.innerHTML);
    minute = parseInt(setMinute.innerHTML);
    second = parseInt(setSecond.innerHTML);
   clearInterval(intervalId);
}

function resetTime(){
    clearInterval(intervalId);
    timerContainer.classList.add('active');
    showTimerContainer.classList.remove('active');
    setHour.innerHTML = 0;
    setMinute.innerHTML = 0;
    setSecond.innerHTML = 0;
    getNumber();
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

//minute seconds display

function displayNumbers(numbers){
    for(let i=0;i<=59;i++){
        let div = document.createElement('div');
        div.innerHTML = i;
        numbers.appendChild(div);
    }
}

displayNumbers(minuteDisplay);
displayNumbers(secondDisplay);


// //stop watch

//calender






//count down timer



//stop watch


//timer


//alarm clock


//progress bar


//accordion


//modal




