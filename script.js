var cityName = document.querySelector("#cityname")
var cityEl = document.getElementById('city-search')

// finding results for current city info for weather
function getCurrent(e) {
   // e.preventDefault()
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

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=58fb14ad5370b87fc70f19a964d8ea8c&units=imperial')
                .then(res2 => res2.json())
                //adding in current weather data attributes
                .then(data2 => {
                     document.querySelector('#tempcurrent').textContent = "Temperature: " + data2.daily[0].temp.day + "°F"
                    console.log(data2)
                    document.querySelector('#wind').textContent = "Wind Speed: " + data2.daily[0].wind_speed
                    document.querySelector('#humidity').textContent = "Humidity: " + data2.daily[0].humidity + "%"
                    document.querySelector('#uv-index').textContent = "UV Index: " + data2.daily[0].uvi
                    
                    getFuture(data2.daily)
                })
        })
}

function getFuture(forecast) {
let forecastCard = document.createElement('div')
let domDiv = document.getElementById('row')

    for (i = 1; i < 5; i++) {
        let unixTime = forecast[i].dt * 1000
        let regTime = moment(unixTime).format('M/DD/YYYY')
        
        let date = document.createElement('div')
        date.innerHTML = regTime
       forecastCard.appendChild(date)

        let condition = document.createElement('p')
        condition.innerHTML = forecast[i].weather[0].description 
        forecastCard.appendChild(condition)

        let windNew = document.createElement('p')
        windNew.innerHTML = forecast[i].wind_speed + ' MPH'
        forecastCard.appendChild(windNew)

        let tempNew = document.createElement('p')
        tempNew.innerHTML = forecast[i].temp.day + "°F"
        forecastCard.appendChild(tempNew)

        let humidNew = document.createElement('p')
        humidNew.innerHTML = forecast[i].humidity + '%'
        forecastCard.appendChild(humidNew)

    }
  
    domDiv.appendChild(forecastCard)

}


var search = document.getElementById('submitBtn')
search.addEventListener('click',(e) => {
    e.preventDefault() 
    getCurrent() })


