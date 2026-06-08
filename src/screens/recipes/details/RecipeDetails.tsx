import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import type { RootStackParamList } from '../../../navigation/types';
import type { RouteProp } from '@react-navigation/native';

type RecipeDetailsRouteProp = RouteProp<RootStackParamList, 'RecipeDetails'>;

export default function RecipeDetails({
  route,
}: {
  route: RecipeDetailsRouteProp;
}) {
  const { data, isLoading, error } = useRecipe(route.params.id);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text variant="titleLarge">Erro ao carregar receita</Text>
      </View>
    );
  }

  return (
    <View>
      <Text variant="titleLarge">{data?.nome}</Text>
      <Text variant="bodyMedium">{data?.modo_preparo}</Text>
    </View>
  );
}
