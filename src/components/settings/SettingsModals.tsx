import { useDisclosure } from '@chakra-ui/react';
import { EditUserData } from '@/components/modals/EditUserDataModal';
import { ClearAllData } from '@/components/modals/ClearAllDataModal';

interface SettingsModalsProps {
  onSettingsPanelClose: () => void;
}

export const SettingsModals: React.FC<SettingsModalsProps> = ({
  onSettingsPanelClose,
}) => {
  const {
    isOpen: isEditUserDataOpen,
    onOpen: onEditUserDataOpen,
    onClose: onEditUserDataClose,
  } = useDisclosure();
  const {
    isOpen: isClearAllDataOpen,
    onOpen: onClearAllDataOpen,
    onClose: onClearAllDataClose,
  } = useDisclosure();

  return (
    <>
      {isEditUserDataOpen && (
        <EditUserData
          onClose={() => {
            onEditUserDataClose();
            onSettingsPanelClose();
          }}
        />
      )}
      {isClearAllDataOpen && (
        <ClearAllData
          onClose={() => {
            onClearAllDataClose();
            onSettingsPanelClose();
          }}
        />
      )}
    </>
  );
};
