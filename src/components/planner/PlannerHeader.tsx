import { Box, Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

interface PlannerHeaderProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addTask: (e: React.FormEvent) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
}

export const PlannerHeader = ({
  inputValue,
  setInputValue,
  addTask,
  showTooltip,
  setShowTooltip,
}: PlannerHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowTooltip(false));

  return (
    <form onSubmit={addTask}>
      <Flex
        w="100%"
        gap={{ base: '1rem', lg: '2rem' }}
        mb={{ base: '1rem', lg: '0.85rem', '3xl': '1.2rem' }}
        h={{ base: 'auto', lg: '2.5rem', '3xl': '3rem' }}
        alignItems="center">
        <Tooltip
          hasArrow
          label="This task is already on the list!"
          bg="gray.300"
          color="black"
          isOpen={showTooltip}
          ref={ref}>
          <Input
            flex="1"
            placeholder="Add new task"
            bg="plannerInputBg"
            borderWidth="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            h="100%"
            minH={{ base: '3.5rem', lg: 'unset' }}
            required
            borderRadius="12px"
            _hover={{ bg: 'plannerInputHoverBg' }}
            _placeholder={{ color: 'rgb(255,255,255,0.7)' }}
            _focusVisible={{ borderWidth: '0 !important' }}
            maxLength={80}
            fontSize={{ base: '0.9rem', '3xl': '1rem' }}
          />
        </Tooltip>
        <Button
          variant="transparent"
          flexBasis={{ base: '4rem', lg: '12rem', '3xl': '15rem' }}
          type="submit"
          h={{ base: '2.5rem', '3xl': '3rem' }}
          fontSize={{ base: '0.8rem', '3xl': '0.9rem' }}
          >
          <Box display={{ base: 'none', lg: 'unset' }}>Add task</Box>
          <Box display={{ base: 'unset', lg: 'none' }} fontSize="2rem">
            +
          </Box>
        </Button>
      </Flex>
    </form>
  );
};
