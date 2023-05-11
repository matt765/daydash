import { useEffect, useState } from 'react';

import { useUserStoreWrapper } from '@/store/userStore';
import { useWeatherStore } from '@/store/weatherStore';
import { fetchWeatherData } from './useWeatherData';
import { saveToLocalStorage } from '@/utils/localStorageUtils';

const LOCAL_STORAGE_KEY = 'weatherStoreData';

export const useEditUserData = (onClose: () => void) => {
  const {
    name: storeName,
    city: storeCity,
    setName,
    setCity,
  } = useUserStoreWrapper();
  const { setWeatherData } = useWeatherStore();

  const [name, setNameInput] = useState<string>(storeName);
  const [city, setCityInput] = useState<string>(storeCity);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    try {
      const weatherData = await fetchWeatherData(city);
      if (!weatherData) {
        throw new Error('City not found');
      }
      saveToLocalStorage(LOCAL_STORAGE_KEY, weatherData);
      setWeatherData(weatherData, false);
      setName(name);
      setCity(city);
      onClose();
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
    setNameInput,
    setCityInput,
    handleSubmit,
    isSubmitting,
    isError,
  };
};
