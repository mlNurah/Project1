// Function to fetch and display weather information for a Bangladeshi city
function getWeather() {
    const city = document.getElementById("cityInput").value;  // Get user input for city name
    const apiKey = "75e98505e5c12ef80c0ed7e13073ccb4";  // Replace with your actual OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},BD&appid=${apiKey}&units=metric`;


    // Get the button element
    const button = document.querySelector("button");
    
    // Set button to loading state with spinner
    button.disabled = true;
    button.classList.add("loading");  // Add loading spinner

    // Fetching data from OpenWeather API
    fetch(url)
        .then(response => {
            console.log("API Response Status:", response.status);  // Log the response status
            return response.json();
        })
        .then(data => {
            console.log("API Response Data:", data);  // Log the API response data for debugging
            
            if (data.cod === 200) {
                document.getElementById("weatherResult").classList.remove("hidden");

                // Populate weather details in the app
                document.getElementById("cityName").innerText = `Weather in ${data.name}`;
                document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
                document.getElementById("description").innerText = `Feels like: ${data.weather[0].description}`;
                document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
                document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;

                // Update weather icon
                const icon = data.weather[0].icon;
                document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            } else {
                // If city is not found or another error occurs, show an alert with the error message
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);  // Log any network or fetch error
            alert("Oops! Something went wrong while retrieving data. Please try again later.");
        })
        .finally(() => {
            // Reset button after fetching data
            button.disabled = false;
            button.classList.remove("loading");
        });
}
