import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = "af05fb7faf92f827af6f0f25123dc259";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const IP_API_URL = "https://api.ipgeolocation.io/ipgeo?apiKey=fcd8776a8d3f46b8a413e0682a186831";

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
}

export interface WeeklyForecast {
  day: string;
  condition: string;
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
    main: string;
    icon: string;
  }[];
  rain?: {
    [key: string]: number;
  };
}

interface ForecastData {
  list: WeatherData[];
}

interface CurrentWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    [key: string]: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
  timezone: number; 
}

export const fetchGeolocation = async (): Promise<{ city: string; lat: number; lon: number }> => {
  try {
    const response = await axios.get(IP_API_URL);
    const { city, latitude: lat, longitude: lon } = response.data;
    return { city, lat, lon };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return { city: "Coimbatore", lat: 11.0168, lon: 76.9858 };
  }
};

const getLocalTime = (timestamp: number, timezoneOffset: number, is12Hour: boolean) => {
  const timezone = `Asia/Kolkata`; 
  return DateTime.fromSeconds(timestamp)
    .setZone(timezone)
    .toLocaleString({
      hour: "2-digit",
      minute: "2-digit",
      hour12: is12Hour,
    });
};

type FetchWeatherDataParams =
  | { query: string; is12Hour?: boolean }
  | { lat: number; lon: number; is12Hour?: boolean };

export const fetchWeatherData = async (params: FetchWeatherDataParams) => {
  if ("query" in params) {
    const { query, is12Hour = true } = params;
    const currentWeatherUrl = `${BASE_URL}weather?q=${query}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `${BASE_URL}forecast?q=${query}&units=metric&appid=${API_KEY}`;
    return fetchWeatherDataUsingUrls(currentWeatherUrl, forecastUrl, is12Hour);
  } else if ("lat" in params && "lon" in params) {
    const { lat, lon, is12Hour = true } = params;
    const currentWeatherUrl = `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    return fetchWeatherDataUsingUrls(currentWeatherUrl, forecastUrl, is12Hour);
  } else {
    throw new TypeError(
      "Invalid argument: params must include either 'query' or 'lat' and 'lon'."
    );
  }
}; 

const fetchWeatherDataUsingUrls = async (
  currentWeatherUrl: string,
  forecastUrl: string,
  is12Hour: boolean
) => {
  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    const currentWeather = currentWeatherResponse.data as CurrentWeatherData;
    const forecastData = forecastResponse.data as ForecastData;

    const utcOffsetInSeconds = currentWeather.timezone; 
    const sunrise = getLocalTime(currentWeather.sys.sunrise, utcOffsetInSeconds, is12Hour);
    const sunset = getLocalTime(currentWeather.sys.sunset, utcOffsetInSeconds, is12Hour);

    const hourlyForecast: HourlyForecast[] = forecastData.list.slice(0, 6).map((item: WeatherData) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: Math.round(item.main.temp),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    }));

    const weeklyForecast: WeeklyForecast[] = forecastData.list
      .filter((_item: WeatherData, index: number) => index % 8 === 0)
      .slice(0, 7)
      .map((item: WeatherData) => ({
        day: new Date(item.dt * 1000).toLocaleDateString([], { weekday: "short" }),
        condition: item.weather[0].main,
        temp: `${Math.round(item.main.temp_max)}/${Math.round(item.main.temp_min)}`,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      }));

    const timezone = `${Math.floor(utcOffsetInSeconds / 3600)}:${(utcOffsetInSeconds % 3600) / 60}`;

    return {
      city: currentWeather.name,
      currentTemp: currentWeather.main.temp,
      temp_max: currentWeather.main.temp_max,
      temp_min: currentWeather.main.temp_min,
      realFeel: currentWeather.main.feels_like,
      wind: currentWeather.wind.speed,
      sunrise,
      sunset,
      hourlyForecast,
      weeklyForecast,
      lat: currentWeather.coord.lat,
      lon: currentWeather.coord.lon,
      timezone, 
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};