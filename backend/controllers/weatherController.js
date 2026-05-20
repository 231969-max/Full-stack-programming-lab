const axios = require("axios");

// Deterministic simulation generator based on city name for keyless fallbacks
const getSimulatedWeather = (city) => {
    const cityName = city.trim();
    // Sum char codes to create a deterministic hash
    const hash = cityName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const conditions = ["Sunny", "Cloudy", "Rainy", "Overcast", "Clear", "Drizzle", "Snowy", "Windy"];
    const condition = conditions[hash % conditions.length];
    
    // Deterministic temp based on city name length and hash
    let baseTemp = 15 + (hash % 15); // 15 to 30
    if (cityName.length % 2 === 0) baseTemp -= 8; // Adjust range to include cold climates

    const humidity = 40 + (hash % 50); // 40% to 90%
    const windSpeed = (2.5 + (hash % 15)).toFixed(1); // m/s
    const feelsLike = (baseTemp + (condition === "Rainy" || condition === "Windy" ? -2 : 1)).toFixed(1);

    return {
        cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase(),
        temp: parseFloat(baseTemp.toFixed(1)),
        condition: condition,
        humidity: humidity,
        windSpeed: parseFloat(windSpeed),
        feelsLike: parseFloat(feelsLike),
        isSimulated: true
    };
};

exports.getWeatherByCity = async (req, res) => {
    // Read city from query parameters or route params
    const city = req.query.city || req.params.city;

    if (!city) {
        return res.status(400).json({ message: "City name parameter is required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    // If API key is provided, attempt OpenWeather API call
    if (apiKey && apiKey !== "YOUR_OPENWEATHER_API_KEY") {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
            const response = await axios.get(url);
            
            const data = response.data;
            return res.json({
                cityName: data.name,
                temp: data.main.temp,
                condition: data.weather[0].main,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                feelsLike: data.main.feels_like,
                isSimulated: false
            });
        } catch (error) {
            console.warn("OpenWeather API query failed, falling back to simulator:", error.message);
            // If the city was not found, return 404
            if (error.response && error.response.status === 404) {
                return res.status(404).json({ message: `City '${city}' not found in weather registry` });
            }
            // Other errors fall back to deterministic simulator
        }
    }

    // Default high-fidelity simulated response
    const mockData = getSimulatedWeather(city);
    return res.json(mockData);
};
