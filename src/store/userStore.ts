import create from 'zustand';
import { useEffect, useState } from 'react';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

type UserState = {
  name: string;
  city: string;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  isMounted: boolean;
};

export const useUserStore = create<UserState>((set) => ({
  name: '',
  city: '',
  setName: (name) => {
    saveToLocalStorage('userStoreName', name);
    set({ name });
  },
  setCity: (city) => {
    saveToLocalStorage('userStoreCity', city);
    set({ city });
  },
  isMounted: false,
}));

export const useUserStoreWrapper = () => {
  const { name, city, setName, setCity, isMounted } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      const loadedName = loadFromLocalStorage('userStoreName', '');
      const loadedCity = loadFromLocalStorage('userStoreCity', '');
      setName(loadedName);
      setCity(loadedCity);
      setMounted(true);
    }
  }, [mounted, setName, setCity]);

  return { name, city, setName, setCity, isMounted: mounted };
};
