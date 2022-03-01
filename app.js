const API_KEY = `a49f9fae9314178d4f75f686992f9976`;
const searchTemparature = () => {
  const city = document.getElementById("city-name").value;
  document.getElementById("city-name").value = "";
  if (city !== "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayWeather(data);
      });
  }
};
const setinnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};
const displayWeather = (data) => {
  setinnerText("city", data.name);
  setinnerText("temperature", data.main.temp);
  setinnerText("condition", data.weather[0].main);
  const url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const imgIcon = document.getElementById("weather-icon");
  imgIcon.setAttribute("src", url);
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=a49f9fae9314178d4f75f686992f9976`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          displayWeather(data);
          farenheitToCelsius(data);
        });
    });
  }
});

const farenheitToCelsius = (data) => {
  let temperatureDegree = document.getElementById("temperature");
  let temperatureSpan = document.getElementById("change-temp");
  let temperatureSection = document.getElementById("temp-section");
  const { temp } = data.main;
  temperatureDegree.textContent = temp;
  let farenheit = temp * 1.8 + 32;
  //Change temperature Farenheit/Celsius
  temperatureSection.addEventListener("click", () => {
    if (temperatureSpan.textContent === "°C") {
      temperatureSpan.textContent = "°F";
      temperatureDegree.textContent = Math.floor(farenheit);
    } else {
      temperatureSpan.textContent = "°C";
      temperatureDegree.textContent = temp;
    }
  });
};
