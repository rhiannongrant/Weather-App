// title date and time

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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decemeber",
];
let month = months[now.getMonth()];
let boop = now.getDate();
let fullYear = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let sentence = `${day}, ${month} ${boop}, ${fullYear} at ${hour}:${minute}`;
let subtitle = document.querySelector("p#subtitle");
subtitle.innerHTML = sentence;

document.querySelector("#sub-sub-title").innerHTML = `${day}`;

//change units

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".unit");
  fahrenheit.innerHTML = `°F`;
}
let fahrenheitUnit = document.querySelector("#fahrenheit-units");
fahrenheitUnit.addEventListener("click", convertToFahrenheit);

function unitToF(event) {
  event.preventDefault();
  let actualNumber = document.querySelector("#temperature");
  let unit = actualNumber.innerHTML;
  unit = Number(unit);
  actualNumber.innerHTML = Math.round((unit * 9) / 5 + 32);
}
let fahrenheitBits = document.querySelector("#fahrenheit-units");
fahrenheitBits.addEventListener("click", unitToF);

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".unit");
  celsius.innerHTML = `°C`;
}
let celsiusUnit = document.querySelector("#celsius-units");
celsiusUnit.addEventListener("click", convertToCelsius);

function unitToC(event) {
  event.preventDefault();
  let actualNumber = document.querySelector("#temperature");
  let unit = actualNumber.innerHTML;
  unit = Number(unit);
  actualNumber.innerHTML = Math.round(((unit - 32) * 5) / 9);
}
let celsiusBits = document.querySelector("#celsius-units");
celsiusBits.addEventListener("click", unitToC);

// change temperature

function showWeather(response) {
  document.querySelector("#sub-information").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML =
    response.data.main.feels_like;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  console.log(response);

  let vibes = response.data.main.temp;

  if (vibes > 21)
    document.querySelector("#vibes").innerHTML = "Remember your SPF! ☀";

  if (vibes < 21)
    document.querySelector("#vibes").innerHTML = "You will need a jacket!";
}

function selectCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-result").value;
  let apiKey = "5d6ccea11b20e8de9615fa5ff7430272";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
  console.log(Response);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", selectCity);

function showPosition(position) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "5d6ccea11b20e8de9615fa5ff7430272";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.longitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=metric`;
  console.log(position);
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

document
  .querySelector("#currentLocation")
  .addEventListener("click", getCurrentLocation);
