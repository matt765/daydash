import { Box, Button, Flex, Icon, Select, Tooltip } from '@chakra-ui/react';

import { SettingsSection } from './SettingsSection';
import { SettingsTitle } from './SettingsTitle';
import { SettingsSectionRow } from './SettingsSectionRow';
import { SettingsGithub } from './SettingsGithub';
import { SettingsSlider } from './SettingsSlider';
import { useSettings } from '@/hooks/useSettings';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon';
import { PictureIcon } from '@/assets/icons/PictureIcon';
import useSettingsStore from '@/store/settingsStore';

interface SettingsContentProps {
  onEditUserData: () => void;
  onClearAllData: () => void;
  onCloseSettings: () => void;
}

export const SettingsContent = ({
  onEditUserData,
  onCloseSettings,
  onClearAllData,
}: SettingsContentProps) => {
  const {
    colorMode,
    isFullPlannerVisible,
    useFahrenheit,
    welcomeSectionContent,
    showSnakeButton,
    handleUseFahrenheitChange,
    handleFullPlannerVisibleChange,
    handleShowSnakeButtonChange,
    handleRadioChange,
    handleThemeChange,
    theme,
    setThemeValue,
  } = useSettings();
  const { isImageVisible, setIsImageVisible } = useSettingsStore(
    (state) => state
  );
  const handleArrowClick = () => {
    const themeOrder = [
      'light_basicTheme',
      'dark_basicTheme',
      'light_extendedTheme',
      'dark_extendedTheme',
    ];
    const currentIndex = themeOrder.indexOf(`${colorMode}_${theme}`);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];
    handleThemeChange(nextTheme);
    setThemeValue(nextTheme);
  };
  return (
    <>
      <Flex
        height="100%"
        paddingBottom="7rem"
        sx={{
          direction: 'column',
          flexWrap: 'wrap',
          '& *': {
            fontFamily: 'Inter',
          },
          width: '100%',
        }}>
        <SettingsSection paddingBottom="1rem">
          <Box
            mb="0.2rem"
            sx={{
              fontSize: '1.4rem',
              color: 'rgb(255,255,255,0.8)',
              paddingLeft: '0.3rem',
            }}>
            Settings
          </Box>
        </SettingsSection>
        <Box width="100%" overflow="auto" height="100%" pb="1rem">
          <SettingsSection paddingBottom="1.6rem">
            <SettingsTitle title="Theme" />
            <Flex>
              <Select
                w="90%"
                value={`${colorMode}_${theme}`}
                cursor="pointer"
                onChange={(e) => handleThemeChange(e.target.value)}
                borderColor="rgb(255,255,255,0.2)"
                variant="outline"
                backgroundColor="settingsBg"
                sx={{
                  '& option': {
                    backgroundColor: 'settingsBg',
                    cursor: 'pointer',
                  },
                }}
                _hover={{
                  borderColor: 'mainColor',
                }}>
                <option value="light_basicTheme"> Mountains</option>
                <option value="dark_basicTheme">Cyberpunk</option>
                <option value="light_extendedTheme">Post-apo</option>
                <option value="dark_extendedTheme">Fairytale</option>
              </Select>
              <Tooltip
                label="Remove background"
                fontSize="md"
                placement="top-start"
                px="0.7rem"
                py="0.4rem"
                borderRadius="5px"
                color="primaryText"
                mb="0.3rem"               
                bg="rgba(87, 96, 123, 0.3)"
                >
                <Flex
                  justify="center"
                  alignItems="center"
                  w="1.5rem"
                  h="100%"
                  mt="0.4rem"
                  ml="0.9rem"
                  mr="0.2rem"
                  onClick={() => setIsImageVisible(!isImageVisible)}
                  cursor="pointer"
                  sx={{
                    '& svg': {
                      fill: 'rgb(255,255,255,0.5)',
                    },
                  }}
                  _hover={{
                    '& svg': {
                      fill: 'rgb(255,255,255,0.8)',
                    },
                  }}>
                  <Icon as={PictureIcon} boxSize={5} />
                </Flex>
              </Tooltip>
              <Flex
                w="10%"
                justify="center"
                alignItems="center"
                pl="0.7rem"
                cursor="pointer"
                onClick={handleArrowClick}
                sx={{
                  '& svg': {
                    transform: 'rotate(-90deg)',
                    fill: 'primaryText',
                    minWidth: '18px',
                    minHeight: '18px',
                  },
                }}>
                <Icon
                  as={ArrowLeftIcon}
                  transform="rotate(90deg)"
                  boxSize={6}
                />
              </Flex>
            </Flex>
          </SettingsSection>
          <SettingsSection>
            <SettingsTitle title="Greeting" />
            <SettingsSectionRow
              type="radio"
              options={[
                { label: 'Did you know?', value: 'did_you_know' },
                { label: 'Quotes', value: 'quotes' },
              ]}
              checkedValue={welcomeSectionContent}
              onRadioChange={handleRadioChange}
            />
          </SettingsSection>
          <SettingsSection>
            <SettingsTitle title="Weather forecast" />
            <SettingsSectionRow
              name="Use Fahrenheit"
              type="switch"
              isChecked={useFahrenheit}
              onSwitchChange={handleUseFahrenheitChange}
            />
          </SettingsSection>
          <SettingsSection>
            <SettingsTitle title="Planner" />
            <SettingsSectionRow
              name="Show full height"
              type="switch"
              isChecked={isFullPlannerVisible}
              onSwitchChange={handleFullPlannerVisibleChange}
            />
          </SettingsSection>
          <SettingsSection display={{ base: "none", lg: "flex"}}>
            <SettingsTitle title="Snake game" />
            <SettingsSectionRow
              name="Show snake button"
              type="switch"
              isChecked={showSnakeButton}
              onSwitchChange={handleShowSnakeButtonChange}
            />
            <Flex fontSize="1rem" color="rgb(255,255,255,0.9)" pl="0.5rem">
              Snake speed
            </Flex>
            <Flex maxW="92%" pl="0.6rem">
              <SettingsSlider />
            </Flex>
          </SettingsSection>
          <SettingsSection >
            <SettingsTitle title="Application data" />
            <Flex gap="1rem" mb="1rem">
              <Button
                variant="settingsUserData"
                w="100%"
                h="3rem"
                onClick={() => {
                  onEditUserData();
                  onCloseSettings();
                }}>
                Edit user data
              </Button>
              <Button
                variant="settingsUserData"
                w="100%"
                h="3rem"
                onClick={() => {
                  onClearAllData();
                  onCloseSettings();
                }}>
                Clear all data
              </Button>
            </Flex>
          </SettingsSection>
        </Box>
        <SettingsGithub />
      </Flex>
    </>
  );
};
