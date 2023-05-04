import { Box, Button, Flex, Select } from '@chakra-ui/react';

import { SettingsSection } from './SettingsSection';
import { SettingsTitle } from './SettingsTitle';
import { SettingsSectionRow } from './SettingsSectionRow';
import { SettingsGithub } from './SettingsGithub';
import { SettingsSlider } from './SettingsSlider';
import { useSettings } from '@/hooks/useSettings';

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
  } = useSettings();

  return (
    <>
      <Flex
        height="100%"
        paddingBottom="7.5rem"
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
            <Select
              value={colorMode}
              cursor="pointer"
              onChange={(e) => handleThemeChange(e.target.value)}
              borderColor="rgb(255,255,255,0.2)"
              variant="outline">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
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
          <SettingsSection>
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
          <SettingsSection>
            <SettingsTitle title="Application data" />
            <Flex gap="1rem">
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
