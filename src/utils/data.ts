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
}

export const fetchGeolocation = async (): Promise<{ city: string; lat: number; lon: number }> => {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            city: "Current Location", // Placeholder for browser-provided location
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation failed:", error);

          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permission denied for accessing geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Position unavailable. Please ensure your device has a working GPS or try again later.";
              break;
            case error.TIMEOUT:
              errorMessage = "Geolocation request timed out. Please try again.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          console.warn(errorMessage);

          // Fallback to default location (Coimbatore) if geolocation fails
          resolve({ city: "Coimbatore", lat: 11.0168, lon: 76.9858 });
        }
      );
    } else {
      console.error("Geolocation not supported by browser");
      // Fallback to default location
      resolve({ city: "Coimbatore", lat: 11.0168, lon: 76.9858 });
    }
  });
};

export const fetchWeatherData = async (city?: string, lat?: number, lon?: number) => {
  let currentWeatherUrl, forecastUrl;

  if (city) {
    currentWeatherUrl = `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`;
    forecastUrl = `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`;
  } else if (lat && lon) {
    currentWeatherUrl = `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else {
    throw new Error("Either city name or latitude/longitude must be provided");
  }

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    const currentWeather = currentWeatherResponse.data as CurrentWeatherData;
    const forecastData = forecastResponse.data as ForecastData;

    // Convert sunrise and sunset from UNIX timestamps to readable time
    const sunrise = new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const hourlyForecast: HourlyForecast[] = forecastData.list.slice(0, 6).map((item: WeatherData) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: `${Math.round(item.main.temp)}°`,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    }));

    const weeklyForecast: WeeklyForecast[] = forecastData.list
      .filter((_item: WeatherData, index: number) => index % 8 === 0)
      .slice(0, 7)
      .map((item: WeatherData) => ({
        day: new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' }),
        condition: item.weather[0].main,
        temp: `${Math.round(item.main.temp_max)}/${Math.round(item.main.temp_min)}`,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      }));

    return {
      city: currentWeather.name,
      currentTemp: `${Math.round(currentWeather.main.temp)}°`,
      temp_max: `${Math.round(currentWeather.main.temp_max)}°`, 
      temp_min: `${Math.round(currentWeather.main.temp_min)}°`, 
      realFeel: `${Math.round(currentWeather.main.feels_like)}°`,
      wind: `${currentWeather.wind.speed} km/h`,
      sunrise,
      sunset,
      hourlyForecast,
      weeklyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
