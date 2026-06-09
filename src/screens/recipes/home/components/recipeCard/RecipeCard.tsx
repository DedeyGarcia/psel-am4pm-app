import { Card, Icon, Text } from 'react-native-paper';
import { Recipe } from '../../../../../../types/recipe';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../../../theme';
import { makeStyles } from './styles';
import { View } from 'react-native';
import CustomButton from '../../../../../components/CustomButton/CustomButton';

export default function RecipeCard({ item }: { item: Recipe }) {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const onPress = () => {
    navigation.navigate('RecipeDetails', { id: item.id.toString() });
  };

  const ingredientsPreview = item.ingredients.replaceAll('\n', '');

  return (
    <Card mode="outlined">
      <Card.Content style={styles.content}>
        <View>
          <Text variant="titleMedium">{item.name}</Text>
        </View>
        <View style={styles.textWithIcon}>
          <Icon source="clock-outline" size={theme.spacing.md} />
          <Text variant="labelMedium">
            Tempo: {item.preparationTimeMinutes} min.
          </Text>
        </View>
        <View style={styles.textWithIcon}>
          <Icon source="food-turkey" size={theme.spacing.md} />
          <Text variant="labelMedium">Rendimento: {item.servings} porções</Text>
        </View>
        <View style={styles.ingredientsRow}>
          <Text variant="labelLarge">Ingredientes:</Text>
          <Text numberOfLines={1} variant="bodySmall">
            {ingredientsPreview}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <CustomButton mode="contained" onPress={onPress}>
          Ver Detalhes
        </CustomButton>
      </Card.Actions>
    </Card>
  );
}
