import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../../theme';
import { makeStyles } from './styles';

export default function SplashScreen() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Seu Livro de Receitas</Text>
      <Icon source="food-turkey" size={theme.spacing.xl} />
    </View>
  );
}
