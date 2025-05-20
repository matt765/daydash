import { Flex } from '@chakra-ui/react';

import { Notepad } from '@/components/views/notepad/Notepad';
import { Weather } from '../views/homepage/weather/Weather';
import { Planner } from '../views/homepage/planner/Planner';
import { Welcome } from '../views/homepage/welcome/Welcome';
import { useMobileViewStore } from '@/store/mobileViewStore';
import { ViewType } from '@/hooks/useHomepage';

const WelcomeMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1rem"
    pb="0"
    px={{ base: '5vw', sm: '10vw' }}
    bg="contentBg"
    overflow="auto"
    justifyContent="center"
    alignItems={{ base: 'center', xl: 'center' }}
    display={{ base: 'flex', xl: 'none' }}
    direction="column">
    <Welcome />
    <Flex w="100%" h="3rem" />
  </Flex>
);

const WeatherMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1rem"
    bg="contentBg"
    justify="flex-start"
    alignItems={{ base: 'flex-start', xl: 'center' }}
    mb={{ base: '0', md: '0rem' }}
    overflow="auto"
    pb="3rem"
    direction="column">
    <Weather />
  </Flex>
);

const PlannerMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1rem"
    pr="0rem"
    pb="0"
    bg="contentBg"
    overflow="auto">
    <Planner />
  </Flex>
);

const NotepadMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1.5rem"
    bg="contentBg"
    pb="5.5rem"
    justify="center"
    alignItems="center"
    pt="2rem">
    <Notepad />
  </Flex>
);

const SettingsMobileView = () => (
  <Flex w="100%">
    <Notepad />
  </Flex>
);

export const MobileView = () => {
  const { mobileView } = useMobileViewStore();

  switch (mobileView) {
    case 'mobileHome':
      return <WelcomeMobileView />;
    case 'mobileWeather':
      return <WeatherMobileView />;
    case 'mobilePlanner':
      return <PlannerMobileView />;
    case 'notepad':
      return <NotepadMobileView />;
    case 'settings':
      return <SettingsMobileView />;
    default:
      console.log('View not found, defaulting to WelcomeMobileView');
      return <WelcomeMobileView />;
  }
};
