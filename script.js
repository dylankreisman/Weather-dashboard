var cityName = document.querySelector("#cityname")
var cityEl = document.getElementById('city-search')
var cityArray = ['']


// finding results for current city info for weather
function getCurrent(e) {
    // e.preventDefault()
    // making values for city 
    var city = cityEl.value
    console.log(city)
    var apiKey = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=58fb14ad5370b87fc70f19a964d8ea8c&units=imperial"
    var currentTime = moment().format('M/DD/YYYY')
    cityName.textContent = city + '          ' + currentTime

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
// getting the values of the following five days with style attributes
function getFuture(forecast) {
    let forecastCard = document.createElement('div')
    let domDiv = document.getElementById('fiveDay')

    forecastCard.setAttribute('class', 'd-flex flex-row justify-content-center')
    //creating a for loop to show the following five day forecast
    for (i = 1; i < 6; i++) {
        let unixTime = forecast[i].dt * 1000
        let regTime = moment(unixTime).format('M/DD/YYYY')

        let date = document.createElement('ul')
        date.innerHTML = regTime

        date.setAttribute('class',
            'card d-inline-flex flex-column m-4 p-3 list-unstyled'
        )

        forecastCard.appendChild(date)

        let condition = document.createElement('li')
        condition.innerHTML = forecast[i].weather[0].description
        date.appendChild(condition)

        let windNew = document.createElement('li')
        windNew.innerHTML = forecast[i].wind_speed + ' MPH'
        date.appendChild(windNew)

        let tempNew = document.createElement('li')
        tempNew.innerHTML = forecast[i].temp.day + "°F"
        date.appendChild(tempNew)

        let humidNew = document.createElement('li')
        humidNew.innerHTML = forecast[i].humidity + '%'
        date.appendChild(humidNew)

    }

    domDiv.appendChild(forecastCard)

}

//event listener at the ID button to run function once clicked
var search = document.getElementById('submitBtn')
search.addEventListener('click', (e) => {
    e.preventDefault()
    getCurrent()
})

function citiesStored() {
     
}

