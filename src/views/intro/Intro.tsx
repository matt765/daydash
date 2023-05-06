import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { ContentBox } from '@/theme/components/contentBox';
import { useIntro } from '@/hooks/useIntro';
import { useWeatherStore } from '@/store/weatherStore';
import { Loader } from '@/components/loader/Loader';

interface IntroProps {
  setView: (
    value: 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading'
  ) => void;
  onDataSaved: () => void;
}

export const Intro = ({ setView, onDataSaved }: IntroProps) => {
  const { name, city, setName, setCity, handleSubmit, isSubmitting } =
    useIntro(setView, onDataSaved);
  const { isError, isLoading, weatherData } = useWeatherStore();

  return (
    <ContentBox
      display="flex"
      flexDirection="column"
      w="38rem"
      h="22rem"
      justifyContent="flex-start"
      alignItems="center"
      textAlign="center"
      p="2rem"
      borderRadius="30px"
      sx={{
        '& *': {
          fontFamily: 'Heebo',
        },
      }}>
      <form onSubmit={handleSubmit}>
        <Flex mb="1rem" mt="0.5rem" justify="center" w="100%">
          <Text mr="0.5rem" variant="dataModalTitle">
            Welcome to
          </Text>
          <Text variant="dataModalTitleColored">DayDash</Text>
        </Flex>
        <Text variant="dataModalSubtitle" mb="2rem">
          Please state your name and location
        </Text>
        <Flex direction="column">
          <Flex
            gap="1rem"
            sx={{
              '& input': {
                borderWidth: 0,
                backgroundColor: 'plannerInputBg',
                '&:hover': {
                  backgroundColor: 'plannerInputHoverBg',
                },
              },
            }}>
            <Input
              placeholder="Name"
              _placeholder={{ color: 'secondaryText' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="City"
              _placeholder={{ color: 'secondaryText' }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Flex>
          {isError && (
            <Flex color="red.400" w="100%" justify="center" mt="1rem">
              City not found. Please try again.
            </Flex>
          )}
          <Flex w="100%" justify="center" mt={isError ? '1rem' : '2.5rem'}>
            <Button
              type="submit"
              variant="solid"
              bg="mainColor"
              height="3rem"
              borderRadius="10px"
              w="14rem"
              _hover={{ bg: 'mainColorHover' }}>
              {isLoading || isSubmitting ? <Loader isSmall /> : 'Get started'}
            </Button>
          </Flex>
        </Flex>
      </form>
    </ContentBox>
  );
};
