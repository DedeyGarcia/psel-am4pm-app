import { FlatList, View } from 'react-native';
import { useRecipes } from '../../../hooks/recipe/useRecipes';
import { Recipe } from '../../../../types/recipe';
import RecipeCard from './components/RecipeCard';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function RecipesList() {
  const { data, isPending, error } = useRecipes();

  const renderItem = ({ item }: { item: Recipe }) => {
    return <RecipeCard item={item} />;
  };

  const keyExtractor = (item: Recipe) => item.id.toString();

  if (isPending) {
    return (
      <View>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text variant="titleLarge">Erro ao carregar receitas</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
