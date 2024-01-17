import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

import { isExpo } from '@/lib/utils';

const storage = !isExpo ? new MMKV() : null;

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage?.set(name, value);
  },
  getItem: (name) => {
    const value = storage?.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage?.delete(name);
  },
};
