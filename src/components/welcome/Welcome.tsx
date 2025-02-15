import { Box, Flex, Icon, Text } from '@chakra-ui/react';

import { useWelcome } from '@/hooks/useWelcome';
import { Loader } from '../loader/Loader';
import { RefreshIcon } from '@/assets/icons/RefreshIcon';

export const Welcome = () => {
  const {
    userName,
    dayOfWeek,
    dayOfMonth,
    monthName,
    year,
    contentMode,
    isLoading,
    error,
    fact,
    isLoadingQuote,
    errorQuote,
    quote,
    author,
    isRefetchingContent,
    refetchContent,
  } = useWelcome();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box h="100%" w="100%" display="flex" alignItems="center">
      <Flex
        direction="column"
        paddingLeft="1rem"
        pt={{ base: '3rem', md: '7rem', lg: '0.8rem', '3xl': '1.2rem' }}
        w="20rem"
        height={{ base: 'unset', lg: '16rem', xl: '100%', '3xl': '100%' }}
        minHeight="16rem"
        position="relative"
        ml="-0.4rem"
        zIndex="1"
        overflow="visible"
        gap={{ base: '0.3rem', '3xl': '0.5rem' }}
        maxW="38rem">
        <Text
          variant="welcomeTitle"
          borderWidth="0 0 0 1px"
          borderStyle="solid"
          borderColor="mainColor"
          fontWeight="100"
          fontFamily="Roboto"
          mb="1rem"
          pl="0.7rem"
          ml="-0.7rem"
          whiteSpace="nowrap">
          Hello <br />
          {userName}
        </Text>
        <Flex
          mt="-0.5rem"
          mb="0.3rem"
          whiteSpace="nowrap"
          direction={{ base: 'column', md: 'row' }}>
          <Text variant="welcomeSecondary" mr="0.3rem">
            Today is
          </Text>
          <Text variant="welcomePrimary">
            {`${dayOfWeek}, ${dayOfMonth} ${monthName} ${year}`}
          </Text>
        </Flex>
        {contentMode === 'did_you_know' ? (
          isLoading ? (
            <Flex w="100%" justify="center" alignItems="center" minH="6rem">
              <Loader isSmall />
            </Flex>
          ) : error ? (
            <Text variant="welcomeSecondary">Error fetching fact</Text>
          ) : (
            <Flex direction="column" mb="2rem">
              <Flex
                alignItems="center"
                sx={{
                  '& svg': {
                    fill: 'welcomeIcon',
                    '&:hover': {
                      fill: 'welcomeIconHover',
                    },
                  },
                }}>
                <Text
                  variant="welcomeSecondary"
                  mr="0.5rem"
                  mb={{ base: '0.5rem', lg: '0.12rem' }}>
                  Did you know?
                </Text>
                <Flex onClick={refetchContent} cursor="pointer">
                  <Icon as={RefreshIcon} boxSize={7} />
                </Flex>
              </Flex>
              {isRefetchingContent ? (
                <Flex w="100%" justify="center" alignItems="center" minH="6rem">
                  <Loader isSmall />
                </Flex>
              ) : (
                <Text
                  variant="welcomeSecondary"
                  w="100%"
                  mb={{ base: '1.5rem', lg: 'unset' }}>
                  {fact}
                </Text>
              )}
            </Flex>
          )
        ) : isLoadingQuote || isLoading || isRefetchingContent ? (
          <Flex w="100%" justify="center" alignItems="center" minH="6rem">
            <Loader isSmall />
          </Flex>
        ) : errorQuote ? (
          <Text variant="welcomeSecondary">Error fetching quote</Text>
        ) : (
          <Flex direction="column">
            <Text variant="welcomeSecondary" w="100%">
              "{quote}"
            </Text>
            <Flex
              w="100%"
              justify="flex-end"
              textAlign="right"
              alignItems="center"
              mb="2rem">
              <Flex
                onClick={refetchContent}
                mr="0.4rem"
                pt="0.1rem"
                cursor="pointer"
                sx={{
                  '& svg': {
                    fill: 'welcomeIcon',
                    '&:hover': {
                      fill: 'welcomeIconHover',
                    },
                  },
                }}>
                <Icon as={RefreshIcon} boxSize={7} />
              </Flex>
              <Text
                variant="welcomeSecondary"
                display="inline"
                mt={{ base: '0.5rem', lg: '0.2rem' }}
                mr="0.3rem"
                ml="0.1rem">
                {author}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
