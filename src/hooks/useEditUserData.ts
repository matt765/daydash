import { useEffect, useState } from 'react';

import { useUserStoreWrapper } from '@/store/userStore';

export const useEditUserData = (onClose: () => void) => {
  const {
    name: storeName,
    city: storeCity,
    setName,
    setCity,
  } = useUserStoreWrapper();

  const [name, setNameInput] = useState<string>(storeName);
  const [city, setCityInput] = useState<string>(storeCity);

  useEffect(() => {
    setNameInput(storeName);
    setCityInput(storeCity);
  }, [storeName, storeCity]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(name);
    setCity(city);
    onClose();
  };

  return {
    name,
    city,
    setNameInput,
    setCityInput,
    handleSubmit,
  };
};
