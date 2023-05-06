import { Flex, Icon, Text } from '@chakra-ui/react';

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
    loadingContent,
    refetchContent,
  } = useWelcome();

  if (isLoading) {
    return <Loader />;
  }

  const handleRefreshClick = () => {
    refetchContent();
  };

  const renderContent = () => {
    if (contentMode === 'did_you_know') {
      if (loadingContent || isLoading) {
        return <Flex pt="1.4rem" pl="1rem"><Loader isSmall /></Flex>;
      } else if (error) {
        return <Text variant="welcomeSecondary">Error fetching fact</Text>;
      } else {
        return <Text variant="welcomeSecondary">{fact}</Text>;
      }
    } else {
      if (loadingContent || isLoadingQuote) {
        return <Loader isSmall />;
      } else if (errorQuote) {
        return <Text variant="welcomeSecondary">Error fetching quote</Text>;
      } else {
        return (
          <>
            <Text variant="welcomeSecondary">"{quote}"</Text>
            <Text variant="welcomeSecondary" w="100%" textAlign="right">
              ~ {author}
            </Text>
          </>
        );
      }
    }
  };
  
  return (
    <Flex direction="column" paddingLeft="1rem" pt="1.5rem">
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
        lineHeight="3.5rem">
        Hello <br />
        {userName}
      </Text>
      <Flex mb="0.8rem">
        <Text variant="welcomeSecondary" mr="0.3rem">
          Today is
        </Text>
        <Text variant="welcomePrimary">
          {`${dayOfWeek}, ${dayOfMonth} ${monthName} ${year}`}
        </Text>
      </Flex>
      {contentMode === 'did_you_know' ? (
        isLoading ? (
          <Loader isSmall />
        ) : error ? (
          <Text variant="welcomeSecondary">Error fetching fact</Text>
        ) : (
          <Flex direction="column">
            <Flex
              alignItems="center"
              sx={{
                '& svg': {
                  fill: 'weatherIcon',
                  cursor: 'pointer',
                  '&:hover': {
                    fill: 'weatherIconHover',
                  },
                },
              }}>
              <Text variant="welcomeSecondary" mr="0.5rem">
                {contentMode === 'did_you_know'
                  ? 'Did you know?'
                  : 'Inspiring Quote'}
              </Text>
              <Flex onClick={handleRefreshClick}>
                <Icon as={RefreshIcon} boxSize={7} cursor="pointer" />
              </Flex>
            </Flex>
            {renderContent()}
          </Flex>
        )
      ) : isLoadingQuote ? (
        <Loader isSmall />
      ) : errorQuote ? (
        <Text variant="welcomeSecondary">Error fetching quote</Text>
      ) : (
        <Flex direction="column">
          <Text variant="welcomeSecondary">"{quote}"</Text>
          <Text variant="welcomeSecondary" w="100%" textAlign="right">
            ~ {author}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
