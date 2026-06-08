import { View } from 'react-native';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import { RecipeFormDataInput } from '../../../components/RecipeForm/schema';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import { RootStackParamList } from '../../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';

type RecipeEditRouteProp = RouteProp<RootStackParamList, 'RecipeEdit'>;

export default function RecipeEdit({ route }: { route: RecipeEditRouteProp }) {
  const { data, isPending, error } = useRecipe(route.params.id);
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  if (isPending) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <Text variant="titleLarge">Erro ao carregar detalhes da receita</Text>
      </View>
    );
  }
  const initialData = {
    name: data.name,
    categoryId: String(data.categoryId),
    preparationTimeMinutes: String(data.preparationTimeMinutes),
    servings: String(data.servings),
    ingredients: data.ingredients,
    directions: data.directions,
  } satisfies RecipeFormDataInput;

  return (
    <RecipeForm
      initialValues={initialData}
      submitLabel="Editar"
      onSubmit={() => {}}
    />
  );
}
