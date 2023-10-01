const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyMsg = document.querySelector("[data-copyMsg]")
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox")
const copyBtn = document.getElementById("copyBtn");
let password = "";
let passwordLength = 10;
let checkCount= 1;
setIndicatorColor("#ccc")

handleSlider();

//handleSlider => set password length
function handleSlider(){
   inputSlider.value = passwordLength;
   lengthDisplay.innerText = passwordLength;

   //
   const min = inputSlider.min;
   const max = inputSlider.max;

   inputSlider.style.backgroundSize  = ((passwordLength-min)*100/(max-min)) + "% 100%"

}

//set indicator color
function setIndicatorColor(color){
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow = `0 0 5px ${color}`;
}

//random int
function getRndInteger(min , max){
   return Math.floor(Math.random() *( max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const symbols = "!@#$%^&*(){}[]=_+<>,./?"
    // symbols.charAt(getRndInteger(0,symbols.length));
    return symbols[getRndInteger(0,symbols.length)]; 
}

function calculateStrength(){
    let strength = 0;
    if(upperCase.checked) strength++;
    if(lowerCase.checked) strength++;
    if(numbers.checked) strength++;
    if(symbols.checked) strength++;

    if((strength == 3 || strength == 4) && passwordLength >=8) 
    setIndicatorColor("#0f0");
    else if(strength == 2 && passwordLength >=6)
    setIndicatorColor("#ff0");
    else
      setIndicatorColor("#f00")
  
}

async function copyContent(){
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";

  } catch (error) {
    copyMsg.innerText = "Failed";
  }

  copyMsg.classList.add("active");
  setTimeout(()=>{
    copyMsg.classList.remove("active");
  },2000)
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked) checkCount++;
    })

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}


function shufflePassword(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
  //  [array[i],array[j]] = [array[j],array[i]];
   const temp = array[i];
   array[i]= array[j];
   array[j] = temp;
   
    }
    let str =   "";
    array.forEach((el)=>(str +=el));
    return str;
    // return shufflePassword.join("");

}

allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value ){
    copyContent();
    }
})



generateBtn.addEventListener("click",()=>{
    //none of the checkbox is checked
   if(checkCount <=0 )
    return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //generate password
    //remove old password
    password = ""; 

    //let's put the stuff mentioned by checkbox
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    if(upperCase.checked)
      funcArr.push(generateUpperCase);

    if(lowerCase.checked)
      funcArr.push(generateLowerCase);

    if(numbers.checked)
      funcArr.push(generateRandomNumber);

    if(symbols.checked)
      funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randIndex]();
    }

    //shuffle password
    password = shufflePassword(Array.from(password));

    //display password
    passwordDisplay.value = password ;

    //strength
    calculateStrength();
})


