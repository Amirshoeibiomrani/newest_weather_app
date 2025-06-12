'use client';

import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const getWeatherIcon = (main) => {
  switch (main.toLowerCase()) {
    case 'clear':
      return <WbSunnyIcon style={{ color: 'orange' }} fontSize="large" />;
    case 'clouds':
      return <CloudIcon style={{ color: 'gray' }} fontSize="large" />;
    case 'rain':
      return <GrainIcon style={{ color: 'blue' }} fontSize="large" />;
    case 'snow':
      return <AcUnitIcon style={{ color: '#a0d8ef' }} fontSize="large" />;
    case 'thunderstorm':
      return <FlashOnIcon style={{ color: 'purple' }} fontSize="large" />;
    default:
      return <CloudIcon style={{ color: 'gray' }} fontSize="large" />;
  }
};

const formatDate = (dt_txt) => {
  const date = new Date(dt_txt);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getBackgroundColor = (darkMode, weatherMain) => {
  if (darkMode) return 'bg-[#1e1e1e]';

  switch (weatherMain?.toLowerCase()) {
    case 'clear':
      return 'bg-yellow-100';
    case 'clouds':
      return 'bg-gray-300';
    case 'rain':
      return 'bg-blue-100';
    case 'snow':
      return 'bg-blue-50';
    case 'thunderstorm':
      return 'bg-purple-100';
    default:
      return 'bg-[#4B5563]';
  }
};

const getItemColor = (darkMode) =>
  darkMode ? 'bg-[#2b2b2b] text-white' : 'bg-white text-black';

const FiveDayForecast = ({ forecastData, darkMode, weatherMain }) => {
  const forecastList = forecastData?.list?.slice(0, 5) || [];

  return (
    <div
      className={`${getBackgroundColor(
        darkMode,
        weatherMain
      )} p-5 rounded-2xl w-full max-w-md shadow-md ${
        darkMode ? 'text-white' : 'text-black'
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
      <div className="flex flex-col gap-4">
        {forecastList.map(({ dt_txt, main, weather }, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-lg p-3 ${getItemColor(
              darkMode
            )}`}
          >
            <div className="w-20 text-sm font-medium">{formatDate(dt_txt)}</div>
            <div>{getWeatherIcon(weather[0].main)}</div>
            <div className="text-lg font-bold">{Math.round(main.temp)}°C</div>
            <div className="hidden sm:block text-sm capitalize">
              {weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
