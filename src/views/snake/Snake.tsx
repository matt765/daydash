import React from 'react';
import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';

import { ContentBox } from '@/theme/components/contentBox';
import { useSnake } from '@/hooks/useSnake';

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
  } = useSnake();

  const { colorMode } = useColorMode();

  return (
    <ContentBox
      flexDirection="column"
      w="100%"
      h="100%"
      alignItems="center"
      position="relative">
      <Flex
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        bottom="0"
        zIndex="0"
        ml="-1rem"
        backdropFilter={colorMode === 'dark' ? 'blur(24px)' : ''}
        borderRadius="15px"
      />
      <Flex
        justify="space-between"
        alignItems="Center"
        w="100%"
        px="7rem"
        position="relative"
        zIndex="1">
        <Flex
          mt={4}
          fontSize="1.7rem"
          bg="contentBg"
          p="0.7rem"
          mb="1rem"
          borderRadius="10px"
          px="1rem"
          w="11rem"
          textAlign="center"
          justify="Center"
          whiteSpace="nowrap">
          Score: {score}
        </Flex>
        <Text fontSize="1.5rem" ml="">
          {gameOver && shouldResultTitleAppear && newRecord && 'New record!'}
          {gameOver && !newRecord && shouldResultTitleAppear && 'Game over!'}
          {shouldIntroTitleAppear && "Let's play!"}
        </Text>
        <Flex
          mt={6}
          fontSize="1.2rem"
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
        mb="2rem"
        position="relative"
        zIndex="1">
        {board.map((row, rowIndex) => (
          <Box key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => (
              <Box
                key={colIndex}
                width="27px"
                height="27px"
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
            mr={4}>
            {isGameRunning
              ? 'Restart game'
              : gameOver
              ? 'Restart game'
              : 'Start game'}
          </Button>
        </Flex>
      )}
    </ContentBox>
  );
};
