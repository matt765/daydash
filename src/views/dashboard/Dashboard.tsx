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
        <Flex direction="row" wrap="nowrap" height="45%" minH="45%" gap="1rem">
          <ContentBox width="30%" position="relative">
            <Welcome />
            {colorMode === 'dark' && <BlurOverlay />}
          </ContentBox>
          <ContentBox width="70%" position="relative">
            <Weather />
            {colorMode === 'dark' && <BlurOverlay />}
          </ContentBox>
        </Flex>
      )}
      <ContentBox
        height={!isFullPlannerVisible ? '55%' : '100%'}
        p="1.5rem"
        pr="0.5rem"
        pb="0rem"
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
