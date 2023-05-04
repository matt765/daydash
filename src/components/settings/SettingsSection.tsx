import { Flex } from '@chakra-ui/react';

interface Props {
  paddingBottom?: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ paddingBottom, children }: Props) => {
  return (
    <Flex
      sx={{
        width: '100%',
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        borderColor: 'rgb(255,255,255,0.2)',
        paddingTop: '1.2rem',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        flexDirection: 'column',
        '&:last-of-type': {
          borderWidth: 0,
        },
      }}
      paddingBottom={paddingBottom ? paddingBottom : '0em'}>
      {children}
    </Flex>
  );
};
