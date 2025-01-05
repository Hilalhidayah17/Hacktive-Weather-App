async function fetchData() {
  try {
    const city = document.getElementById("search-location").value;
    const responseLocation = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    const dataLocation = await responseLocation.json();

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${dataLocation.results[0].latitude}&longitude=${dataLocation.results[0].longitude}&current=temperature_2m&daily=temperature_2m_max&timezone=Asia%2FBangkok&forecast_days=7`
    );
    const data = await response.json();
    console.log(dataLocation.results[0].name);

    // current temperature
    document.getElementById(
      "city"
    ).innerText = `${dataLocation.results[0].name}`;
    document.getElementById(
      "current-temperature"
    ).innerText = `${data.current.temperature_2m}°C`;

    // Daily forecast
    let forecast = document.getElementById("forecast");
    data.daily.time.forEach((e, index) => {
      const day = e;
      const maxTemp = data.daily.temperature_2m_max[index];
      forecast.innerHTML += `<div class="day">
          <p>${day}</p>
          <img src="" alt="weather" />
          <p>${maxTemp};</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}
