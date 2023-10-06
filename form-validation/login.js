const userName = document.getElementById("username");
const password = document.getElementById("password");
const userNameSpan = document.getElementById("nameSpan");
const passwordSpan = document.getElementById("passwordSpan");
const loginSpan = document.getElementById("loginSpan");
const form = document.getElementById("form");   
const logedInContainer = document.querySelector("[data-logedIn]");
const singInContainer = document.querySelector("[data-singIn]");
const logoutBtn = document.querySelector('#logout-btn')


singInContainer.classList.add("active"); 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let checkuserName = userName.value;
    let checkpassword = password.value;

    if(checkuserName === ""){
        userNameSpan.innerHTML = " ** Please fill the username field";
        return false;
    }

    if(password === ""){
        passwordSpan.innerHTML = " ** Please fill the password field";
        return false;
    }

    
    let storedUserName = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (checkuserName === storedUserName && checkpassword === storedPassword) {
        logedInContainer.classList.add("active");
        singInContainer.classList.remove("active");
        return true;
        }
    else {
        console.log("error");
        loginSpan.innerHTML = " ** Username or Password is incorrect";
        return false;
    }
}
);

logoutBtn.addEventListener('click', () => {
// empty local storage
localStorage.clear();
// show login form
singInContainer.classList.add("active");
logedInContainer.classList.remove("active");
}
);

logoutBtn.addEventListener('click', () => {
// empty local storage
localStorage.clear();
//reset form
formReset();
// show login form
singInContainer.classList.add("active");
logedInContainer.classList.remove("active");
}
);

function formReset(){
    userName.value = "";
    password.value = "";
    userNameSpan.innerHTML = "";
    passwordSpan.innerHTML = "";
}
