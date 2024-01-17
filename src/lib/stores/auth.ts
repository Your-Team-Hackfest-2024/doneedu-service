import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage';
import { isExpo } from '@/lib/utils';

type AuthState = {
  user?: User;
  setUser: (user: User) => void;
  signout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setUser: (user) => set({ user }),
      signout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => (isExpo ? AsyncStorage : zustandStorage)),
    }
  )
);
