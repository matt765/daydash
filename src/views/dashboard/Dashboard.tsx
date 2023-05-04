import { Flex } from '@chakra-ui/react';

import { Planner } from '@/components/planner/Planner';
import { Weather } from '@/components/weather/Weather';
import { Welcome } from '@/components/welcome/Welcome';
import { ContentBox } from '@/theme/components/contentBox';
import useSettingsStore from '@/store/settingsStore';

export const Dashboard = () => {
  const isFullPlannerVisible = useSettingsStore(
    (state) => state.isFullPlannerVisible
  );

  return (
    <Flex w="100%" height="100%" direction="column" gap="1rem">
      {!isFullPlannerVisible && (
        <Flex direction="row" wrap="nowrap" height="45%" gap="1rem">
          <ContentBox width="30%">
            <Welcome />
          </ContentBox>
          <ContentBox width="70%">
            <Weather />
          </ContentBox>
        </Flex>
      )}
      <ContentBox height={!isFullPlannerVisible ? "55%" : "100%"} p="1.5rem" pr="0.5rem" pb="0rem" overflow="hidden" borderRadius="20px" flexDirection="column">
        <Planner />
        <Flex h="1rem" w="100%"></Flex>
      </ContentBox>
    </Flex>
  );
};
