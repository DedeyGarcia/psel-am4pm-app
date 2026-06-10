import { useAuthStore } from '../authStore';

const initialState = useAuthStore.getState();

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState(initialState);
  });

  it('should start signed out', () => {
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('should store the token on sign in', () => {
    useAuthStore.getState().signIn('my-token');

    expect(useAuthStore.getState().token).toBe('my-token');
  });

  it('should clear the token on sign out', () => {
    useAuthStore.getState().signIn('my-token');

    useAuthStore.getState().signOut();

    expect(useAuthStore.getState().token).toBeNull();
  });

  it('should flag hydration as complete', () => {
    useAuthStore.getState().setHasHydrated(true);

    expect(useAuthStore.getState().hasHydrated).toBe(true);
  });
});
