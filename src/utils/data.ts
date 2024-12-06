import axios from "axios";

const API_KEY = "b2628eab986a5c305f4fa92cb7ccbc0c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export interface HourlyForecast {
  time: string;
  temp: string;
  icon: string;
}

export interface WeeklyForecast {
  day: string;
  condition: string;
  temp: string;
  icon: string;
}

export const fetchWeatherData = async (city: string) => {
  const currentWeatherUrl = `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    const currentWeather = currentWeatherResponse.data;
    const forecastData = forecastResponse.data;

    const hourlyForecast: HourlyForecast[] = forecastData.list.slice(0, 6).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: `${Math.round(item.main.temp)}°`,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    }));

    const weeklyForecast: WeeklyForecast[] = forecastData.list
      .filter((item: any, index: number) => index % 8 === 0) // Select one forecast per day
      .slice(0, 7)
      .map((item: any) => ({
        day: new Date(item.dt * 1000).toLocaleDateString([], { weekday: "short" }),
        condition: item.weather[0].main,
        temp: `${Math.round(item.main.temp_max)}/${Math.round(item.main.temp_min)}`,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      }));

    return {
      city: currentWeather.name,
      currentTemp: `${Math.round(currentWeather.main.temp)}°`,
      chanceOfRain: `${currentWeather.rain ? currentWeather.rain["1h"] || 0 : 0}%`,
      realFeel: `${Math.round(currentWeather.main.feels_like)}°`,
      wind: `${currentWeather.wind.speed} km/h`,
      uvIndex: "3", // 
      hourlyForecast,
      weeklyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
