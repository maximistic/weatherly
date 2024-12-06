import axios from "axios";

const API_KEY = "b2628eab986a5c305f4fa92cb7ccbc0c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export interface HourlyForecast {
  time: string;
  temp: string;
  icon: string;
}

export interface DailyForecast {
  day: string;
  description: string;
  temp: string;
  icon: string;
}

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface CurrentWeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastData {
  list: WeatherData[];
}

export const fetchWeatherData = async (lat: number, lon: number) => {
  const currentWeatherUrl = `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    const currentWeather = currentWeatherResponse.data as CurrentWeatherData;
    const forecastData = forecastResponse.data as ForecastData;

    const hourlyForecast: HourlyForecast[] = forecastData.list.slice(0, 6).map((item: WeatherData) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: `${Math.round(item.main.temp)}°`,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    }));

    const dailyForecast: DailyForecast[] = forecastData.list
      .filter((_item, index) => index % 8 === 0) // 1 per day
      .slice(0, 5)
      .map((item: WeatherData) => ({
        day: new Date(item.dt * 1000).toLocaleDateString([], { weekday: "short" }),
        description: item.weather[0].description,
        temp: `${Math.round(item.main.temp_min)}/${Math.round(item.main.temp_max)}`,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      }));

    return {
      city: currentWeather.name,
      currentTemp: `${Math.round(currentWeather.main.temp)}°`,
      minTemp: `${Math.round(currentWeather.main.temp_min)}°`,
      maxTemp: `${Math.round(currentWeather.main.temp_max)}°`,
      sunrise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sunset: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      hourlyForecast,
      dailyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
