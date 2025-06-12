"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainWeatherCard from "./components/MainWeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import TodayHighlights from "./components/TodayHighlights";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // تابع تنظیم کلاس تم بر اساس وضعیت آب‌وهوا یا دارک مود
  const updateTheme = (mainCondition) => {
    if (darkMode) {
      document.body.className = "dark-mode";
      return;
    }

    switch (mainCondition?.toLowerCase()) {
      case "clear":
        document.body.className = "sunny-theme";
        break;
      case "rain":
      case "drizzle":
      case "thunderstorm":
        document.body.className = "rainy-theme";
        break;
      case "clouds":
        document.body.className = "cloudy-theme";
        break;
      case "snow":
        document.body.className = "snowy-theme";
        break;
      default:
        document.body.className = "default-theme";
    }
  };

  const fetchAirQualityData = async (lat, lon) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(response.data.list[0]);
    } catch (err) {
      console.error("Error fetching air quality:", err);
      setError("Error fetching air quality.");
    }
  };

  const fetchWeatherData = async (cityName) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch weather data");

      setWeatherData(data);
      setCity(cityName);
      setCondition(data.weather[0]?.main || null);
      updateTheme(data.weather[0]?.main);

      await fetchAirQualityData(data.coord.lat, data.coord.lon);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastRes.data);
    } catch (err) {
      console.error("ERROR:", err.message);
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to fetch weather by coords");

      setWeatherData(data);
      setCity(`${data.name}`);
      setCondition(data.weather[0]?.main || null);
      updateTheme(data.weather[0]?.main);

      await fetchAirQualityData(lat, lon);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastRes.data);
    } catch (err) {
      console.error("Error with geolocation weather:", err.message);
      setError("Failed to fetch location weather.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (input) => {
    if (typeof input === "string") {
      await fetchWeatherData(input);
    } else if (typeof input === "object" && input.lat && input.lon) {
      await fetchWeatherByCoords(input.lat, input.lon);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [darkMode]);

  return (
    <Box>
      <Navbar
        onSearch={handleSearch}
        onToggleDark={() => {
          setDarkMode(!darkMode);
          updateTheme(condition);
        }}
        darkMode={darkMode}
      />

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
          <Typography mt={2}>Loading...</Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      )}

      {weatherData && airQualityData && (
        <Box display="flex" p={4} gap={4} flexWrap="wrap">
          <Box flex={1} minWidth="300px">
            <MainWeatherCard weatherData={weatherData} darkMode={darkMode}/>

            <Typography variant="h6" fontWeight="bold" mt={3}>
              5 Days Forecast
            </Typography>

            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast}  darkMode={darkMode}
  weatherMain={weatherData?.weather?.[0]?.main} />
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            flex={0.5}
            minWidth="300px"
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WeatherDashboard;
