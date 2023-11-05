
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

//calender






//count down timer



//stop watch


//timer


//alarm clock


//progress bar


//accordion


//modal




