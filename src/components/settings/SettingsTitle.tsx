import { Box } from '@chakra-ui/react';

interface SettingsTitleProps {
  title: string;
}

export const SettingsTitle = ({ title }: SettingsTitleProps) => {
  return (
    <Box
      sx={{
        color: 'rgb(255,255,255,0.5)',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        fontFamily: 'Quicksand',
        letterSpacing: '1px',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        marginBottom: '1.2rem',
      }}>
      {title}
    </Box>
  );
};
