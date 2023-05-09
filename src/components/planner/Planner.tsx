import { Flex, Spinner } from '@chakra-ui/react';
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
    setShowTooltip
  } = usePlanner();

  if (loading) {
    <Loader />;
  }

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflow={plannerItems.length < 6 ? 'visible' : 'auto'}
        pr="1rem"
        position="relative"
        zIndex="1"
        >
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
                w="100%"
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
