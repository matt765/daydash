import { useMediaQuery } from '@chakra-ui/react';

interface WeatherIcon {
  id: string;
  description: string;
  openWeatherIcon: string;
}

const weatherCodeToIcon: { [key: number]: WeatherIcon } = {
  // Clear conditions (OpenWeather: 01 - clear sky)
  113: { id: '01', description: 'Clear/Sunny', openWeatherIcon: '01d@2x.png' },

  // Cloudy conditions
  116: {
    id: '02',
    description: 'Partly cloudy',
    openWeatherIcon: '02d@2x.png',
  }, // few clouds
  119: { id: '03', description: 'Cloudy', openWeatherIcon: '03d@2x.png' }, // scattered clouds
  122: { id: '04', description: 'Overcast', openWeatherIcon: '04d@2x.png' }, // broken clouds

  // Mist/Fog/Atmospheric conditions (OpenWeather: 50 - mist)
  143: { id: '50', description: 'Mist', openWeatherIcon: '50d@2x.png' },
  248: { id: '50', description: 'Fog', openWeatherIcon: '50d@2x.png' },
  260: { id: '50', description: 'Freezing fog', openWeatherIcon: '50d@2x.png' },

  // Drizzle conditions (OpenWeather: 09 - shower rain)
  263: {
    id: '09',
    description: 'Patchy light drizzle',
    openWeatherIcon: '09d@2x.png',
  },
  266: {
    id: '09',
    description: 'Light drizzle',
    openWeatherIcon: '09d@2x.png',
  },

  // Rain conditions (OpenWeather: 09 - shower rain, 10 - rain)
  176: {
    id: '09',
    description: 'Patchy rain possible',
    openWeatherIcon: '09d@2x.png',
  },
  293: {
    id: '09',
    description: 'Patchy light rain',
    openWeatherIcon: '09d@2x.png',
  },
  296: { id: '10', description: 'Light rain', openWeatherIcon: '10d@2x.png' },
  299: {
    id: '10',
    description: 'Moderate rain at times',
    openWeatherIcon: '10d@2x.png',
  },
  302: {
    id: '10',
    description: 'Moderate rain',
    openWeatherIcon: '10d@2x.png',
  },
  305: {
    id: '10',
    description: 'Heavy rain at times',
    openWeatherIcon: '10d@2x.png',
  },
  308: { id: '10', description: 'Heavy rain', openWeatherIcon: '10d@2x.png' },
  353: {
    id: '09',
    description: 'Light rain shower',
    openWeatherIcon: '09d@2x.png',
  },
  356: {
    id: '09',
    description: 'Moderate or heavy rain shower',
    openWeatherIcon: '09d@2x.png',
  },
  359: {
    id: '09',
    description: 'Torrential rain shower',
    openWeatherIcon: '09d@2x.png',
  },

  // Thunderstorm conditions (OpenWeather: 11 - thunderstorm)
  200: {
    id: '11',
    description: 'Thundery outbreaks',
    openWeatherIcon: '11d@2x.png',
  },
  386: {
    id: '11',
    description: 'Patchy light rain with thunder',
    openWeatherIcon: '11d@2x.png',
  },
  389: {
    id: '11',
    description: 'Heavy rain with thunder',
    openWeatherIcon: '11d@2x.png',
  },
  392: {
    id: '11',
    description: 'Light snow with thunder',
    openWeatherIcon: '11d@2x.png',
  },
  395: {
    id: '11',
    description: 'Heavy snow with thunder',
    openWeatherIcon: '11d@2x.png',
  },

  // Snow conditions (OpenWeather: 13 - snow)
  179: {
    id: '13',
    description: 'Patchy snow possible',
    openWeatherIcon: '13d@2x.png',
  },
  227: { id: '13', description: 'Blowing snow', openWeatherIcon: '13d@2x.png' },
  230: { id: '13', description: 'Blizzard', openWeatherIcon: '13d@2x.png' },
  323: {
    id: '13',
    description: 'Patchy light snow',
    openWeatherIcon: '13d@2x.png',
  },
  326: { id: '13', description: 'Light snow', openWeatherIcon: '13d@2x.png' },
  329: {
    id: '13',
    description: 'Patchy moderate snow',
    openWeatherIcon: '13d@2x.png',
  },
  332: {
    id: '13',
    description: 'Moderate snow',
    openWeatherIcon: '13d@2x.png',
  },
  335: {
    id: '13',
    description: 'Patchy heavy snow',
    openWeatherIcon: '13d@2x.png',
  },
  338: { id: '13', description: 'Heavy snow', openWeatherIcon: '13d@2x.png' },
  350: { id: '13', description: 'Ice pellets', openWeatherIcon: '13d@2x.png' },

  // Snow showers (OpenWeather: 13 - snow)
  368: {
    id: '13',
    description: 'Light snow showers',
    openWeatherIcon: '13d@2x.png',
  },
  371: {
    id: '13',
    description: 'Moderate or heavy snow showers',
    openWeatherIcon: '13d@2x.png',
  },

  // Mixed precipitation (choosing most appropriate icon)
  182: { id: '13', description: 'Patchy sleet', openWeatherIcon: '13d@2x.png' }, // Sleet uses snow icon
  185: {
    id: '09',
    description: 'Patchy freezing drizzle',
    openWeatherIcon: '09d@2x.png',
  },
  281: {
    id: '09',
    description: 'Freezing drizzle',
    openWeatherIcon: '09d@2x.png',
  },
  284: {
    id: '09',
    description: 'Heavy freezing drizzle',
    openWeatherIcon: '09d@2x.png',
  },
  311: {
    id: '13',
    description: 'Light freezing rain',
    openWeatherIcon: '13d@2x.png',
  },
  314: {
    id: '13',
    description: 'Moderate/heavy freezing rain',
    openWeatherIcon: '13d@2x.png',
  },
  317: { id: '13', description: 'Light sleet', openWeatherIcon: '13d@2x.png' },
  320: {
    id: '13',
    description: 'Moderate/heavy sleet',
    openWeatherIcon: '13d@2x.png',
  },
  362: {
    id: '13',
    description: 'Light sleet showers',
    openWeatherIcon: '13d@2x.png',
  },
  365: {
    id: '13',
    description: 'Moderate/heavy sleet showers',
    openWeatherIcon: '13d@2x.png',
  },
  374: {
    id: '13',
    description: 'Light showers of ice pellets',
    openWeatherIcon: '13d@2x.png',
  },
  377: {
    id: '13',
    description: 'Moderate/heavy showers of ice pellets',
    openWeatherIcon: '13d@2x.png',
  },
};

