import { useNotepadStore } from '@/store/notepadStore';
import { plannerItemsDefault, usePlannerStore } from '@/store/plannerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useSnakeStore } from '@/store/snakeStore';
import { useUserStore } from '@/store/userStore';

export const clearAllData = () => {
  const notepadStore = useNotepadStore.getState();
  const plannerStore = usePlannerStore.getState();
  const settingsStore = useSettingsStore.getState();
  const snakeStore = useSnakeStore.getState();
  const userStore = useUserStore.getState();

  notepadStore.setStoreNote('');
  notepadStore.setIsNotepadModalConfirmed(false);
  plannerStore.setPlannerItems([]);
  settingsStore.resetSettings();
  snakeStore.setRecord(0);
  userStore.setName('');
  userStore.setCity('');

  localStorage.clear();

  const { setPlannerItems } = usePlannerStore.getState();
  setPlannerItems(plannerItemsDefault);
};
