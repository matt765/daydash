import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useWeatherUtils } from '@/hooks/useWeatherUtils';

export interface WeatherHourBoxProps {
  date?: string;
  hour?: string;
  icon?: string;
  weather?: { icon: string }[];
  dt?: string;
  temp?: string;
}

export const WeatherHourBox = ({
  date,
  hour,
  icon,
  temp,
}: WeatherHourBoxProps) => {
  const { getWeatherImage } = useWeatherUtils();
  const iconUrl = icon ? getWeatherImage(icon) : '/images/weather/01d@2x.png';

  return (
    <Flex
      direction="column"
      justify="center"
      borderRadius="6px"
      alignItems="center"
      bg="weatherBoxBg"
      w={{ base: '3.7rem', sm: '3.2rem', '3xl': '4rem' }}
      h={{ base: '5.2rem', '3xl': '6.25rem' }}
      _hover={{ bg: 'weatherBoxHoverBg' }}
      transition="0.1s">
      <Text variant="weatherBoxDate">{date}</Text>
      <Text variant="weatherBoxDate">{hour}:00</Text>
      <Image src={iconUrl} alt="Weather Icon" width={25} height={25} />
      <Text variant="weatherBoxValue">{temp}°</Text>
    </Flex>
  );
};
