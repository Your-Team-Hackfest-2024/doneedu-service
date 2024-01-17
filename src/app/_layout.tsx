import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import React, { useEffect } from 'react';

import Provider from '@/lib/provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
