import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ToastProvider, ToastViewport, useToastController } from '@tamagui/toast';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppState, AppStateStatus, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from 'tamagui.config';

import { Toast } from '@/components/Toast';
import { isExpo } from '@/lib/utils';

export default function Provider({ children }: { children: ReactNode }) {
  const toast = useToastController();
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
      })
  );

  useEffect(() => {
    function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={colorScheme === 'light' ? 'light' : 'dark'}
      >
        <ToastProvider burntOptions={{ from: 'top' }} native={!isExpo && 'ios'} swipeDirection="up">
          <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
            {children}
          </ThemeProvider>

          <Toast />
          <ToastViewport flexDirection="column-reverse" top={top + 64} left={left} right={right} />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
