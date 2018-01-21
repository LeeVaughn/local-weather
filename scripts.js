var API_KEY = "25a6ca31843cdb2c119eb1f9147a9776";
var celsius = false;
var weatherData;

function displayTemp(fTemp, c) {
	if (c) return Math.round((fTemp - 32) * (5 / 9)) + " C";
	return Math.round(fTemp) + " F";
}

function render(weatherData, celsius) {
	var currentLocation = weatherData.name;
	var currentIcon = weatherData.weather[0].icon;
	var currentWeather = weatherData.weather[0].description;
	var currentTemp = displayTemp(weatherData.main.temp, celsius);
	var highTemp = displayTemp(weatherData.main.temp_max, celsius);
	var lowTemp = displayTemp(weatherData.main.temp_min, celsius);
	var iconSrc = "https://openweathermap.org/img/w/" + currentIcon + ".png";

	$("#currentLocation").html(currentLocation);
	$("#currentIcon").html("<img src=" + iconSrc + ">");
	$("#currentWeather").html(currentWeather);
	$("#currentTemp").html(currentTemp);
	$("#highTemp").html("High: " + highTemp);
	$("#lowTemp").html("Low: " + lowTemp);
}

$(function () {
	var location;
	var long;
	var lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			$.getJSON("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + long + "&appid=" + API_KEY, function (apiData) {
				weatherData = apiData;

				render(weatherData, celsius);

				$("#toggle").click(function () {
					celsius = !celsius;
					render(weatherData, celsius);
				})
			})
		})
	}
})
