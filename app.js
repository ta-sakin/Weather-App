window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    let locationCountry = document.querySelector('.location-country');
    const temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=7eaa6bf3d5b4a121a71678acbfb9c9c5`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const {description} = data.weather[0];
                    const {country} = data.sys;
                    const {icon} = data.weather[0];
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    locationCountry.textContent = country;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                    // locationIcon.textContent = icn;
                    //Formula for farenheit to celsius
                    let celsius = (temp - 32) * (5 / 9);
                    //Change temperature Farenheit/Celsius
                    temperatureSection.addEventListener("click", () => {
                      if (temperatureSpan.textContent === "°F"){
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celsius);
                      }
                      else{
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = temp;
                      }
                    })
                  });
                });
              }
            });
