import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { ContentBox } from '@/theme/components/contentBox';
import { useIntro } from '@/hooks/useIntro';
import { useWeatherStore } from '@/store/weatherStore';
import { Loader } from '@/components/loader/Loader';
import { useHomepage } from '@/hooks/useHomepage';

interface IntroProps {
  setView: (
    value: 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading'
  ) => void;
  onDataSaved: () => void;
}

export const Intro = ({ onDataSaved }: IntroProps) => {
  const { handleViewChange } = useHomepage();
  const { name, city, setName, setCity, handleSubmit, isSubmitting, isError } =
    useIntro(handleViewChange, onDataSaved);
  const { isLoading } = useWeatherStore();

  return (
    <ContentBox
      display="flex"
      flexDirection="column"
      w={{ base: '100%', md: '38rem' }}
      h={{ base: '100%', md: '22rem' }}
      justifyContent="flex-start"
      alignItems="center"
      textAlign="center"
      backdropFilter="blur(24px)"
      p="2rem"
      pt={{ base: '5rem', md: '2rem' }}
      borderRadius={{ base: '0', md: '30px' }}
      sx={{
        '& *': {
          fontFamily: 'Heebo',
        },
      }}>
      <form onSubmit={handleSubmit}>
        <Flex
          mb="1rem"
          mt="0.5rem"
          justify="center"
          w="100%"
          direction={{ base: 'column', sm: 'row' }}>
          <Text mr="0.5rem" variant="dataModalTitle">
            Welcome to
          </Text>
          <Text variant="dataModalTitleColored">DayDash</Text>
        </Flex>
        <Text variant="dataModalSubtitle" mb="2rem">
          Please enter your name and city
        </Text>
        <Flex direction="column">
          <Flex
            gap="1rem"
            w={{ base: '18rem', sm: '100%' }}
            direction={{ base: 'column', sm: 'row' }}
            mx={{ base: 'auto', sm: 'unset' }}
            sx={{
              '& input': {
                borderWidth: '1px',
                backgroundColor: 'modalInputBg',
                outline: 'none !important',
                borderColor: 'rgb(255,255,255,0)',
                outlineWidth: '0px !important',
                boxShadow: 'none !important',
                '&:hover': {
                  borderColor: 'mainColor !important',
                },
                '&:active, &:focus, &:focus-visible': {
                  backgroundColor: 'modalInputHoverBg',
                  borderColor: 'mainColor !important',
                },
              },
            }}>
            <Input
              placeholder="Name"
              _placeholder={{ color: 'secondaryText' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={10}
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
