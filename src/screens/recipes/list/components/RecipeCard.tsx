import { Card, Text } from 'react-native-paper';
import { Recipe } from '../../../../../types/recipe';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard({ item }: { item: Recipe }) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('RecipeDetails', { id: item.id.toString() });
  };

  return (
    <Card onPress={onPress}>
      <Card.Title title={item.nome} />
      <Card.Content>
        <Text>{item.modo_preparo}</Text>
      </Card.Content>
    </Card>
  );
}
