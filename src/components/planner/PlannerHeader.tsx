import { usePlanner } from '@/hooks/usePlanner';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef } from 'react';

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
      <Flex w="100%" gap="2rem" mb="1.2rem" h="3rem" alignItems="center">
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
            required
            borderRadius="15px"
            _hover={{ bg: 'plannerInputHoverBg' }}
            _placeholder={{ color: 'secondaryText' }}
            _focusVisible={{ borderWidth: '0 !important' }}
            maxLength={80}
          />
        </Tooltip>
        <Button variant="transparent" flexBasis="15rem" type="submit" h="3rem">
          Add task
        </Button>
      </Flex>
    </form>
  );
};
