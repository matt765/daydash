// usePlanner.ts
import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { usePlannerStore } from '../store/plannerStore';

interface PlannerItem {
  text: string;
  isCrossed: boolean;
}

interface UsePlanner {
  plannerItems: PlannerItem[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addTask: (e: React.FormEvent) => void;
  updateTask: (index: number, newText: string) => void;
  toggleCrossed: (index: number) => void;
  removeTask: (index: number) => void;
  onDragEnd: (result: DropResult) => void;
  loading: boolean;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
}

export const usePlanner = (): UsePlanner => {
  const [plannerItems, setPlannerItems] = usePlannerStore((state) => [
    state.plannerItems,
    state.setPlannerItems,
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const [showTooltip, setShowTooltip] = useState(false);
  const reorder = (
    list: PlannerItem[],
    startIndex: number,
    endIndex: number
  ): PlannerItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && !plannerItems.some((item) => item.text === inputValue)) {
      const newPlannerItems = [
        ...plannerItems,
        {
          text: inputValue,
          isCrossed: false,
        },
      ];
      setPlannerItems(newPlannerItems);
      setInputValue('');
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
    }
  };
  

  const updateTask = (index: number, newText: string) => {
    const newPlannerItems = plannerItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          text: newText,
        };
      }
      return item;
    });
    setPlannerItems(newPlannerItems);
  };

  const removeTask = (index: number) => {
    const newPlannerItems = plannerItems.filter((_, i) => i !== index);
    setPlannerItems(newPlannerItems);
  };

  const toggleCrossed = (index: number) => {
    const newPlannerItems = plannerItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isCrossed: !item.isCrossed,
        };
      }
      return item;
    });
    setPlannerItems(newPlannerItems);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      plannerItems,
      result.source.index,
      result.destination.index
    );
    setPlannerItems(items);
  };

  return {
    plannerItems,
    inputValue,
    loading,
    setInputValue,
    addTask,
    updateTask,
    toggleCrossed,
    removeTask,
    onDragEnd,
    showTooltip,
    setShowTooltip
  };
};
