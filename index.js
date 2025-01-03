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
    console.log(data.current.temperature_2m);
  } catch (error) {
    console.error(error);
  }
}

// fetchData();
