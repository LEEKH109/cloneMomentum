const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "a1d84556413e1399ed622b1de10632ce";

function onGeoOk(position) {
  //   const lat = position.coords.latitude;
  //   const lon = position.coords.longitude;
  const dummyLat = 37.501011387090216;
  const dummyLon = 127.03649451241095;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${dummyLat}&lon=${dummyLon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you :(.");
}
onGeoOk();
// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
