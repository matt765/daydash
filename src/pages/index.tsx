import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

import { Dashboard } from '@/views/dashboard/Dashboard';
import { Intro } from '@/views/intro/Intro';
import { Notepad } from '@/views/notepad/Notepad';
import { SideButtons } from '@/components/buttons/SideButtons';
import { Settings } from '@/components/settings/Settings';
import { SnakeGame } from '@/views/snake/Snake';
import { SnakeButton } from '@/components/buttons/SnakeButton';
import { Loader } from '@/components/loader/Loader';
import { useHomepage } from '@/hooks/useHomepage';

export default function Home() {
  const {
    view,
    setView,
    name,
    city,
    handleToggleNotepadView,
    handleToggleSnakeView,
    onSettingsPanelOpen,
    onSettingsPanelClose,
    onEditUserDataOpen,
    onEditUserDataClose,
    onClearAllDataOpen,
    onClearAllDataClose,
    isSettingsPanelOpen,
    isEditUserDataOpen,
    isClearAllDataOpen,
    btnRef,
    showSnakeButton,
    isDrawerContentVisible,
    setIsDrawerContentVisible,
    getBackgroundImage,
    setViewWithLocalStorage,
  } = useHomepage();

  return (
    <>
      <Head>
        <title>DayDash</title>
        <meta
          name="description"
          content="Dashboard application designed to be an alternative to default starting page in browser"
        />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        alignItems="center"
        bgImage={getBackgroundImage()}
        bgColor="homepageBg"
        bgRepeat="no-repeat"
        bgAttachment="fixed"
        position="relative"
        bgSize="cover">
        <Flex w="100%" h="100%" justify="center" alignItems="center">
          <Flex w="68rem" h="47rem" justify="center" alignItems="center">
            {view === 'loading' && <Loader />}
            {view === 'intro' && (
              <Intro
                setView={setView}
                onDataSaved={() => setViewWithLocalStorage('dashboard')}
              />
            )}
            {view === 'dashboard' && <Dashboard />}
            {view === 'notepad' && <Notepad />}
            {view === 'snake' && <SnakeGame />}
          </Flex>
        </Flex>
      </Flex>
      {name && city && (
        <SideButtons
          view={view}
          handleToggleView={handleToggleNotepadView}
          openDrawer={() => {
            onSettingsPanelOpen();
            setIsDrawerContentVisible(true);
          }}
        />
      )}
      {showSnakeButton && name && city && (
        <SnakeButton onClick={handleToggleSnakeView} />
      )}
      <Settings
        isOpen={isSettingsPanelOpen}
        onClose={onSettingsPanelClose}
        btnRef={btnRef}
        onEditUserData={onEditUserDataOpen}
        onEditUserDataClose={onEditUserDataClose}
        onClearAllData={onClearAllDataOpen}
        onClearAllDataClose={onClearAllDataClose}
        isDrawerContentVisible={isDrawerContentVisible}
        setIsDrawerContentVisible={setIsDrawerContentVisible}
        isEditUserDataOpen={isEditUserDataOpen}
        isClearAllDataOpen={isClearAllDataOpen}
      />
    </>
  );
}
