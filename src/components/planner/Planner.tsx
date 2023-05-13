import { Flex, Spinner } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

import { usePlanner } from '../../hooks/usePlanner';
import { Loader } from '../loader/Loader';
import { PlannerHeader } from './PlannerHeader';
import { PlannerItem } from './PlannerItem';

interface PlannerProps {
  firstMount?: boolean;
}

export const Planner = ({ firstMount }: PlannerProps) => {
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: firstMount ? 0.3 : 0 }}
        style={{
          width: '100%',
          overflow: plannerItems.length < 6 ? 'visible' : 'auto',
        }}>
        <Flex
          direction="column"
          w="100%"          
          pr="1rem"
          position="relative"
          zIndex="1">
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
      </motion.div>
    </>
  );
};
