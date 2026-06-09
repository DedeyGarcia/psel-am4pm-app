import { Card, Text } from 'react-native-paper';
import { Recipe } from '../../../../../../types/recipe';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../../../theme';
import { makeStyles } from './styles';
import { View } from 'react-native';
import { useCategories } from '../../../../../hooks/useCategory';
import CustomButton from '../../../../../components/CustomButton/CustomButton';

export default function RecipeCard({ item }: { item: Recipe }) {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const { data: categories } = useCategories();

  const onPress = () => {
    navigation.navigate('RecipeDetails', { id: item.id.toString() });
  };

  const categoryName = categories?.find(c => c.id === item.categoryId)?.name;

  const ingredientsPreview = item.ingredients.replaceAll('\n', '');

  return (
    <Card mode="outlined">
      <Card.Content style={styles.content}>
        <Text variant="labelSmall">{categoryName}</Text>
        <View style={styles.titleRow}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text variant="labelMedium">{item.preparationTimeMinutes} min.</Text>
        </View>
        <Text variant="labelLarge">Porções: {item.servings}</Text>
        <Text variant="labelLarge">Ingredientes:</Text>
        <Text numberOfLines={1} variant="bodyMedium">
          {ingredientsPreview}
        </Text>
      </Card.Content>
      <Card.Actions>
        <CustomButton mode="contained" onPress={onPress}>
          Ver Detalhes
        </CustomButton>
      </Card.Actions>
    </Card>
  );
}