const getLocalWeatherIcon = (weatherApiCode: number, isDay: boolean) => {
  const mapping = weatherCodeToIcon[weatherApiCode];
  if (!mapping) {
    console.log('No mapping found for code:', weatherApiCode);
    return '01d@2x.png'; // default fallback
  }

  const timeOfDay = isDay ? 'd' : 'n';
  return `${mapping.id}${timeOfDay}@2x.png`;
};

export const useWeatherUtils = () => {
  const getWeatherImage = (iconUrl?: string): string => {
    if (!iconUrl) return '/images/weather/01d@2x.png';

    const matches = iconUrl.match(/\/(\d+)\.png$/);
    const isDay = iconUrl.includes('/day/');

    if (matches && matches[1]) {
      const code = parseInt(matches[1]);
      const localIcon = getLocalWeatherIcon(code, isDay);
      return `/images/weather/${localIcon}`;
    }

    return '/images/weather/01d@2x.png';
  };

  const getHour = (value?: string | number): string | undefined => {
    if (value) {
      const numericValue =
        typeof value === 'number' ? value : parseInt(value, 10);
      const date = new Date(numericValue * 1000);
      const hour = date.getHours() + 1;
      return hour.toString();
    }
  };

  const getCurrentDate = (value?: string | number): string | undefined => {
    if (value) {
      const numericValue =
        typeof value === 'number' ? value : parseInt(value, 10);
      const date = new Date(numericValue * 1000);
      const month = date.getMonth() + 1;
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const dateString = date.getDate();
      return `${dateString}.${monthString}`;
    }
  };

  const toCelsius = (value?: string): string | undefined => {
    if (value) {
      const celsiusValue = Math.round(parseFloat(value));
      return celsiusValue.toString();
    }
  };

  const [isTablet] = useMediaQuery(
    '(min-width: 992px) and (max-width: 1280px)'
  );

  const toFahrenheit = (
    value?: string,
    from: 'celsius' | 'kelvin' = 'celsius'
  ): string | undefined => {
    if (value) {
      const floatValue = parseFloat(value);
      const celsiusValue = from === 'kelvin' ? floatValue - 273.15 : floatValue;
      const fahrenheitValue = Math.round((celsiusValue * 9) / 5 + 32);
      return fahrenheitValue.toString();
    }
  };

  return {
    getWeatherImage,
    getHour,
    getCurrentDate,
    toCelsius,
    toFahrenheit,
    isTablet,
  };
};
