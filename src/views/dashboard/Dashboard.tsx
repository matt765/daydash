import { Flex, useColorMode } from '@chakra-ui/react';

import { Planner } from '@/components/planner/Planner';
import { Weather } from '@/components/weather/Weather';
import { Welcome } from '@/components/welcome/Welcome';
import { ContentBox } from '@/theme/components/contentBox';
import useSettingsStore from '@/store/settingsStore';

const BlurOverlay = () => (
  <Flex
    w="100%"
    h="100%"
    position="absolute"
    top="0"
    bottom="0"
    zIndex="0"
    ml="-1rem"
    backdropFilter="blur(24px)"
    borderRadius="15px"
  />
);

export const Dashboard = () => {
  const isFullPlannerVisible = useSettingsStore(
    (state) => state.isFullPlannerVisible
  );
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" height="100%" direction="column" gap="1rem">
      {!isFullPlannerVisible && (
        <Flex
          direction="row"
          wrap="nowrap"
          height={{ lg: '49.5%', '2xl': '45%' }}
          minH={{ lg: '49.5%', '2xl': '45%' }}
          gap="1rem">
          <ContentBox width={{ lg: '33.5%', xl: '30%' }} position="relative">
            <Welcome />
            {colorMode === 'dark' && <BlurOverlay />}
          </ContentBox>
          <ContentBox width={{ lg: '65.5%', xl: '70%' }} position="relative">
            <Weather />
            {colorMode === 'dark' && <BlurOverlay />}
          </ContentBox>
        </Flex>
      )}
      <ContentBox
        height={!isFullPlannerVisible ? { lg: '50.5%', '2xl': '55%' } : '100%'}
        p="1.5rem 0.5rem 0 1rem"
        overflow="hidden"
        borderRadius="20px"
        flexDirection="column"
        minW="100%"
        w="100%"
        position="relative">
        <Planner />
        {colorMode === 'dark' && <BlurOverlay />}
        <Flex h="1rem" w="100%" />
      </ContentBox>
    </Flex>
  );
};
