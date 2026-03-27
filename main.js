const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const apikey="f128ee3cc0d07cdd63f5d8f900587f39";
const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const weathericon=document.querySelector(".weathericon");

async function getweather(city){
    const response=await fetch(apiurl +city+`&appid=${apikey}`);
   if(response.status==404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
    return;
   }
   else{
     document.querySelector(".error").style.display="none";
    document.querySelector(".weather").style.display="block";
   }



    var data=await response.json();
   console.log(data);


document.querySelector(".city").innerHTML=data.name;
document.querySelector(".weather-heading").innerHTML=data.main.temp+"°C";
document.querySelector(".humidity-para").innerHTML=data.main.humidity+"%";
document.querySelector(".wind-para").innerHTML=data.wind.speed+"km/h";


if(data.weather[0].main==="Clouds"){
    weathericon.src="clouds.png";
}

else if(data.weather[0].main==="Clear"){
    weathericon.src="clear.png";
}

else if(data.weather[0].main==="Drizzle"){
    weathericon.src="drizzle.png";
}

else if(data.weather[0].main==="Mist"){
    weathericon.src="mist.png";
}

else if(data.weather[0].main==="Rain"){
    weathericon.src="rain.png";
}

else if(data.weather[0].main==="Snow"){
    weathericon.src="snow.png";
}
 
}
searchbtn.addEventListener("click",()=>{
    getweather(searchbox.value);


})


