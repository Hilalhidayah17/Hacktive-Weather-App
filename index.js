async function fetchData() {
  try {
    const city = document.getElementById("search-location").value;

    const responseLocation = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    const dataLocation = await responseLocation.json();

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=3.5833&longitude=98.6667&current=temperature_2m&daily=temperature_2m_max&timezone=Asia%2FBangkok&forecast_days=7"
    );
    const data = await response.json();
    // console.log(data);
    console.log(dataLocation.results);
  } catch (error) {
    console.error(error);
  }
}

// fetchData();
