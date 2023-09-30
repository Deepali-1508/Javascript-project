//fetch
const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]");
const grantAccessContainer = document.querySelector("[data-grantAccess]")
const errorContainer = document.querySelector("[data-errorContainer]")
const loadingContainer = document.querySelector("[data-errorContainer]");

const userInfoContainer = document.querySelector('.user-info-container');
const  errorMsg = document.querySelector("[data-errorMsg]")
const grantAccessButton = document.querySelector("[data-grantAccessBtn]")
const searchButton = document.querySelector("[data-searchButton]")
const searchInput = document.querySelector("[data-searchInput]");
const searchForm = document.querySelector("[data-searchForm]");

const API_KEY = "177277a694600d27e4f8247587207e27";

let currentTab = userTab;
currentTab.classList.add("currentTab");
getFromSessionStorage();

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
   // console.log("localCoordinates ",localCoordinates);
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }

   else{
     const coordinates = JSON.parse(localCoordinates);
   //  console.log("json.parse coordinates ", coordinates);
     getUserWeatherInfo(coordinates);
   }
}

async function  getUserWeatherInfo(coordinates){
    const {latitude ,longitude} = coordinates;
    loadingContainer.classList.add("active")
    errorContainer.classList.remove("active")

    // console.log("coordinates ",coordinates)
    // console.log("latitude ",latitude);
    // console.log("longitude ",longitude);

    try{
       const  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
       const  data = await response.json();
       loadingContainer.classList.remove('active');

       if(data?.cod === "404"){
        errorContainer.classList.add("active")
        userInfoContainer.classList.remove("active");
        errorMsg.innerText = data.message ? data.message : "" ? data.message : "";
    }
    else{
       userInfoContainer.classList.add('active');
       grantAccessContainer.classList.remove('active');

       renderWeatherInfo(data);
    }

    }catch(error){
      loadingContainer.classList.remove("active");
      errorContainer.classList.add("active");
      userInfoContainer.classList.remove("active");
      errorMsg.innerText = data.message ? data.message : "";   
    }   
}   


function renderWeatherInfo(weatherInfo){    
    console.log("weather info",weatherInfo)
    const cityName = document.querySelector("[data-cityName]");
    const countryFlag = document.querySelector("[data-countryFlagIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temperature = document.querySelector("[data-temperature]");

    const windSpeed = document.querySelector("[data-windSpeed]");
    const cloudSpeed = document.querySelector("[data-clouds]");
    const humiditySpeed = document.querySelector("[data-humidity]");

    //fetch values
   // console.log(`${weatherInfo?.sys?.country.toLowerCase()}`)
    cityName.innerText = weatherInfo?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather?.[0]?.description ;
    weatherIcon.src = ` http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temperature.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humiditySpeed.innerText =`${weatherInfo?.main?.humidity}%`;
    cloudSpeed.innerText = `${weatherInfo?.clouds?.all}%`;
    
}   



function switchTab(clickedTab){

    if(clickedTab === currentTab){
        return;
     }

    currentTab.classList.remove("currentTab");
    clickedTab.classList.add("currentTab");
    currentTab = clickedTab; 
    errorContainer.classList.remove("active")
    loadingContainer.classList.remove("active");

    if(!searchForm.classList.contains("active")){
        searchForm.classList.add("active");
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active")
    }
    else{
        
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getFromSessionStorage();
    }
}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    loadingContainer.classList.add("active");
    // console.log("search tab clicked",loadingContainer.classList)
    switchTab(searchTab);
})

 function showPosition(position){
    console.log("hjk")
   const userCoordinates = {
    latitude : position.coords.latitude,
    longitude : position.coords.longitude,
   }
   console.log(userCoordinates)
   sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
   getUserWeatherInfo(userCoordinates);

}


function getLocation(){
    console.log("getloaction")
    console.log(navigator.geolocation)
    if(navigator.geolocation){
      console.log("heading",navigator.geolocation.getCurrentPosition(showPosition))
      navigator.geolocation.getCurrentPosition(showPosition)
}
    else
      grantAccessContainer.classList.remove("active");
     
}

grantAccessButton.addEventListener("click", getLocation);
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("search button clickd")
    let cityName = searchInput.value;
    if(cityName ==="") return;
    else
      fetchSearchWeatherInfo(cityName);
    
})


async function fetchSearchWeatherInfo(city){
    loadingContainer.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    errorContainer.classList.remove("active")


    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    loadingContainer.classList.remove("active");

    try {
        console.log("data in else ",data);
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        console.log("data ",data);
        errorContainer.classList.add("active")
        userInfoContainer.classList.remove("active");
        errorMsg.innerText = data.message ? data.message : "";

    }
}

