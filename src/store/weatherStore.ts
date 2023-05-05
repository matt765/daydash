import { create, SetState } from 'zustand';
import { WeatherData } from '@/hooks/useWeatherData';

interface WeatherStore {
  weatherData: WeatherData | null;
  isLoading: boolean;
  isError: boolean;
  setWeatherData: (data: WeatherData | null, hasError?: boolean) => void;
}

export const useWeatherStore = create<WeatherStore>((set: SetState<WeatherStore>) => ({
  weatherData: null,
  isLoading: false,
  isError: false,
  setWeatherData: (data: WeatherData | null, hasError: boolean = false) =>
    set((state) => ({ ...state, weatherData: data, isError: hasError })),
}));
