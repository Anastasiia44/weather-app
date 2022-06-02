let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let date = document.querySelector("#now");
date.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  console.log(response);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = ` Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = ` Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#current_weather_emoji").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "5fac1c82a1b209a04fbd8df775e5cf4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5fac1c82a1b209a04fbd8df775e5cf4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showCurrentLocation);

searchCity("Kyiv");