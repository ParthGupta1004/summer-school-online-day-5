const apiKey = '64b28145d78b4af4a66104856250907';

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const useFahrenheit = document.getElementById("unitToggle").checked;

  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultDiv.textContent = " Unable to fetch weather.";
      } else {
        const temp = useFahrenheit ? data.current.temp_f : data.current.temp_c;
        const unit = useFahrenheit ? "°F" : "°C";
        const condition = data.current.condition.text;
        resultDiv.innerHTML = `🌡️ ${temp}${unit}<br>${condition}`;
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.textContent = " Error fetching weather.";
    });
});