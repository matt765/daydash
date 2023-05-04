import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

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
  const getWeatherImage = (id?: string) => {
    if (id) {
      return require(`../../assets/images/weather/${id}@2x.png`);
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      alignItems="center"
      bg="weatherBoxBg"
      w="4rem"
      h="6.25rem"
      _hover={{ bg: 'weatherBoxHoverBg' }}
      transition="0.1s">
      <Text variant="weatherBoxDate">{date}</Text>
      <Text variant="weatherBoxDate">{hour}:00</Text>
      <Image
        src={getWeatherImage(icon)}
        alt="Weather Icon"
        width={25}
        height={25}
      />
      <Text variant="weatherBoxValue">{temp}°</Text>
    </Flex>
  );
};
