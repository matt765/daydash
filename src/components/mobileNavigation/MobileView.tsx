import { Notepad } from '@/views/notepad/Notepad';
import { Flex } from '@chakra-ui/react';
import { Planner } from '../planner/Planner';
import { Settings } from '../settings/Settings';
import { Weather } from '../weather/Weather';
import { Welcome } from '../welcome/Welcome';

interface MobileViewProps {
  viewName: string;
}

const WelcomeMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1rem"
    pb="0"
    px={{ base: '5vw', sm: '10vw' }}
    bg="contentBg"
    overflow="auto"
    display={{ base: 'flex', lg: 'none' }}>
    <Welcome />
  </Flex>
);

const WeatherMobileView = () => (
  <Flex
    w="100%"
    h="100%"
    p="1rem"
    bg="contentBg"
    justify="flex-start"
    alignItems={{ base: 'flex-start', md: 'center' }}
    mb={{ base: '0', md: '10rem' }}
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
  <Flex w="100%" h="100%" p="1.5rem"  bg="contentBg" pb="5.5rem">
    <Notepad />
  </Flex>
);

const SettingsMobileView = () => (
  <Flex w="100%">
    <Notepad />
  </Flex>
);

export const MobileView = ({ viewName }: MobileViewProps) => {
  switch (viewName) {
    case 'home':
      return <WelcomeMobileView />;
    case 'weather':
      return <WeatherMobileView />;
    case 'planner':
      return <PlannerMobileView />;
    case 'notepad':
      return <NotepadMobileView />;
    case 'settings':
      return <SettingsMobileView />;
    default:
      return <WelcomeMobileView />;
  }
};
