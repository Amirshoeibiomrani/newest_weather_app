'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';

const MainWeatherCard = ({ weatherData, darkMode }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;
  const weatherMain = weatherData?.weather?.[0]?.main?.toLowerCase() || '';

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (weatherMain.includes("thunderstorm")) {
      return <ThunderstormIcon sx={{ fontSize: '3rem', color: '#FFD700', ml: 1 }} />;
    } else if (weatherMain.includes("rain")) {
      return <GrainIcon sx={{ fontSize: '3rem', color: '#4FC3F7', ml: 1 }} />;
    } else if (temperatureCelsius > 23) {
      return <WbSunnyIcon sx={{ fontSize: '3rem', color: 'orange', ml: 1 }} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon sx={{ fontSize: '3rem', color: 'skyblue', ml: 1 }} />;
    } else {
      return <CloudIcon sx={{ fontSize: '3rem', color: 'gray', ml: 1 }} />;
    }
  };

  const getBackgroundColor = () => {
    if (darkMode) return '#1e1e1e';
    if (weatherMain.includes("rain")) return '#a0c4ff';
    if (weatherMain.includes("cloud")) return '#d3d3d3';
    if (weatherMain.includes("clear")) return '#fde68a';
    if (weatherMain.includes("snow")) return '#e0f7fa';
    return '#4B5563';
  };

  const getTextColor = () => (darkMode ? 'white' : 'black');

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        borderRadius: '0.75rem',
        width: '260px',
        padding: '30px',
      }}
    >
      <Typography variant="subtitle1">Now</Typography>

      <Box display="flex" alignItems="center" fontSize="35px" fontWeight="bold">
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
      </Box>

      <Typography variant="body2" mt={1}>
        {weatherDescription}
      </Typography>

      <Box mt={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2">{currentDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {cityName}, {countryName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainWeatherCard;
