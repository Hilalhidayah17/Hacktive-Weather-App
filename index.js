async function fetchData() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=3.5833&longitude=98.6667&current=temperature_2m&daily=temperature_2m_max&timezone=Asia%2FBangkok&forecast_days=7"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// fetchData();
