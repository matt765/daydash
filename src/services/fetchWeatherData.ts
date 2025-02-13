import { WeatherData } from '@/hooks/useWeatherData';
import { getCountryCode } from '@/utils/countryMapping';

export const fetchWeatherData = async (
  cityValue: string
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(`/api/weather?cityValue=${cityValue}`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();

    const weatherData: WeatherData = {
      // Use the current temperature (already in Celsius) and round it
      temp: Math.round(data.current.temp_c).toString(),
      // Weather description from the current condition
      desc: data.current.condition.text,
      // Convert humidity to string
      humidity: data.current.humidity.toString(),
      // Use "feels like" (in °C) for the "Feels like" parameter
      rain: Math.round(data.current.feelslike_c).toString(),
      // Pressure in millibars
      pressure: data.current.pressure_mb.toString(),
      // Country comes from the location object
      country: getCountryCode(data.location.country),
      // Wind speed in kph (as a string with one decimal)
      wind: data.current.wind_kph.toFixed(1),
      // Hourly forecast array from the first forecast day
      hourTemp: data.forecast.forecastday[0].hour,
      // Icon URL from the current condition (if needed, prepend "https:" if required)
      icon: data.current.condition.icon,
      // Use the timezone id (or region) from the location object
      region: data.location.tz_id || data.location.region,
    };
    return weatherData;
  } catch (error) {
    throw error;
  }
};
