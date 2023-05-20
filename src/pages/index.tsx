import { Flex, useMediaQuery } from '@chakra-ui/react';
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
import { MobileNavigation } from '@/components/mobileNavigation/MobileNavigation';
import { MobileView } from '@/components/mobileNavigation/MobileView';

export default function Home() {
  const {
    setView,
    name,
    city,
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
    isBgImageLoaded,
    handleViewChange,
    desktopView,
    mobileView,
  } = useHomepage();

  const [isDesktop] = useMediaQuery('(min-width: 992px)');

  if (!isBgImageLoaded) {
    return (
      <Flex w="100vw" h="100vh" justify="center" alignItems="center">
        <Loader />
      </Flex>
    );
  }

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
        position="relative"
        bgSize="cover">
        <Flex w="100%" h="100%" justify="center" alignItems="center">
          {isDesktop ? (
            <Flex
              w={{ lg: '60rem', xl: '68rem' }}
              h={{ lg: "43rem", '2xl': "47rem" }}
              justify="center"
              alignItems="center">
              {desktopView === 'loading' && <Loader />}
              {desktopView === 'intro' && (
                <Intro
                  setView={setView}
                  onDataSaved={() => setViewWithLocalStorage('dashboard')}
                />
              )}
              {desktopView === 'dashboard' && <Dashboard />}
              {desktopView === 'notepad' && <Notepad />}
              {desktopView === 'snake' && <SnakeGame />}
            </Flex>
          ) : (
            <Flex
              pb="5rem"
              w="100%"
              h="100%"
              justify="center"
              alignItems="center">
              {mobileView === 'loading' && <MobileView viewName="loading" />}
              {mobileView === 'mobileHome' && <MobileView viewName="home" />}
              {mobileView === 'mobileWeather' && (
                <MobileView viewName="weather" />
              )}
              {mobileView === 'mobilePlanner' && (
                <MobileView viewName="planner" />
              )}
              {mobileView === 'notepad' && <MobileView viewName="notepad" />}
              {mobileView === 'intro' && (
                <Intro
                  setView={setView}
                  onDataSaved={() => setViewWithLocalStorage('dashboard')}
                />
              )}
            </Flex>
          )}
        </Flex>
      </Flex>

      {name && city && isDesktop && (
        <SideButtons
          desktopView={desktopView}
          handleToggleView={handleViewChange}
          openDrawer={() => {
            onSettingsPanelOpen();
            setIsDrawerContentVisible(true);
          }}
        />
      )}
      {showSnakeButton && name && city && (
        <SnakeButton
          desktopView={desktopView}
          handleToggleView={handleViewChange}
        />
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
      <MobileNavigation
        handleViewChange={handleViewChange}
        openDrawer={() => {
          if (isSettingsPanelOpen) {
            onSettingsPanelClose();
            setIsDrawerContentVisible(false);
          } else {
            onSettingsPanelOpen();
            setIsDrawerContentVisible(true);
          }
        }}
        isSettingsPanelOpen={isSettingsPanelOpen}
        onSettingsPanelClose={onSettingsPanelClose}
        mobileView={mobileView}
        onEditUserDataClose={onEditUserDataClose}
        onClearAllDataClose={onClearAllDataClose}
      />
    </>
  );
}
