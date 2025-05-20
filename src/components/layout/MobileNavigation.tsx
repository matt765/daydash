import { CheckIcon } from '@/assets/icons/CheckIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { HomeIcon } from '@/assets/icons/HomeIcon';
import { PlannerMobileIcon } from '@/assets/icons/PlannerMobileIcon';
import { SettingsIcon } from '@/assets/icons/SettingsIcon';
import { WeatherMobileIcon } from '@/assets/icons/WeatherMobileIcon';
import { ViewType } from '@/hooks/useHomepage';
import { useMobileViewStore } from '@/store/mobileViewStore';
import { Flex, Icon, Text } from '@chakra-ui/react';

interface NavigationItemProps {
  title: String;
  viewName: ViewType;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onNavItemClick: (viewName: ViewType) => void;
  isSettingsPanelOpen: boolean;
  onSettingsPanelClose: () => void;
  onEditUserDataClose: () => void;
  onClearAllDataClose: () => void;
}

const NavigationItem = ({
  title,
  viewName,
  icon,
  onNavItemClick,
  isSettingsPanelOpen,
  onSettingsPanelClose,
  onEditUserDataClose,
  onClearAllDataClose,
}: NavigationItemProps) => (
  <Flex
    w="20%"
    justify="center"
    color="black"
    alignItems="center"
    direction="column"
    h="100%"
    fontWeight="700"
    onClick={() => {
      if (isSettingsPanelOpen && title !== 'Settings') {
        onSettingsPanelClose();
      }
      onEditUserDataClose();
      onClearAllDataClose();
      onNavItemClick(viewName);
    }}
    cursor="pointer"
    sx={{
      '& svg': {
        fill: title !== 'Settings' && 'rgb(166, 166, 166)',
        stroke: title === 'Settings' && 'rgb(166, 166, 166)',
        width: title === 'Task list' ? '1.2rem' : '1.4rem',
        height: title === 'Task list' ? '1.2rem' : '1.4rem',
      },
    }}
    _hover={{
      backgroundColor: 'mobileNavigationHoverBg',
    }}>
    <Icon as={icon} />
    <Text
      color="secondaryText"
      mt={title === 'Task list' ? '0.55rem' : '0.35rem'}
      fontSize="0.65rem"
      letterSpacing="1px"
      fontFamily="Quicksand"
      textTransform="uppercase">
      {title}
    </Text>
  </Flex>
);

const navigationItems = [
  { title: 'Home', viewName: 'mobileHome' as ViewType, icon: HomeIcon },
  {
    title: 'Weather',
    viewName: 'mobileWeather' as ViewType,
    icon: WeatherMobileIcon,
  },
  {
    title: 'Task list',
    viewName: 'mobilePlanner' as ViewType,
    icon: PlannerMobileIcon,
  },
  { title: 'Notepad', viewName: 'notepad' as ViewType, icon: EditIcon },
  { title: 'Settings', viewName: 'settings' as ViewType, icon: SettingsIcon },
];

interface MobileNavigationProps {
  handleViewChange?: (view: ViewType, deviceType: 'mobile' | 'desktop') => void;
  openDrawer: () => void;
  isSettingsPanelOpen: boolean;
  onSettingsPanelClose: () => void;
  mobileView?: string;
  onEditUserDataClose: () => void;
  onClearAllDataClose: () => void;
}

export const MobileNavigation = ({
  handleViewChange,
  openDrawer,
  isSettingsPanelOpen,
  onSettingsPanelClose,
  mobileView,
  onEditUserDataClose,
  onClearAllDataClose,
}: MobileNavigationProps) => {
  const { setMobileView } = useMobileViewStore();

  const handleNavItemClick = (viewName: ViewType) => {
    if (viewName === 'settings') {
      openDrawer();
    } else {
      setMobileView(viewName);

      if (handleViewChange) {
        handleViewChange(viewName, 'mobile');
      }
    }
  };

  return (
    <Flex
      display={{ base: 'flex', xl: 'none' }}
      w="100%"
      h="5rem"
      position="fixed"
      bottom="0"
      borderWidth="1px 0 0 0"
      borderStyle="solid"
      borderColor="rgb(255,255,255,0.15)"
      left="0"
      bg="mobileNavigationBg"
      zIndex="999999"
      sx={{
        '& > :not(:last-child)': {
          borderWidth: '0 1px 0 0',
          borderStyle: 'solid',
          borderColor: 'rgb(255,255,255,0.15)',
        },
      }}>
      {navigationItems.map((item, index) => (
        <NavigationItem
          title={item.title}
          viewName={item.viewName}
          key={`${index}-${item.title}`}
          icon={item.icon}
          onNavItemClick={handleNavItemClick}
          isSettingsPanelOpen={isSettingsPanelOpen}
          onSettingsPanelClose={onSettingsPanelClose}
          onEditUserDataClose={onEditUserDataClose}
          onClearAllDataClose={onClearAllDataClose}
        />
      ))}
    </Flex>
  );
};
