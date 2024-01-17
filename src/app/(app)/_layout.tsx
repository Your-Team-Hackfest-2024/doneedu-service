import { useFocusEffect, useRouter, useSegments } from 'expo-router';
import { useTheme } from 'tamagui';

import { BackButton } from '@/components/BackButton';
import Logo from '@/components/Logo';
import { modalOptions } from '@/constants/modalOptions';
import { Stack } from '@/lib/navigation';
import { useAuthStore } from '@/lib/stores/auth';

export default function MainLayout() {
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const isAuth = useAuthStore((state) => !!state.user);

  useFocusEffect(() => {
    if (segments[2] === '(private)' && !isAuth) {
      router.push('/sign-in');
    }
  });

  return (
    <Stack
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.background.val,
        },
        headerStyle: {
          height: 104,
          backgroundColor: theme.background.val,
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Logo primaryColor={theme.accent.val} secondaryColor={theme.primary.val} />
        ),
        headerLeft: (props) => <BackButton {...props} />,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modal)/sign-up"
        options={{
          ...modalOptions({ backgroundColor: theme.background.val }),
          headerTitle: 'Sign Up',
        }}
        listeners={{
          gestureEnd: () => router.push('/'),
        }}
      />
      <Stack.Screen
        name="(modal)/sign-in"
        options={{
          ...modalOptions({ backgroundColor: theme.background.val }),
          headerTitle: 'Sign In',
        }}
        listeners={{
          gestureEnd: () => router.push('/'),
        }}
      />
    </Stack>
  );
}
