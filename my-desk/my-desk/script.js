const clockBtn = document.getElementById('clockBtn');
const calculatorBtn = document.getElementById('calculatorBtn');
const crossBtn = document.getElementById('crossBtn');
const timerBtn = document.getElementById('timerBtn');
const calendarBtn = document.getElementById('calendarBtn');

const myList = document.getElementById('my-list');
const calculator = document.getElementById('calculator');
const cross = document.getElementById('cross');
const clock = document.getElementById('clock');
const timer = document.getElementById('timer');
const calendar = document.getElementById('calendar');


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
    removeActiveClass(calendar);
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

calendarBtn.addEventListener('click',()=>{
    addActiveClass(calendar);
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
const newDate = new Date();
    let h = newDate.getHours();
    let m = newDate.getMinutes();
    let s = newDate.getSeconds();
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

// const calendar = document.getElementById('calendar');
const calendarContainer = document.querySelector('[data-calendar]')
const monthsContainer = document.querySelector('[data-month]');
const daysContainer = document.querySelector('[data-days]');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
const datesContainer = document.querySelector('[data-dates]');



const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const todayDate = new Date();
let selectedDate = todayDate;       // selectedDate is the date that is selected by the user
// console.log(todayDate);
// console.log(todayDate.getDate());
// console.log(todayDate.getMonth());
// console.log(todayDate.getFullYear());
// console.log(todayDate.getDay());

function renderCalendar() {
    monthsContainer.innerHTML = '';
    daysContainer.innerHTML = '';
    datesContainer.innerHTML = '';

    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    // console.log(firstDayOfMonth);
    // console.log(lastDayOfMonth);

    const monthName = months[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    monthsContainer.innerHTML = monthName + ' ' + year;

    for (let i = 0; i < daysOfWeek.length; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.innerText = daysOfWeek[i];
        daysContainer.appendChild(day);
    }

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const date = document.createElement('div');
        date.classList.add('date');
        datesContainer.appendChild(date);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = document.createElement('div');
        date.classList.add('date');
        date.innerText = i;
        if (i === todayDate.getDate() && selectedDate.getMonth() === todayDate.getMonth() && selectedDate.getFullYear() === todayDate.getFullYear()) {
            date.classList.add('todays-date');
        }
        datesContainer.appendChild(date);
         addingEventListenerToDates(date);
    }
}

renderCalendar();


prevBtn.addEventListener('click', () => {
    selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate());
    renderCalendar();
}
);

nextBtn.addEventListener('click', () => {
    selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate());
    // console.log(selectedDate);
    renderCalendar();
}
);


const eventDay = document.querySelector('[data-eventDay]');
const eventDate = document.querySelector('[data-eventDate]');
const events = document.querySelector('[data-events]'); 

const closeEventWrapper = document.querySelector('[data-closeEventWrapper]');
const addEventWrapper = document.querySelector('[data-addEventWrapper]'); 
const addEventBtnEventWrapper = document.querySelector('[data-addEventBtnEventWrapper]');
const addEventBtn = document.querySelector('[data-addEventBtn]'); 

const eventNameInput = document.querySelector('[data-eventNameInput]');
const eventTimeInputFrom = document.querySelector('[data-eventTimeInputFrom]');
const eventTimeInputTo = document.querySelector('[data-eventTimeInputTo]');

addEventBtn.addEventListener('click',()=>{
    addEventWrapper.classList.add('active');
})

closeEventWrapper.addEventListener('click',()=>{
    addEventWrapper.classList.remove('active');
});

