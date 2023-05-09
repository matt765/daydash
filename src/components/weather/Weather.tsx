import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { WeatherHourBox, WeatherHourBoxProps } from './WeatherHourBox';
import { WeatherParameter } from './WeatherParameter';
import { useWeatherData } from '@/hooks/useWeatherData';
import { useWeatherUtils } from '@/hooks/useWeatherUtils';
import { useUserStore } from '../../store/userStore';
import useSettingsStore from '@/store/settingsStore';
import { Loader } from '../loader/Loader';
import { useWeatherStore } from '@/store/weatherStore';
import { useMemo } from 'react';
import { HandIcon } from '@/assets/icons/HandIcon';
import { HumidityIcon } from '@/assets/icons/HumidityIcon';
import { PressureIcon } from '@/assets/icons/PressureIcon';
import { WindIcon } from '@/assets/icons/WindIcon';

export const Weather = () => {
  const storeCity = useUserStore((state) => state.city);
  const useFahrenheit = useSettingsStore((state) => state.useFahrenheit);
  const { weatherData, isLoading, isError } = useWeatherStore((state) => ({
    weatherData: state.weatherData,
    isLoading: state.isLoading,
    isError: state.isError,
  }));
  const { getWeatherImage, getHour, getCurrentDate, toCelsius, toFahrenheit } =
    useWeatherUtils();
  const { data: fetchedWeatherData, isLoading: isFetchLoading } =
    useWeatherData(storeCity);
  const currentWeatherData = weatherData || fetchedWeatherData;

  const weatherParameters = useMemo(
    () => [
      {
        icon: HumidityIcon,
        title: 'Humidity',
        value: `${weatherData?.humidity}%`,
      },
      {
        icon: HandIcon,
        title: 'Feels like',
        value: `${
          useFahrenheit
            ? toFahrenheit(weatherData?.rain)
            : toCelsius(weatherData?.rain)
        }°`,
      },
      {
        icon: PressureIcon,
        title: 'Air pressure',
        value: `${weatherData?.pressure} hPa`,
      },
      {
        icon: WindIcon,
        title: 'Wind speed',
        value: `${weatherData?.wind} km/h`,
      },
    ],
    [weatherData, useFahrenheit, toCelsius, toFahrenheit]
  );

  if (isLoading || isFetchLoading) {
    return <Loader />;
  }
  if (weatherData === null && fetchedWeatherData) {
    useWeatherStore.getState().setWeatherData(fetchedWeatherData);
  }
  return (
    <Flex direction="column" gap="1rem" w="100%" position="relative" zIndex="1">
      <Flex w="100%" mt="1rem" mb="1rem">
        <Flex
          direction="column"
          w="50%"
          maxW="50%"
          justify="center"
          alignItems="center">
          <Flex>
            <Flex
              sx={{
                '& img': {
                  maxWidth: '80px',
                  maxHeight: '80px',
                },
              }}
              h="100%"
              justify="center"
              alignItems="center">
              <Image
                src={getWeatherImage(weatherData?.icon)}
                alt="Weather Icon"
                width={80}
                height={80}
              />
            </Flex>
            <Flex direction="column">
              <Text variant="weatherTemperature">
                {useFahrenheit
                  ? toFahrenheit(weatherData?.temp, 'celsius')
                  : weatherData?.temp}
                °
              </Text>
              <Text variant="weatherDesc">{weatherData?.desc}</Text>
            </Flex>
          </Flex>
          <Flex>
            <Text variant="weatherCity" mr="0.5rem">
              {storeCity.charAt(0).toUpperCase() + storeCity.slice(1)},
            </Text>
            <Text variant="weatherCountry">{weatherData?.country}</Text>
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={1}
          w="50%"
          maxW="50%"
          h="100%"
          alignItems="center">
          {weatherParameters.map((item, index) => (
            <GridItem key={`${item.title}-${index}`}>
              <WeatherParameter
                icon={item.icon}
                title={item.title}
                value={item.value}
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
      <Flex gap="0.5rem">
        {weatherData?.hourTemp
          ?.slice(0, 10)
          .map((item: WeatherHourBoxProps, index) => (
            <WeatherHourBox
              date={getCurrentDate(item?.dt)}
              hour={getHour(item?.dt)}
              icon={item?.weather?.[0].icon}
              temp={
                useFahrenheit ? toFahrenheit(item?.temp) : toCelsius(item?.temp)
              }
              key={`${item.hour}-${index}`}
            />
          ))}
      </Flex>
    </Flex>
  );
};
