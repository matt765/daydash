import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { ContentBox } from '@/theme/components/contentBox';
import { useSnakeStore } from '@/store/snakeStore';
import { useSettingsStore } from '@/store/settingsStore';

export const SnakeGame = () => {
  const [board, setBoard] = useState<any[][]>([]);
  const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
  const [direction, setDirection] = useState({ row: 0, col: 1 });
  const [food, setFood] = useState({ row: 5, col: 5 });
  const [score, setScore] = useState(0); //
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const { record, setRecord } = useSnakeStore();
  const [canChangeDirection, setCanChangeDirection] = useState(true);
  const { sliderValue } = useSettingsStore();
  const [newRecord, setNewRecord] = useState(false);
  const [shouldResultTitleAppear, setShouldResultTitleAppear] = useState(true);
  const [shouldIntroTitleAppear, setShouldIntroTitleAppear] = useState(true);

  const startGame = () => {
    if (!isGameRunning) {
      setIsGameRunning(true);
      setShouldResultTitleAppear(false);
      setShouldIntroTitleAppear(false);
      setGameOver(false);
      setRestart(false);
      if (gameOver) {
        resetGame();
      }
    }
  };
  const getIntervalFromSlider = (sliderValue: number) => {
    return (200 - (sliderValue / 100) * 180) * 0.5;
  };

  const resetGame = () => {
    setIsGameRunning(false);
    setGameOver(false);
    setScore(0);
    setSnake([{ row: 10, col: 10 }]);
    setDirection({ row: 0, col: 1 });
    setFood({ row: 5, col: 5 });
    initializeBoard();
    setRestart(true);
    setShouldIntroTitleAppear(true);
  };

  useEffect(() => {
    initializeBoard();
    generateFood();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGameRunning) {
        if (
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight'
        ) {
          startGame();
        } else {
          return;
        }
      }

      if (!canChangeDirection) return;

      if (
        e.key === 'ArrowUp' &&
        JSON.stringify(direction) !== JSON.stringify({ row: 1, col: 0 }) &&
        JSON.stringify(direction) !== JSON.stringify({ row: -1, col: 0 })
      ) {
        setDirection({ row: -1, col: 0 });
        setCanChangeDirection(false);
      }
      if (
        e.key === 'ArrowDown' &&
        JSON.stringify(direction) !== JSON.stringify({ row: -1, col: 0 }) &&
        JSON.stringify(direction) !== JSON.stringify({ row: 1, col: 0 })
      ) {
        setDirection({ row: 1, col: 0 });
        setCanChangeDirection(false);
      }
      if (
        e.key === 'ArrowLeft' &&
        JSON.stringify(direction) !== JSON.stringify({ row: 0, col: 1 }) &&
        JSON.stringify(direction) !== JSON.stringify({ row: 0, col: -1 })
      ) {
        setDirection({ row: 0, col: -1 });
        setCanChangeDirection(false);
      }
      if (
        e.key === 'ArrowRight' &&
        JSON.stringify(direction) !== JSON.stringify({ row: 0, col: -1 }) &&
        JSON.stringify(direction) !== JSON.stringify({ row: 0, col: 1 })
      ) {
        setDirection({ row: 0, col: 1 });
        setCanChangeDirection(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameRunning, gameOver, direction, canChangeDirection]);

  useEffect(() => {
    if (gameOver) {
      if (score > record) {
        setNewRecord(true);
        setRecord(score);
        useSnakeStore.getState().setRecord(score);
      } else {
        setNewRecord(false);
        setShouldResultTitleAppear(true);
      }
    }
  }, [gameOver]);

  useEffect(() => {
    setShouldResultTitleAppear(true);
  }, [newRecord]);
  useEffect(() => {
    const moveSnake = () => {
      if (!isGameRunning || gameOver) return;

      const newHead = {
        row: snake[0].row + direction.row,
        col: snake[0].col + direction.col,
      };

      // Check if the snake has collided with itself
      if (isSnake(newHead.row, newHead.col)) {
        console.log('Game over! You collided with your body.');
        setIsGameRunning(false);
        setGameOver(true);
        return;
      }

      // Check if the snake has collided with a wall
      if (
        newHead.row < 0 ||
        newHead.row >= board.length ||
        newHead.col < 0 ||
        newHead.col >= board[0].length
      ) {
        console.log('Game over! You collided with a wall.');
        setIsGameRunning(false);
        setGameOver(true);
        return;
      }
      if (newHead.row === food.row && newHead.col === food.col) {
        // Generate new food
        generateFood();
        // Increment score by 10
        setScore(score + 10);
      } else {
        // Remove the tail if the snake hasn't eaten food
        snake.pop();
      }

      // Add the new head to the snake
      snake.unshift(newHead);
      setSnake([...snake]);

      // Allow changing direction after the snake has moved
      setCanChangeDirection(true);
    };

    let interval: any;

    if (isGameRunning && !gameOver) {
      interval = setInterval(moveSnake, getIntervalFromSlider(sliderValue));
    }

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction, food, isGameRunning, gameOver]);

  const initializeBoard = () => {
    const newBoard: any[][] = [];
    for (let row = 0; row < 20; row++) {
      newBoard.push([]);
      for (let col = 0; col < 30; col++) {
        // Change the number of columns to 30
        newBoard[row].push(null);
      }
    }
    setBoard(newBoard);
  };

  const isSnake = (row: number, col: number) => {
    return snake.some((segment) => segment.row === row && segment.col === col);
  };

  const generateFood = () => {
    let newFoodPosition;

    do {
      newFoodPosition = {
        row: Math.floor(Math.random() * 20),
        col: Math.floor(Math.random() * 30), // Change the random column generation multiplier to 30
      };
    } while (isSnake(newFoodPosition.row, newFoodPosition.col));

    setFood(newFoodPosition);
  };

  const isFood = (row: number, col: number) => {
    return food.row === row && food.col === col;
  };
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
          <Text fontSize="1.5rem" ml="">
            {gameOver && shouldResultTitleAppear && newRecord && 'New record!'}
            {gameOver && !newRecord && shouldResultTitleAppear && 'Game over!'}
            {shouldIntroTitleAppear && "Let's play!"}
          </Text>
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
