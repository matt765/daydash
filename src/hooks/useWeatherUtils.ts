export const useWeatherUtils = () => {
  const getWeatherImage = (id?: string) => {
    if (id) {
      return require(`../assets/images/weather/${id}@2x.png`);
    }
  };
  const getHour = (value?: string) => {
    if (value) {
      const numericValue = parseInt(value, 10);
      const date = new Date(numericValue * 1000);
      const hour = date.getHours() + 1;
      return hour.toString();
    }
  };
  const getCurrentDate = (value?: string) => {
    if (value) {
      const numericValue = parseInt(value, 10);
      const date = new Date(numericValue * 1000);
      const month = date.getMonth() + 1;
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const dateString = date.getDate();
      return `${dateString}.${monthString}`;
    }
  };
  const toCelsius = (value?: string): string | undefined => {
    if (value) {
      const celsiusValue = Math.round(parseFloat(value) - 273.15);
      return celsiusValue.toString();
    }
    return undefined;
  };
  const toFahrenheit = (value?: string): string | undefined => {
    if (value) {
      const fahrenheitValue = Math.round(
        ((parseFloat(value) - 273.15) * 9) / 5 + 32
      );
      return fahrenheitValue.toString();
    }
    return undefined;
  };

  return { getWeatherImage, getHour, getCurrentDate, toCelsius, toFahrenheit };
};
