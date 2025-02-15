import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { usePlanner } from '../../hooks/usePlanner';
import { Loader } from '../loader/Loader';
import { PlannerHeader } from './PlannerHeader';
import { PlannerItem } from './PlannerItem';

export const Planner = () => {
  const {
    plannerItems,
    inputValue,
    setInputValue,
    addTask,
    updateTask,
    toggleCrossed,
    removeTask,
    onDragEnd,
    loading,
    showTooltip,
    setShowTooltip,
  } = usePlanner();

  if (loading) {
    <Loader />;
  }

  const [isLaptop] = useMediaQuery(
    '(min-width: 992px) and (max-width: 1632px)'
  );

  const numberOfItems = isLaptop ? 6 : 6;

  return (
    <>
      <Flex
        direction="column"
        w={{ base: '100%', xl: '100%' }}
        justifyContent={{ base: 'flex-start', md: 'center', xl: 'unset' }}
        alignItems="center"
        pr={{ base: '0.5rem', '3xl': '1rem' }}
        pl={{ base: 'unset', lg: '0.3rem' }}
        position="relative"
        overflow={plannerItems.length < numberOfItems ? 'visible' : 'auto'}
        zIndex="1"
        ml={{ base: '-0.3rem', '3xl': '0' }}
        mt={{ base: '-0.3rem', '3xl': '0' }}
        sx={{
          form: {
            width: { base: '100%', md: '70vw', xl: '100%' },
          },
        }}>
        <PlannerHeader
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTask={addTask}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Flex
                direction="column"
                gap={{ base: '0.5rem', xl: '0' }}
                w={{ base: '100%', md: '70vw', xl: '100%' }}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {plannerItems.map((item, index) => (
                  <Draggable
                    key={`${item.text}-${index}`}
                    draggableId={`${item.text}-${index}`}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <PlannerItem
                          item={item}
                          onDelete={() => removeTask(index)}
                          toggleCrossed={() => toggleCrossed(index)}
                          onSave={(newText) => updateTask(index, newText)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
    </>
  );
};
