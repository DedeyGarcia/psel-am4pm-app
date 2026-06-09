import { useAppTheme } from '../../../../../theme';
import { View } from 'react-native';
import { makeStyles } from './styles';

export default function RecipesListCategoriesListSeparatorComponent() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return <View style={styles.separator} />;
}
