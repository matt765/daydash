import { WeatherData } from '@/hooks/useWeatherData';

export const fetchWeatherData = async (
  cityValue: string
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(`/api/weather?cityValue=${cityValue}`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();

    if (!data.coord) {
      throw new Error('City not found');
    }

    const { lat, lon } = data.coord;
    const responseOneCall = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

    if (!responseOneCall.ok) {
      throw new Error('City not found');
    }
    const oneCallData = await responseOneCall.json();

    const toCelsius = (value: number): string => {
      return Math.round(value - 273.15).toString();
    };

    const weatherData: WeatherData = {
      temp: toCelsius(oneCallData.current.temp),
      desc: oneCallData.current.weather[0].description,
      humidity: oneCallData.current.humidity.toString(),
      rain: oneCallData.current.feels_like.toString(),
      pressure: oneCallData.current.pressure.toString(),
      country: data.sys.country,
      wind: (oneCallData.hourly[0].wind_speed * 3.6).toFixed(1),
      hourTemp: oneCallData.hourly,
      icon: oneCallData.current.weather[0].icon,
      region: oneCallData.timezone,
    };
    return weatherData;
  } catch (error) {
    throw error;
  }
};
