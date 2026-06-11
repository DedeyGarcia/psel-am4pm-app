import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useUser } from '../../hooks/user/useUser';
import { useAppTheme } from '../../theme';
import { makeStyles } from './styles';
import LogoutButton from '../LogoutButton/LogoutButton';

export default function RecipesHeader(_: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const { data: user } = useUser();
  const theme = useAppTheme();
  const styles = makeStyles(theme, insets);

  return (
    <Appbar.Header style={styles.root} statusBarHeight={0}>
      <View style={styles.titleContainer}>
        <Text variant="labelSmall">Olá {user?.name ?? ''}, aqui estão</Text>
        <Text variant="titleLarge">Suas Receitas</Text>
      </View>
      <LogoutButton />
    </Appbar.Header>
  );
}
