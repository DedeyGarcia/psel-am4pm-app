import { useAppTheme } from '../../../../../theme';
import { makeStyles } from './styles';
import { View } from 'react-native';

export default function RecipesListSeparatorComponent() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return <View style={styles.separator} />;
}
