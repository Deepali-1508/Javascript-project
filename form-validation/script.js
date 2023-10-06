const nameval = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const form = document.getElementById("form");
const userName = document.getElementById("user-name");
const mobileNumber = document.getElementById("mobileNumber");
const submit = document.getElementById("submit-btn");
const reset = document.getElementById("reset-btn");

const nameSpan = document.getElementById("nameSpan");
const emailSpan = document.getElementById("emailSpan");
const passwordSpan = document.getElementById("passwordSpan");
const confirmPasswordSpan = document.getElementById("cpSpan");
const userNameSpan = document.getElementById("usernameSpan");
const mobileNumberSpan = document.getElementById("numberSpan");


// validation function 
// email validation function =>done
// password validation function =>done
// confirm password validation function =>done
// mobile number validation function =>done

function validateEmail(validemail){
   let email =  String(validemail).toLowerCase()
   .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(email === null){
        return false;
    }
    else{
        return true;
    }
}

function validatePassword(password){
    if(password.length < 8){
      return false;
    }
    else{
        return true;
    }
}

function validateConfirmPassword(password, confirmPassword){
    if(password !== confirmPassword){
        return false;
    }
    else{
        return true;
    }
}

function validation(){
    var checkname = nameval.value;
    var checkemail = email.value;
    var checkpassword = password.value;
    var checkconfirmPassword = confirmPassword.value;
    var checkuserName = userName.value;
    var checkmobileNumber = mobileNumber.value;


    if(checkname === ""){
        nameSpan.innerHTML = " ** Please fill the name field";
        return false;
    }

    if(checkemail === ""){
        emailSpan.innerHTML = " ** Please fill the email field";
        return false;
    }

    if(!validateEmail(checkemail)){
        emailSpan.innerHTML = " ** Invalid email";
        return false;
    }

    if(checkpassword === ""){
        passwordSpan.innerHTML = " ** Please fill the password field";
        return false;
    }

    if(!validatePassword(checkpassword)){
        passwordSpan.innerHTML = " ** Password must be at least 8 characters";
        return false;
    }

    if(checkconfirmPassword === ""){
        confirmPasswordSpan.innerHTML = " ** Please fill the confirm password field";
        return false;
    }

    if(!validateConfirmPassword(checkpassword, checkconfirmPassword)){
        confirmPasswordSpan.innerHTML = " ** Passwords do not match";
        return false;
    }

    if(checkuserName === ""){
        userNameSpan.innerHTML = " ** Please fill the username field";
        return false;
    }

    if (checkuserName.length <= 3 || checkuserName.length > 20) {
       userNameSpan.innerHTML =
          " ** Username lenght must be between 3 and 20";
        return false;
      }

    if(!isNaN(checkuserName)){
        userNameSpan.innerHTML = " ** Only characters are allowed";
        return false;
    }

    if(checkmobileNumber === ""){
        mobileNumberSpan.innerHTML = " ** Please fill the mobile number field";
        return false;
    }

    if (isNaN(checkmobileNumber)) {
      mobileNumberSpan.innerHTML =
        " ** user must write digits only not characters";
      return false;
    } 

    if(checkmobileNumber.length !== 11){
        return false;
    }

    //store username and password in local storage
    localStorage.setItem("username", checkuserName);
    localStorage.setItem("password", checkpassword);

    return true;

}


function formReset(){
    nameval.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    userName.value = "";
    mobileNumber.value = "";
    nameSpan.innerHTML = "";
    emailSpan.innerHTML = "";
    passwordSpan.innerHTML = "";
    confirmPasswordSpan.innerHTML = "";
    userNameSpan.innerHTML = "";
    mobileNumberSpan.innerHTML = "";
}


form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validation()) {
            alert("Sign up successfully done. Please login");
            formReset();
        }
 });

reset.addEventListener("click", (e) => {
    e.preventDefault();
    formReset();
});
 




