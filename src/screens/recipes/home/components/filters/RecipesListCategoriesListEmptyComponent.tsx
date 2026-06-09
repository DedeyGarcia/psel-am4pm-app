import { Text } from 'react-native-paper';
import { useAppTheme } from '../../../../../theme';
import { makeStyles } from './styles';
import { View } from 'react-native';

export default function RecipesListCategoriesListEmptyComponent() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <Text variant="titleLarge">Nenhuma receita encontrada.</Text>
      <Text variant="bodyMedium">
        Toque no botão + para adicionar uma receita.
      </Text>
    </View>
  );
}
