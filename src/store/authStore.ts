import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStoreState = {
  token: string | null;
  hasHydrated: boolean;
};

type AuthStoreActions = {
  signIn: (token: string) => void;
  signOut: () => void;
  setHasHydrated: (value: boolean) => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      hasHydrated: false,
      signIn: token => set({ token }),
      signOut: () => set({ token: null }),
      setHasHydrated: value => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ token: state.token }),
      onRehydrateStorage: () => state => state?.setHasHydrated(true),
    },
  ),
);
