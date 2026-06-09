import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/authStore';
import { queryClient } from '../../lib/queryClient';
import { useAppTheme } from '../../theme';
import { makeStyles } from './styles';

export function AppHeader({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const signOut = useAuthStore(state => state.signOut);
  const theme = useAppTheme();
  const styles = makeStyles(theme, insets);

  const title = options.title ?? route.name;

  const handleSignOut = () => {
    signOut();
    queryClient.clear();
  };

  return (
    <Appbar.Header style={styles.root}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action icon="logout" onPress={handleSignOut} />
    </Appbar.Header>
  );
}
