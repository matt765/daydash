import { Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import { CheckIcon } from '@/assets/icons/CheckIcon';

interface PlannerItemProps {
  item: { text: string; isCrossed: boolean };
  onDelete: () => void;
  toggleCrossed: () => void;
  onSave: (newText: string) => void;
}

export const PlannerItem = ({
  item,
  onDelete,
  toggleCrossed,
  onSave,
}: PlannerItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const taskRef = useRef<HTMLDivElement>(null);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e === null || e.key === 'Enter') {
      setIsEditing(false);
      onSave(editedText);
    }
  };

  useClickOutside(taskRef, () => {
    if (isEditing) {
      handleSave(null);
    }
  });

  return (
    <Flex
      ref={taskRef}
      w="100%"
      borderRadius={{ base: '10px', lg: '12px' }}
      alignItems="center"
      justify="space-between"
      cursor="pointer"
      bg={item.isCrossed ? 'plannerItemCrossedBg' : 'plannerItemBg'}
      _hover={{
        bg: item.isCrossed ? 'plannerItemCrossedHoverBg' : 'plannerItemHoverBg',
      }}
      h={{ base: 'auto', xl: '3rem' }}
      minH="3rem"
      py="0.5rem"
      pr={{ base: '1rem', xl: '2rem' }}
      pl="1.3rem"
      onClick={!isEditing ? toggleCrossed : undefined}
      mb="0.75rem"
      transition="0.2s">
      <Flex
        w="100%"
        pr="2rem"
        sx={{
          '& input': {
            boxShadow: 'none !important',
            borderWidth: '0px !important',
          },
        }}
        overflow="hidden">
        <Flex
          as="span"
          mr="0.7rem"
          color={item.isCrossed ? 'rgba(73,194,79,0.3)' : 'rgba(73,194,79,0.9)'}
          justify="center"
          alignItems="flex-start"
          pt="0.25rem"
          h="100%">
          ✓
        </Flex>
        {isEditing ? (
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleSave}
            autoFocus
            maxLength={60}
            w="100%"
            fontSize="1.25rem"
            fontWeight="400"
            color="primaryText"
            ml="-1rem"
            h="100%"
          />
        ) : (
          <Text
            variant="plannerItem"
            color={item.isCrossed ? 'disabledText' : 'primaryText'}
            h="100%"
            textDecoration={item.isCrossed ? 'line-through' : 'none'}>
            {item.text}
          </Text>
        )}
      </Flex>
      <Flex
        alignItems="center"
        justify="center"
        sx={{
          '& svg': {
            width: { base: '20px', lg: '25px' },
            height: { base: '20px', lg: '25px' },
            color: 'plannerItemIcon',
            fill: 'plannerItemIcon',
          },
        }}>
        <Flex onClick={handleEdit} mr="0.7rem">
          {isEditing ? (
            <Flex>
              <Flex
                sx={{
                  '& svg': {
                    width: { base: '25px', lg: '30px' },
                    height: { base: '25px', lg: '30px' },
                    color: 'red.400',
                    fill: 'red.400',
                  },
                }}
                mr="0.2rem"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setEditedText(item.text);
                }}>
                <Icon
                  as={CloseIcon}
                  boxSize={7}
                  transition="0.2s"
                  onClick={() => handleSave(null)}
                />
              </Flex>
              <Flex
                sx={{
                  '& svg': {
                    width: { base: '25px', lg: '30px' },
                    height: { base: '25px', lg: '30px' },
                    color: 'lightgreen',
                    fill: 'lightgreen',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(null);
                }}>
                <Icon as={CheckIcon} boxSize={7} transition="0.2s" />
              </Flex>
            </Flex>
          ) : (
            <Flex
              sx={{
                '&:hover': {
                  '& svg': {
                    color: 'plannerItemIconHover',
                    fill: 'plannerItemIconHover',
                  },
                },
              }}>
              <Icon as={EditIcon} boxSize={7} />
            </Flex>
          )}
        </Flex>
        <Flex
          onClick={(e) => {
            e.stopPropagation();
            if (!isEditing) {
              onDelete();
            }
          }}
          sx={{
            '&:hover': {
              '& svg': {
                color: 'plannerItemIconHover',
                fill: 'plannerItemIconHover',
              },
            },
          }}>
          <Icon as={DeleteIcon} boxSize={7} transition="0.2s" />
        </Flex>
      </Flex>
    </Flex>
  );
};
