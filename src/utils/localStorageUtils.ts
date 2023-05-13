export const saveToLocalStorage = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const loadFromLocalStorage = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : initialValue;
};
