import { Feather } from '@expo/vector-icons';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Button, useTheme } from 'tamagui';

type BackButtonProps = HeaderBackButtonProps & {
  modal?: boolean;
};

export const BackButton = ({ modal, canGoBack }: BackButtonProps) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      {(canGoBack || modal) && (
        <Button
          unstyled
          padding="$3"
          pressStyle={{ opacity: 0.5 }}
          onPress={() => {
            if (modal) {
              router.push('/');
              return;
            }

            router.back();
          }}
          icon={<Feather name="chevron-left" size={32} color={theme.blue8.val} />}
        />
      )}
    </>
  );
};
