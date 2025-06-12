'use client';
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = ({ onSearch, darkMode, onToggleDark }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("موقعیت مکانی قابل دریافت نیست.");
        }
      );
    } else {
      alert("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        px: 4,
        py: 2,
        bgcolor: darkMode ? "#1e1e1e" : "background.paper",
        color: darkMode ? "white" : "inherit",
      }}
    >
      {/* لوگو */}
      <Box display="flex" alignItems="center" gap={1}>
        <FilterDramaTwoToneIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">
          Weather
        </Typography>
      </Box>

      {/* سرچ */}
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          variant="outlined"
          placeholder="Search city 'London'"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          sx={{
            bgcolor: darkMode ? "#2c2c2c" : "white",
            borderRadius: "2rem",
            width: { xs: "12rem", sm: "16rem", md: "22rem" },
            input: {
              color: darkMode ? "#fff" : "#000",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: darkMode ? "#ccc" : undefined }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{
            borderRadius: "6px",
            bgcolor: "#4B5550",
            textTransform: "none",
            px: 2,
            "&:hover": { bgcolor: "#3f4844" },
          }}
        >
          Search
        </Button>
      </Box>

      {/* دکمه‌ها */}
      <Box display="flex" alignItems="center" gap={1} mt={{ xs: 2, sm: 0 }}>
        {/* موقعیت مکانی */}
        <Button
          onClick={getCurrentLocation}
          startIcon={<GpsFixedIcon />}
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            bgcolor: "#4B5550",
            color: "white",
            height: "40px",
            width: "170px",
            borderRadius: "6px",
            textTransform: "none",
            "&:hover": { bgcolor: "#3f4844" },
          }}
        >
          Current Location
        </Button>

        {/* دکمه سوییچ تم */}
        <IconButton
          onClick={onToggleDark}
          sx={{
            color: darkMode ? "#ffeb3b" : "#333",
            border: darkMode ? "1px solid #888" : "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
