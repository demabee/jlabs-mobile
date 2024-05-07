import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserData {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
}

interface AuthStore {
  token: string,
  isAuth: boolean,
  user: UserData | null,
  setIsAuth: (isAuth: boolean) => void;
  setToken: (token: string) => void;
  setUser: (user: UserData) => void;
  clearAuthStore: () => void;
}

const slices = (set: any) => ({
  token: '',
  user: null,
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  setToken: (token: string) => set({ token }),
  setUser: (user: UserData) => set({ user }),
  clearAuthStore: () => set({ token: '', user: null, isAuth: false }),
});

const extraReducer = persist<AuthStore>(slices, {
  name: 'useAuthStore',
  storage: createJSONStorage(() => AsyncStorage),
});

export const useAuthStore = create<AuthStore>()(extraReducer);
