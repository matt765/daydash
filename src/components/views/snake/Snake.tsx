'use client';

import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { useSnake } from '@/hooks/useSnake';
import { PageWrapper } from '@/components/common/PageWrapper';

export const SnakeGame = () => {
  const {
    board,
    score,
    isGameRunning,
    gameOver,
    record,
    newRecord,
    shouldResultTitleAppear,
    shouldIntroTitleAppear,
    startGame,
    resetGame,
    isSnake,
    isFood,
    colorMode,
  } = useSnake();

  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100%"
      alignItems="center"
      marginTop="-1.5rem"
      position="relative">
      <Flex
        justify="center"
        gap="3rem"
        alignItems="center"
        w="100%"
        px={{ base: '10rem', '2xl': '7.5rem' }}
        position="relative"
        zIndex="1">
        <Flex
          mt={4}
          fontSize={{ base: '1rem', '3xl': '1.1rem' }}
          bg="contentBg"
          p="0.7rem"
          mb="0.5rem"
          borderRadius="10px"
          px="1rem"
          w="11rem"
          textAlign="center"
          justify="Center"
          whiteSpace="nowrap">
          Score: {score}
        </Flex>
        <Text
          fontSize={{ base: '1.2rem', '3xl': '1.5rem' }}
          w="14rem"
          textAlign="center">
          {gameOver && shouldResultTitleAppear && newRecord && 'New record!'}
          {gameOver && !newRecord && shouldResultTitleAppear && 'Game over!'}
          {shouldIntroTitleAppear && "Let's play!"}
        </Text>
        <Flex
          mt={6}
          fontSize={{ base: '1rem', '3xl': '1.1rem' }}
          bg="contentBg"
          p="0.7rem"
          mb="1rem"
          borderRadius="10px"
          px="1rem"
          w="10rem"
          textAlign="center"
          justify="Center">
          Record: {record}
        </Flex>
      </Flex>
      <Flex
        borderWidth="1px !important"
        borderStyle="solid"
        borderColor="snakeMainBorder"
        direction="column"
        mb={{ base: '1.5rem', '3xl': '2rem' }}
        position="relative"
        zIndex="1">
        {board.map((row, rowIndex) => (
          <Box key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => (
              <Box
                key={colIndex}
                width={{ base: '21px', '3xl': '27px' }}
                height={{ base: '21px', '3xl': '27px' }}
                bg={
                  isSnake(rowIndex, colIndex)
                    ? 'green.500'
                    : isFood(rowIndex, colIndex)
                    ? 'red.500'
                    : 'snakeSquareBg'
                }
                border="1px solid"
                borderColor="snakeSquareBorder"
              />
            ))}
          </Box>
        ))}
      </Flex>
      {/* Render score */}
      {board.length > 0 && (
        <Flex>
          <Button
            onClick={isGameRunning || gameOver ? resetGame : startGame}
            bgColor={
              isGameRunning
                ? 'snakeRestartButtonBg'
                : gameOver
                ? 'snakeRestartButtonBg'
                : 'snakeStartButtonBg'
            }
            color="rgb(255,255,255,0.9) !important"
            _hover={{
              backgroundColor: isGameRunning
                ? 'snakeRestartButtonHoverBg'
                : gameOver
                ? 'snakeRestartButtonHoverBg'
                : 'snakeStartButtonHoverBg',
            }}
            w={{ base: '8rem', '3xl': '9rem' }}
            h={{ base: '2.2rem', '3xl': '2.5rem' }}
            fontSize={{ base: '0.8rem', '3xl': '1rem' }}
            mr={4}>
            {isGameRunning
              ? 'Restart game'
              : gameOver
              ? 'Restart game'
              : 'Start game'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
