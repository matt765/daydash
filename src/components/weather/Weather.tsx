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
import { useEffect, useMemo } from 'react';
import { HandIcon } from '@/assets/icons/HandIcon';
import { HumidityIcon } from '@/assets/icons/HumidityIcon';
import { PressureIcon } from '@/assets/icons/PressureIcon';
import { WindIcon } from '@/assets/icons/WindIcon';

export const Weather = () => {
  const storeCity = useUserStore((state) => state.city);
  const useFahrenheit = useSettingsStore((state) => state.useFahrenheit);
  const { weatherData, isLoading } = useWeatherStore((state) => ({
    weatherData: state.weatherData,
    isLoading: state.isLoading,
    isError: state.isError,
  }));
  const {
    getWeatherImage,
    getHour,
    getCurrentDate,
    toCelsius,
    toFahrenheit,
    isTablet,
  } = useWeatherUtils();
  const { data: fetchedWeatherData, isLoading: isFetchLoading } =
    useWeatherData(storeCity);

  useEffect(() => {
    if (weatherData === null && fetchedWeatherData) {
      useWeatherStore.getState().setWeatherData(fetchedWeatherData);
    }
  }, [weatherData, fetchedWeatherData]);

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

  if (!weatherData)
    return (
      <Flex w="100%" h="100%" justify="center" alignItems="center">
        <Text fontSize="1.3rem" color="primaryText">
          City not found
        </Text>
      </Flex>
    );

  const weatherBoxCount = isTablet ? 8 : 10;

  return (
    <Flex direction="column" gap="1rem" w="100%" position="relative" zIndex="1">
      <Flex
        w="100%"
        mt="0.6rem"
        mb="1rem"
        justify={{ base: 'center', lg: 'unset' }}>
        <Flex
          direction="column"
          w="50%"
          maxW="50%"
          justify="center"
          alignItems="center">
          <Flex maxW="13rem" overflow="hidden" whiteSpace="nowrap">
            <Flex
              sx={{
                '& img': {
                  maxWidth: '80px',
                  maxHeight: '80px',
                },
              }}
              h="100%"
              mr="0.3rem"
              justify="center"
              alignItems="center">
              <Image
                src={getWeatherImage(weatherData?.icon)}
                alt="Weather Icon"
                width={80}
                height={80}
              />
            </Flex>
            <Flex direction="column" h="6rem" maxH="7rem">
              <Text variant="weatherTemperature" mb="-0.3rem">
                {useFahrenheit
                  ? toFahrenheit(weatherData?.temp, 'celsius')
                  : weatherData?.temp}
                °
              </Text>
              <Text variant="weatherDesc" mb="1rem">
                {weatherData?.desc.split(' ').slice(0, 2).join(' ')}
              </Text>
            </Flex>
          </Flex>
          <Flex
            as="div"
            display="grid"
            gridTemplateColumns="min-content auto"
            gap="0.5rem"
            alignItems="center"
            mt={storeCity.length > 16 ? '0.5rem' : '0rem'}>
            <Text
              variant="weatherCity"
              mr="0.1rem"
              whiteSpace="pre"
              fontSize={storeCity.length > 16 ? '1.5rem' : '2rem'}
              display="inline">
              {storeCity.charAt(0).toUpperCase() + storeCity.slice(1)},
            </Text>
            <Text
              variant="weatherCountry"
              fontSize={storeCity.length > 16 ? '1.7rem' : '2rem'}>
              {weatherData?.country}
            </Text>
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap="0.5rem"
          w="46%"
          ml="0.3rem"
          maxW="50%"
          h="100%"
          minH="9rem"
          alignItems="center"
          mt="0.5rem"
          display={{ base: 'none', lg: 'grid' }}>
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

      <Grid
        mx={{ base: 'auto', md: 'lg' }}
        pl={{ lg: '0.5rem', xl: 'unset' }}
        gap="0.5rem"
        mt="0.3rem"
        templateColumns={{ base: 'repeat(5, 1fr)', lg: 'repeat(10, 1fr)' }}
        maxW={{ base: '22rem', lg: 'unset' }}>
        {weatherData?.hourTemp
          ?.slice(0, weatherBoxCount)
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
      </Grid>

      <Grid
        mx={{ base: 'auto', md: 'lg' }}
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap="1.5rem"
        maxW={{ base: '20rem', lg: 'unset' }}
        h="100%"
        alignItems="center"
        justifyContent="center"
        pl="1rem"
        mt="1.5rem"
        display={{ base: 'grid', lg: 'none' }}>
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
  );
};
