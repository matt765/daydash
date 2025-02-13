export const saveToLocalStorage = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error saving to localStorage for key "${key}":`, error);
    }
  }
};

export const loadFromLocalStorage = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      return initialValue;
    }

    const parsedData = JSON.parse(storedData) as T;
    
    // Additional type validation
    if (parsedData === null || parsedData === undefined) {
      return initialValue;
    }

    return parsedData;
  } catch (error) {
    // If there's any error parsing the data, clear the corrupted data
    localStorage.removeItem(key);
    console.warn(`Error loading data from localStorage for key "${key}":`, error);
    return initialValue;
  }
};