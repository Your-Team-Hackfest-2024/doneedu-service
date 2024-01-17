import { useToastController } from '@tamagui/toast';
import { IconShare2 } from 'tabler-icons-react-native';
import { Button, useTheme } from 'tamagui';

type ShareButtonProps = {
  small?: boolean;
};

export default function ShareButton({ small }: ShareButtonProps) {
  const theme = useTheme();
  const toast = useToastController();

  return (
    <Button
      unstyled
      padding={small ? 0 : '$3'}
      pressStyle={{ opacity: 0.5 }}
      onPress={() => {
        toast.show('Feature not available yet');
      }}
      icon={<IconShare2 size={small ? 24 : 28} color={theme.blue8.val} />}
    />
  );
}
