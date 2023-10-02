

// Octokit.js
// https://github.com/octokit/core.js#readme
// const octokit = new Octokit({
//     auth: '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'
//   })
  
//   await octokit.request('GET /users/{username}', {
//     username: 'USERNAME',
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })

//   https://api.github.com/users/Deepali-1508
//Authorization Bearer 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
//Accept application/vnd.github+json
// 'X-GitHub-Api-Version': '2022-11-28'

const APIURL = "https://api.github.com/users/";
const getUser = async (user) => {
    const response = await fetch(APIURL + user);
    const data = await response.json();
    return data;
    }
    getUser("Deepali-1508").then((data) => console.log(data));


    //take input from user through form 
    //when search button is clicked run serachUser function
    //fetch data from github api
   //display data in the UI 

   const searchUserForm = document.querySelector("[data-searchUserForm]");
   const searchUserInput = document.querySelector("[data-searchUserInput]");

   const userImg = document.querySelector("[data-userImg]");
   const userName = document.querySelector("[data-userName]");
   const joinedDate = document.querySelector("[data-joinedDate]");
   const accountLink = document.querySelector("[data-userAccountLink]");
   const userBio = document.querySelector("[data-userBio]");
   const repos = document.querySelector("[data-userRepos]");
   const followers = document.querySelector("[data-userFollowers]");
    const following = document.querySelector("[data-userFollowing]");
    const userLocation = document.querySelector("[data-userLocation]");
    const twitter = document.querySelector("[data-userTwitter]");
    const website = document.querySelector("[data-userWebsite]");
    const company = document.querySelector("[data-userCompany]");

    const errorContainer = document.querySelector("[data-errorContainer]");

    fetchUserData("Deepali-1508");

    searchUserForm.addEventListener("submit" , (e)=>{
        e.preventDefault();
        const userName = searchUserInput.value;
        console.log("userName ",userName);
        fetchUserData(userName);
    })

    async function fetchUserData(userName){
        console.log("inside fetchUserData");
        const response = await fetch(APIURL + userName);
        const data = await response.json();
        console.log("data ",data);
        if(data.message === "Not Found"){
            // errorContainer.classList.add("active");
             console.log("not found")
        }
        else{
            // errorContainer.classList.remove("active");
            console.log("inside else fecchUserData");
            renderUserData(data);
        }
    }

    function renderUserData(user){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        console.log("inside renderUserData");
       userImg.src = user.avatar_url;
       userName.innerText = user.name;
       userBio.innerText = user.bio;

       const date = new Date(user.created_at);
        joinedDate.innerText = `Joined ${date.toLocaleDateString(undefined, options)}`;
   
       accountLink.href = user.html_url;
       accountLink.innerText = user.login;
       repos.innerText = user.public_repos;
       followers.innerText = user.followers;
       following.innerText = user.following;

       userLocation.innerText = user.location ? user.location : "Not Available";
       twitter.innerText = user.twitter_username ? user.twitter_username : "Not Available";
       
       website.href = user.blog ? user.blog : "#"; 
       website.textContent = website.href!=="#" ? "website" : "Not Available";
       company.innerText = user.company ? user.company : "Not Available";
    
       company.style.color = company.textContent === "Not Available" ? "gray" : "rgb(170,180,200";
       userLocation.style.color = userLocation.textContent === "Not Available" ? "gray" : "rgb(170,180,200)";
       twitter.style.color = twitter.textContent === "Not Available" ? "gray" : "rgb(170,180,200)";
       website.style.color = website.textContent === "Not Available" ? "gray" : "rgb(170,180,200";
    
    }

    //change mode 
    const modeChangeBtn = document.querySelector("[data-modeButton]");
    const modeIcon = document.querySelector("[data-modeIcon]")
    modeChangeBtn.addEventListener("click" , ()=>{
     console.log("modeChangeBtn clicked");
     console.log("modeChangeBtn ",modeChangeBtn.classList);
        if(modeChangeBtn.classList.contains("dark")){
           modeChangeBtn.classList.add("light");
           modeChangeBtn.classList.remove("dark");
           //change mode icon from assets
           modeIcon.src ="./assets/night-mode.png";
           changeLightMode();
        }
        else{
            modeChangeBtn.classList.remove("light");
            modeChangeBtn.classList.add("dark");
            modeIcon.src ="./assets/light-mode.png";
            changeDarkMode();
        }
    })

    const wrapper = document.querySelector(".wrapper");
    const nameContainer = document.querySelector(".name-container");
    const body = document.querySelector("body");
    const serachUserForm = document.querySelector(".search-user-form");
    const inputContainer = document.querySelector(".input-container");
    const userProfileContainer = document.querySelector(".user-profile-container");
    const userStatsContainer = document.querySelector(".user-stats-container");
    const input = document.querySelector(".input");

function changeDarkMode() {
    wrapper.classList.remove("light");
    nameContainer.classList.remove("light");
    body.classList.remove("light");
    serachUserForm.classList.remove("light");
    inputContainer.classList.remove("light");
    userProfileContainer.classList.remove("light");
    userStatsContainer.classList.remove("light");
    input.classList.remove("light");
}

function changeLightMode(){
    wrapper.classList.add("light");
    nameContainer.classList.add("light");
    body.classList.add("light");
    serachUserForm.classList.add("light");
    inputContainer.classList.add("light");
    userProfileContainer.classList.add("light");
    userStatsContainer.classList.add("light");
    input.classList.add("light");
}


