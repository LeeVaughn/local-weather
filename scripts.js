const API_KEY = "25a6ca31843cdb2c119eb1f9147a9776";
let celsius = false;
let weatherData;

function displayTemp(fTemp, c) {
	if (c) return Math.round((fTemp - 32) * (5 / 9)) + " C";
	return Math.round(fTemp) + " F";
}

function render(weatherData, celsius) {
	const currentLocation = weatherData.name;
	const currentIcon = weatherData.weather[0].icon;
	const currentWeather = weatherData.weather[0].description;
	const currentTemp = displayTemp(weatherData.main.temp, celsius);
	const highTemp = displayTemp(weatherData.main.temp_max, celsius);
	const lowTemp = displayTemp(weatherData.main.temp_min, celsius);
	const iconSrc = `https://openweathermap.org/img/w/${currentIcon}.png`;

	$("#currentLocation").html(currentLocation);
	$("#currentIcon").html(`<img src=${iconSrc}>`);
	$("#currentWeather").html(currentWeather);
	$("#currentTemp").html(currentTemp);
	$("#highTemp").html(`High: ${highTemp}`);
	$("#lowTemp").html(`Low: ${lowTemp}`);

	// Changes HTML background image and .main-header and .display background color based on current weather icon
	if (currentIcon == "01d") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/clear-sun.jpg)")
		$(".main-header").css("background", "rgba(223, 89, 8, 0.75)")
		$(".display").css("background", "rgba(223, 89, 8, 0.75)")
	} else if (currentIcon == "01n") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/clear-moon.jpg)")
		$(".main-header").css("background", "rgba(8, 96, 156, 0.75)")
		$(".display").css("background", "rgba(8, 96, 156, 0.75)")
	} else if (currentIcon == "02d" || currentIcon == "03d" || currentIcon == "04d") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/cloudy-day.jpg)")
		$(".main-header").css("background", "rgba(41, 90, 231, 0.75)")
		$(".display").css("background", "rgba(41, 90, 231, 0.75)")
	} else if (currentIcon == "02n" || currentIcon == "03n" || currentIcon == "04n") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/cloudy-night.jpg)")
		$(".main-header").css("background", "rgba(2, 30, 115, 0.75)")
		$(".display").css("background", "rgba(2, 30, 115, 0.75)")
	} else if (currentIcon == "09d" || currentIcon == "10d" || currentIcon == "11d" || currentIcon == "09n" || currentIcon == "10n" || currentIcon == "11n") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/rain.jpg)")
		$(".main-header").css("background", "rgba(59, 64, 77, 0.75)")
		$(".display").css("background", "rgba(59, 64, 77, 0.75)")
	} else if (currentIcon == "13d" || currentIcon == "13n") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/snow.jpg)")
		$(".main-header").css("background", "rgba(105, 128, 195, 0.75)")
		$(".display").css("background", "rgba(105, 128, 195, 0.75)")
	} else if (currentIcon == "50d" || currentIcon == "50n") {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/mist.jpg)")
		$(".main-header").css("background", "rgba(105, 128, 195, 0.75)")
		$(".display").css("background", "rgba(105, 128, 195, 0.75)")
	} else {
		$("html").css("background-image", "url(https://regularlyscheduledprogrammingblog.files.wordpress.com/2018/01/global-weather.jpg)")
		$(".main-header").css("background", "rgba(2, 30, 115, 0.75)")
		$(".display").css("background", "rgba(2, 30, 115, 0.75)")
	}

}

$(function () {
	// let location;
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			$.getJSON(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${API_KEY}`, function (apiData) {
				weatherData = apiData;

				render(weatherData, celsius);

				$("#toggle").click(function () {
					celsius = !celsius;
					render(weatherData, celsius);
				})
			});
		});
	}
})
