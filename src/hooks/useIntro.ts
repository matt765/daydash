import { useState } from 'react';

import { useUserStore } from '@/store/userStore';

interface UseIntro {
  name: string;
  city: string;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useIntro = (
  setView: (
    value: 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading'
  ) => void
): UseIntro => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const { setName: setNameInStore, setCity: setCityInStore } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameInStore(name);
    setCityInStore(city);
    setView('dashboard');
  };

  return {
    name,
    city,
    setName,
    setCity,
    handleSubmit,
  };
};
