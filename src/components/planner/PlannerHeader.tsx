import {
  Button, Flex, Input
} from '@chakra-ui/react'
import React from 'react'

interface PlannerHeaderProps {
  inputValue: string;
  setInputValue: (value: string) => void; 
  addTask: (e: React.FormEvent) => void;
}

export const PlannerHeader = ({
  inputValue, setInputValue, addTask
}: PlannerHeaderProps) => {
  return (
    <form onSubmit={addTask}>
      <Flex
        w="100%"
        gap="2rem"
        mb="1.2rem"
        h="3rem"
        alignItems="center"
      >
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
        <Button
          variant="transparent"
          flexBasis="15rem"
          type="submit"
          h="3rem"
        >
          Add task
        </Button>
      </Flex>
    </form>
  )
}
