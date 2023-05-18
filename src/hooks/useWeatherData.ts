import { useQuery } from 'react-query';
import { HandIcon } from '@/assets/icons/HandIcon';
import { HumidityIcon } from '@/assets/icons/HumidityIcon';
import { PressureIcon } from '@/assets/icons/PressureIcon';
import { WindIcon } from '@/assets/icons/WindIcon';
import useSettingsStore from '@/store/settingsStore';
import { useWeatherUtils } from './useWeatherUtils';
import { fetchWeatherData } from '@/services/fetchWeatherData';

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
