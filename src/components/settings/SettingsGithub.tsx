import { Box, Flex, Icon, Link } from '@chakra-ui/react';

import { GithubIcon } from '@/assets/icons/GithubIcon';

export const SettingsGithub = () => {
  return (
    <Link
      href="https://github.com/matt765/react-daily-dashboard"
      isExternal
      sx={{
        display: 'flex',
        justifyContent: 'center',

        alignItems: 'center',
        flexDirection: 'column',
        height: '3.5rem',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(40, 49, 62)',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'rgb(255,255,255,0.2)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgb(255,255,255,0.05)',
          textDecoration: 'none',
        },
      }}>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          '& *': {
            fill: 'white',
          },
          '& svg': {
            width: '1.5rem',
            marginLeft: '-1rem',
            marginRight: '0.8rem',
          },
        }}>
        <Box
          cursor="pointer"
          sx={{
            '& svg': {
              width: '30px',
              height: '30px',
              fill: 'plannerItemIcon',
            },
          }}>
          <Icon as={GithubIcon} boxSize={7} transition="0.5s" />
        </Box>
        <Box>GitHub Repository</Box>
      </Flex>
    </Link>
  );
};
