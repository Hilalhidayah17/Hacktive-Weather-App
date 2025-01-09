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
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind size-7 mr-2  " viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>${data.current.wind_speed_10m} km/h`;

    document.getElementById(
      "humidity"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture size-7 mr-2" viewBox="0 0 16 16">
  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
</svg> ${data.current.relative_humidity_2m}%`;

    const currentInfo = data.current.is_day === 0 ? "night" : "day";

    document.querySelector("#current-icon").src =
      code[data.current.weather_code][currentInfo].image;

    document.getElementById("main-container").style.background = `url(${
      code[data.current.weather_code][currentInfo].atmosphere
    }) no-repeat center/cover`;

    // Daily forecast
    let forecast = document.getElementById("forecast");
    forecast.innerHTML = "";
    data.daily.time.forEach((e, index) => {
      const dateForecast = new Date(e);
      const day = days[dateForecast.getDay()];
      const weatherCode = data.daily.weather_code[index];

      const maxTemp = data.daily.temperature_2m_max[index];

      forecast.innerHTML += `<div
          class="flex flex-col items-center justify-center text-center text-[0.9rem] text-[#333] bg-white/10
backdrop-blur-lg p-2 rounded-lg w-[100px] mix-blend-difference "
        >
          <p class="text-white">${day}</p>
          <img
            src="${code[weatherCode][currentInfo].image}"
            alt="weather"
            class="w-10 h-10 my-2"
          />
          <p class="text-white">${maxTemp}°C</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}
