import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';

export function AppHeader({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const signOut = useAuthStore(state => state.signOut);

  const title = options.title ?? route.name;

  return (
    <Appbar.Header style={{ paddingTop: insets.top }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action icon="logout" onPress={signOut} />
    </Appbar.Header>
  );
}
