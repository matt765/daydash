import { useQuery } from 'react-query';
import { HandIcon } from '@/assets/icons/HandIcon';
import { HumidityIcon } from '@/assets/icons/HumidityIcon';
import { PressureIcon } from '@/assets/icons/PressureIcon';
import { WindIcon } from '@/assets/icons/WindIcon';
import useSettingsStore from '@/store/settingsStore';
import { useWeatherUtils } from './useWeatherUtils';

export interface WeatherData {
  temp: string;
  desc: string;
  humidity: string;
  rain: string;
  pressure: string;
  country: string;
  wind: string;
  hourTemp: never[];
  icon: string;
  region: string;
}

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

function toCelsius(value: number): string {
  return Math.round(value - 273.15).toString();
}

export const useWeatherData = (cityValue: string) => {
  const useFahrenheit = useSettingsStore((state) => state.useFahrenheit);
  const { toCelsius, toFahrenheit } = useWeatherUtils();

  const queryResult = useQuery<WeatherData | null, Error>(
    ['weatherData', cityValue],
    () => fetchWeatherData(cityValue),
    {
      staleTime: Infinity,
    }
  );
  if (!queryResult.data) {
    return {
      data: null,
      isLoading: queryResult.isLoading,
      isError: true,
      weatherParameters: null,
    };
  }
  const weatherParameters = [
    {
      icon: HumidityIcon,
      title: 'Humidity',
      value: `${queryResult.data?.humidity}%`,
    },
    {
      icon: HandIcon,
      title: 'Feels like',
      value: `${
        useFahrenheit
          ? toFahrenheit(queryResult.data?.rain)
          : toCelsius(queryResult.data?.rain)
      }°`,
    },
    {
      icon: PressureIcon,
      title: 'Air pressure',
      value: `${queryResult.data?.pressure} hPa`,
    },
    {
      icon: WindIcon,
      title: 'Wind speed',
      value: `${queryResult.data?.wind} km/h`,
    },
  ];

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    weatherParameters,
  };
};
