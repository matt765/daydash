'use client';

import { create } from 'zustand';
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
  clearUserData: () => void;
  isMounted: boolean;
  firstMount: boolean;
  setFirstMount: (value: boolean) => void;
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
  clearUserData: () => {
    localStorage.removeItem('userStoreName');
    localStorage.removeItem('userStoreCity');
    localStorage.removeItem('currentView');
    localStorage.removeItem('currentMobileView');
    set({ name: '', city: '' });
  },
  isMounted: false,
  firstMount: true,
  setFirstMount: (value) => set({ firstMount: value }),
}));

export const useUserStoreWrapper = () => {
  const { name, city, setName, setCity, clearUserData, isMounted } =
    useUserStore();
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

  return { name, city, setName, setCity, clearUserData, isMounted: mounted };
};
