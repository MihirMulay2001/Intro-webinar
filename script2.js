function currentForecast(props){
    document.getElementById('temperature').innerHTML = `${props.temp} ℉` ;
    //document.getElementById('feels_temperature').innerHTML = ` Feels Like ${props.feels_like}`;
    WeatherConditions(props);
    const item = { sunrise : props.sunrise , sunset : props.sunset } ;
    SunTime(item);
    otherInfo(props);
}


function WeatherConditions(props){
    for(prop of props.weather){
        let img1 = document.createElement('img');
        img1.alt= "image not available"; 
        img1.className = "WeatherIcon" ;
        img1.src = `http://openweathermap.org/img/wn/${prop.icon}@2x.png` ;
        let span1 = document.createElement('span');
        span1.appendChild(img1);
        let span2 = document.createElement('span');
        span2.innerHTML = prop.description.toUpperCase();
        let div = document.createElement('div');
        div.appendChild(span1);
        div.appendChild(span2);
        document.getElementById('WeatherConditions').appendChild(div);
    }
}


function SunTime(props){
  let suntime = document.createElement('div') ;
  suntime.className = "row";
  for(const [name,value] of Object.entries(props)){
    const date = new Date(value*1000);
    const time = date.getHours() >= 12 ? "pm" : "am";
    const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12
    const mins = date.getMinutes()
    const seconds = date.getSeconds()
    let icon = document.createElement('i');
    icon.innerHTML= "";
    icon.style.fontSize = "25px";
    if(name === "sunrise"){
        icon.className = "far fa-sun" ;
        icon.style.color = "#c2bf1f";
    }
    else { 
        icon.className = "far fa-moon"; 
    }
    let span1 = document.createElement('span');
    span1.id="sunTime2" ;
    span1.appendChild(icon);
    span1.innerHTML += `${hours}:${mins}:${seconds} ${time}` ;
    let div = document.createElement('div');
    div.className = "col-lg-6 col-xs-6" ;
    div.appendChild(span1);
    suntime.appendChild(div);
  }
  document.getElementById('Suntime').appendChild(suntime) ;
}


function otherInfo(props){
    document.getElementById('clouds').innerHTML = `Clouds : ${props.clouds} %` ;
    document.getElementById('windSpeed').innerHTML =`Wind Speed : ${props.wind_speed} m/s ` ;
    document.getElementById('humidity').innerHTML = `Humidity: ${props.humidity || "-"} %`;
    document.getElementById('visibility').innerHTML = `Visibility: ${props.visibility || "-" }`;
    document.getElementById('pressure').innerHTML = `Pressure: ${props.pressure || "-"}`;
    document.getElementById('dewPoint').innerHTML = `Dew Point: ${props.dew_point || "-"}`;
}

function mainScript(){
    let stringL = decodeURIComponent(window.location.search)
    stringL = stringL.substring(1);
    let arr = [];
    arr = stringL.split('&');
    console.log(arr);
    const latitude = parseFloat(arr[0].substring(9));
    const longitude = parseFloat(arr[1].substring(10));
    console.log(latitude, longitude);

    const key = '8cb5fdbe8d2e6dbc9947724015ece51b';
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${key}`)
    .then(res => res.json())
    .then( data => {
      console.log("data" , data);
      currentForecast(data.current);
    })
    .catch(err => { console.log(err , 'occured');})
    

}