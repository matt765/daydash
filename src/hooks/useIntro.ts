import { useState } from 'react';

import { useUserStore } from '@/store/userStore';
import { fetchWeatherData, WeatherData } from '@/hooks/useWeatherData';
import { useWeatherStore } from '@/store/weatherStore';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

interface UseIntro {
  name: string;
  city: string;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isError: boolean;
}

const LOCAL_STORAGE_KEY = 'weatherStoreData';

export const useIntro = (
  setView: (
    value: 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading'
  ) => void,
  onDataSaved: () => void
): UseIntro => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const { setName: setNameInStore, setCity: setCityInStore } = useUserStore();
  const { setWeatherData } = useWeatherStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setWeatherData(loadFromLocalStorage(LOCAL_STORAGE_KEY, null), false);
    try {
      const weatherData = await fetchWeatherData(city);
      if (!weatherData) {
        throw new Error('City not found');
      }
      saveToLocalStorage(LOCAL_STORAGE_KEY, weatherData);
      setWeatherData(weatherData, false);
      setNameInStore(name);
      setCityInStore(city);
      setView('dashboard');
      onDataSaved();
    } catch (error: unknown) {
      setIsError(true);
      setWeatherData(null, true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    city,
    setName,
    setCity,
    handleSubmit,
    isSubmitting,
    isError
  };
};
