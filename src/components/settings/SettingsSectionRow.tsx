import { Box, Flex, Switch, Radio, RadioGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  name?: string;
  type: string;
  isChecked?: boolean;
  section?: string;
  property?: string;
  onSwitchChange?: () => void;
  options?: Array<{ label: string; value: string }>;
  currentValue?: string;
  onRadioChange?: (value: string) => void;
  checkedValue?: string;
}

export const SettingsSectionRow = ({
  name,
  type,
  options,
  isChecked,
  onSwitchChange,
  onRadioChange,
  checkedValue,
}: Props) => {
  const [radioValue, setRadioValue] = useState<string>(checkedValue || '');

  useEffect(() => {
    setRadioValue(checkedValue || '');
  }, [checkedValue]);

  const handleChange = (value: string) => {
    setRadioValue(value);
    if (onRadioChange) {
      onRadioChange(value);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingLeft: '0.5rem',
        paddingRight: '0.6rem',
      }}>
      {type === 'switch' && (
        <Flex
          sx={{
            justifyContent: 'space-between',
            height: '3rem',
          }}>
          <Box
            sx={{
              fontSize: '1rem',
              color: 'rgb(255,255,255,0.9)',
            }}>
            {name}
          </Box>

          <Box>
            <Switch
              isChecked={isChecked}
              onChange={onSwitchChange}
              bg=""
              _checked={{
                '& .chakra-switch__track': {
                  backgroundColor: 'settingsMainColor',
                },
              }}
            />
          </Box>
        </Flex>
      )}
      {type === 'radio' && (
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '2.5rem',
            marginBottom: '0.7rem',
          }}>
          {name && (
            <Box
              sx={{
                fontSize: '1rem',
                color: 'rgb(255,255,255,0.9)',
              }}>
              {name}
            </Box>
          )}
          <RadioGroup
            sx={{ marginTop: '0rem' }}
            onChange={(value) => handleChange(value)}
            value={radioValue}>
            <Flex direction="row" marginBottom="1rem" gap="1rem">
              {options &&
                options.map((option, index) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    isChecked={checkedValue === option.value}
                    onChange={(e) =>
                      onRadioChange && onRadioChange(e.target.value)
                    }
                    _checked={{
                      background: 'settingsMainColor',
                      borderColor: 'settingsMainColor',
                      '&::before': {
                        content: `""`,
                        display: 'inline-block',
                        position: 'relative',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'settingsRadioBefore',
                      },
                    }}>
                    {option.label}
                  </Radio>
                ))}
            </Flex>
          </RadioGroup>
        </Flex>
      )}
    </Box>
  );
};
