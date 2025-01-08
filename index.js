async function fetchData() {
  try {
    const city = document.getElementById("search-location").value;
    const responseLocation = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    const dataLocation = await responseLocation.json();

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${dataLocation.results[0].latitude}&longitude=${dataLocation.results[0].longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,wind_speed_10m_max`
    );
    const data = await response.json();
    console.log(data);
    // current temperature
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
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
      "December",
    ];

    const date = new Date();
    const dayName = days[date.getDay()];
    const dateNumber = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    document.getElementById("temperature").style.display = `block`;
    document.getElementById("params").style.display = `block`;

    document.getElementById(
      "city"
    ).innerText = `${dataLocation.results[0].name}`;

    document.getElementById(
      "current-time"
    ).innerHTML = `${dayName},${dateNumber} ${monthName} ${year}`;

    document.getElementById(
      "current-temperature"
    ).innerText = `${data.current.temperature_2m}°C`;

    document.getElementById(
      "wind-speed"
    ).innerText = `💨${data.current.wind_speed_10m} km/h`;

    const currentInfo = data.current.is_day === 0 ? "night" : "day";

    document.querySelector("#current-icon").src =
      code[data.current.weather_code][currentInfo].image;

    // Daily forecast
    let forecast = document.getElementById("forecast");
    forecast.innerHTML = "";
    data.daily.time.forEach((e, index) => {
      const dateForecast = new Date(e);
      const day = days[dateForecast.getDay()];
      const weatherCode = data.daily.weather_code[index];

      const maxTemp = data.daily.temperature_2m_max[index];
      document.getElementById(
        "main-container"
      ).style.background = `url(${code[weatherCode][currentInfo].atmosphere}) no-repeat center/cover`;
      forecast.innerHTML += `<div
          class="flex flex-col items-center justify-center text-center text-[0.9rem] text-[#333] bg-white/10
backdrop-blur-lg p-2 rounded-lg w-[100px]"
        >
          <p>${day}</p>
          <img
            src="${code[weatherCode][currentInfo].image}"
            alt="weather"
            class="w-10 h-10 my-2"
          />
          <p>${maxTemp}°C</p>
        </div>
      `;
      console.log(code[weatherCode][currentInfo].atmosphere);
    });
  } catch (error) {
    console.error(error);
  }
}
