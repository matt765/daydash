import { Flex, Icon, Text } from '@chakra-ui/react';

interface WeatherParameterProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number | undefined;
}

export const WeatherParameter = ({
  icon,
  title,
  value,
}: WeatherParameterProps) => (
  <Flex
    sx={{
      '& svg': {
        width: '16px',
        height: '16px',
        color: 'weatherIcon',
      },
    }}>
    <Flex h="100%" pt="0.2rem" mr="0.7rem">
      <Icon as={icon} />
    </Flex>
    <Flex direction="column">
      <Text variant="weatherParameterTitle">{title}</Text>
      <Text variant="weatherParameterValue">{value}</Text>
    </Flex>
  </Flex>
);
