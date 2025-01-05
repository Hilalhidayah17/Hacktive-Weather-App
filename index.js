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

    document.getElementById(
      "current-temperature"
    ).innerText = `${data.current.temperature_2m}°C`;

    // Daily forecast
    const forecast = document.getElementsByClassName("forecast");
    data.daily.forEach((e) => {
      forecast += `<div class="day">
          <p>Mon</p>
          <img src="" alt="weather" />
          <p>33&deg; / 27&deg;</p>
        </div>
        <div class="day">
          <p>Tue</p>
          <img src="" alt="weather" />
          <p>32&deg; / 27&deg;</p>
        </div>
        <div class="day">
          <p>Wed</p>
          <img src="" alt="weather" />
          <p>32&deg; / 27&deg;</p>
        </div>
        <div class="day">
          <p>Thu</p>
          <img src="" alt="weather" />
          <p>32&deg; / 27&deg;</p>
        </div>
        <div class="day">
          <p>Fri</p>
          <img src="" alt="weather" />
          <p>33&deg; / 27&deg;</p>
        </div>
        <div class="day">
          <p>Sat</p>
          <img src="" alt="weather" />
          <p>32&deg; / 27&deg;</p>
        </div>`;
    });
  } catch (error) {
    console.error(error);
  }
}

// fetchData();
