import { Button } from 'tamagui';

import { useAuthStore } from '@/lib/stores/auth';

export default function ProfileScreen() {
  const signOut = useAuthStore((state) => state.signout);

  return <Button onPress={signOut}>Sign Out</Button>;
}
