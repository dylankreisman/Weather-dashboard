var cityName = document.querySelector(".cityname")
var cityEl = document.getElementById('city-search')

// finding results for current city info for weather
function getCurrent(e) {
    e.preventDefault()
// making values for city 
    var city = cityEl.value
    console.log(city)
var apiKey = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=58fb14ad5370b87fc70f19a964d8ea8c&units=imperial"
cityName.textContent = city

//fetching data
fetch(apiKey)
.then(res => res.json())
.then(data => {
    console.log(data)
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+data.coord.lat+'&lon='+data.coord.lon+'&appid=58fb14ad5370b87fc70f19a964d8ea8c&units=imperial')
    .then(res2 => res2.json())
    //adding in current weather data attributes
    .then(data2 => {
        document.querySelector('.tempcurrent').textContent = "Temperature: " + data2.daily[0].temp.day
        console.log(data2)
        document.querySelector('.wind').textContent = "Wind Speed: " + data2.daily[0].wind_speed
        document.querySelector('.humidity').textContent = "Humidity: " + data2.daily[0].humidity + "%"
        document.querySelector('.uv-index').textContent = "UV Index: " + data2.daily[0].uvi
    })
})
}


var search = document.getElementById('submitBtn')
search.addEventListener('click', getCurrent)


//q={city name}