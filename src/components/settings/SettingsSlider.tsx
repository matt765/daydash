import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';

import useSettingsStore from '@/store/settingsStore';

export const SettingsSlider = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderValue = useSettingsStore((state) => state.sliderValue);
  const setSliderValue = useSettingsStore((state) => state.setSliderValue);

  return (
    <Slider
      id="slider"
      defaultValue={sliderValue}
      min={0}
      max={100}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
     
      mb="1.5rem"
      mt="1.2rem"
      position="relative">
      <SliderTrack >
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}>
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};