let dateOfSelectedEvent = selectedDate.getDate() + ' ' + months[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear() ;
function addingEventListenerToDates(date) {
    date.addEventListener('click',()=>{

      let clickedDate = date.innerText;
      let clickedMonth = selectedDate.getMonth();
      let clickedYear = selectedDate.getFullYear();

      eventDate.innerText = clickedDate + ' ' + months[clickedMonth] + ' ' + clickedYear;
      dateOfSelectedEvent = clickedDate + ' ' + months[clickedMonth] + ' ' + clickedYear; 
      eventDay.innerText = daysOfWeek[new Date(clickedYear, clickedMonth, clickedDate).getDay()];
    
      addingEventsToEventBox();
      activeDate();
    })
}


function addingEventsToEventBox(){
    // //add event to local storage with respect to its collective date
    events.innerHTML = '';
    let showEvent = getEventsFromLocalStorage();
   
    showEvent.forEach((event)=>{
        let createEvent = document.createElement('div');
        createEvent.classList.add('event');
        createEvent.addEventListener('click',()=>{
            deleteEventFromLocalStorage(event);
        });
        createEvent.innerHTML = `
           <div class="title">
           <i class="fas fa-circle"></i>
           <h3 class="event-title">${event.eventName}</h3>
           </div>
           <div class="event-time">
           <span class="event-time">${event.eventTimeFrom}-${event.eventTimeTo}</span>
           </div>
               `
    events.appendChild(createEvent);
    })

    if(showEvent.length === 0){
            events.innerHTML = `<div class="no-event">
                    <h3>No Events</h3>
                </div>`;
        }
}
addingEventsToEventBox();
showEventAddedInDate();

function deleteEventFromLocalStorage(event){
    // console.log("delete event",event);
    if(confirm("Are you sure you want to delete this event?")){
        localStorage.removeItem(`${dateOfSelectedEvent}-${event.eventName}`);
    }
    addingEventsToEventBox();
}

function showEventAddedInDate(){
    let eventArray = [];
    for(let i=0; i<localStorage.length; i++){
       let key = localStorage.key(i).trim(' ').split(' ')[0];
         eventArray.push(key);
    }
    // console.log(eventArray);
    const dates = document.querySelectorAll('.date');
    dates.forEach((date)=>{
        let dateValue = date.innerText;
        if(eventArray.includes(dateValue)){
            date.classList.add('event-added');
        }else{
            date.classList.remove('event-added');
        }
    })
}
// console.log("dateOfSelectedEvent",dateOfSelectedEvent);
 function activeDate(){
    // alert("active date");
    const dates = document.querySelectorAll('.date');
    dates.forEach((date)=>{
        let dateValue = date.innerText;
        // console.log("active claass",dateOfSelectedEvent.split(' ')[0]);
        if(dateOfSelectedEvent.split(' ')[0] === dateValue){
            date.classList.add('clicked-date');
        }
        else{
            date.classList.remove('clicked-date');
        }
    })
}
activeDate();
function getEventsFromLocalStorage(){
    
    let eventsFromLocalStorage = [];
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        let eventDate = key.split('-')[0];
        if(eventDate.includes(dateOfSelectedEvent)){
            let eventObjString = localStorage.getItem(key);
            let eventObj = JSON.parse(eventObjString);
            eventsFromLocalStorage.push(eventObj);
        }
    }
    return eventsFromLocalStorage;
}

eventTimeInputFrom.addEventListener('input',(e)=>{
    eventTimeInputFrom.value = e.target.value.replace(/[^0-9:]/g, '');
    if(eventTimeInputFrom.value.length ===2){
        eventTimeInputFrom.value += ':';
    }
    if(eventTimeInputFrom.value.length >5){
        eventTimeInputFrom.value = eventTimeInputFrom.value.slice(0,5);
    }
});

eventTimeInputTo.addEventListener('input',(e)=>{
    eventTimeInputTo.value = e.target.value.replace(/[^0-9:]/g,'');
    if(eventTimeInputTo.value.length ===2){
        eventTimeInputTo.value += ':';
    }
    if(eventTimeInputTo.value.length >5){
        eventTimeInputTo.value = eventTimeInputTo.value.slice(0,5);
    }
})
// addEventBtnEventWrapper.addEventListener('click',()=>{
//     addEventToLocalStorage();
//     addEventWrapper.classList.remove('active');
//     eventNameInput.value = '';
//     eventTimeInputFrom.value = '';
//     eventTimeInputTo.value = '';
// });

function addEventToLocalStorage(eventTitle, timeFrom, timeTo){
    let eventObj = {
        eventName: eventTitle,
        eventTimeFrom: timeFrom,
        eventTimeTo: timeTo
    }
    let eventObjString = JSON.stringify(eventObj);
    localStorage.setItem(`${dateOfSelectedEvent}-${eventObj.eventName}`, eventObjString);
    showEventAddedInDate();

}

addEventBtnEventWrapper.addEventListener('click',()=>{
    const eventTitle = eventNameInput.value;
    const eventTimeFrom = eventTimeInputFrom.value;
    const eventTimeTo = eventTimeInputTo.value;
    
    if(eventTimeFrom === "" || eventTimeTo === "" || eventTitle === ""){
        alert("Please fill all the fields");
        return;
    }
    //check both time format 24hour
    
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');
    if(timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0]>23 || timeToArr[0]>23 || timeFromArr[1] >59 || timeToArr[1] >59){
        alert("Please enter valid time");
        return;
    }
    
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    //check if event is already exist
    let eventExist = false;
    // if()
    
    addEventToLocalStorage(eventTitle, timeFrom, timeTo);
    addEventWrapper.classList.remove('active');
    eventNameInput.value = '';
    eventTimeInputFrom.value = '';
    eventTimeInputTo.value = '';
    addingEventsToEventBox()
})

function convertTime(time){
    //convert time to 24 hour format
    let timeArr = time.split(':');
    let hour = timeArr[0];
    let minute = timeArr[1];

    let timeFormat = hour >=12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    time = `${hour}:${minute} ${timeFormat}`;
    console.log("tgime",time)
    return time;
}

