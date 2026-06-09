import { View } from 'react-native';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import { RecipeFormDataInput } from '../../../components/RecipeForm/schema';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import { RootStackParamList } from '../../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useEditRecipe } from '../../../hooks/recipe/useEditRecipe';
import { useNavigation } from '@react-navigation/native';
import { UpdateRecipe } from '../../../../types/recipe';
import { useCategories } from '../../../hooks/useCategory';

type RecipeEditRouteProp = RouteProp<RootStackParamList, 'RecipeEdit'>;

export default function RecipeEdit({ route }: { route: RecipeEditRouteProp }) {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const {
    data: recipeData,
    isPending: isPendingRecipeData,
    error: errorRecipeData,
  } = useRecipe(route.params.id);

  const {
    data: categoriesData,
    isPending: isPendingCategoriesData,
    error: errorCategoriesData,
  } = useCategories();

  const {
    mutate,
    isPending: isPendingEditRecipe,
    error: errorEditRecipe,
  } = useEditRecipe();
  const navigation = useNavigation();

  const onSubmit = (data: UpdateRecipe) => {
    mutate(
      { id: route.params.id, recipe: data },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  if (isPendingRecipeData || isPendingCategoriesData) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (errorRecipeData || errorCategoriesData) {
    return (
      <View style={styles.root}>
        <Text variant="titleLarge">Erro ao carregar detalhes da receita</Text>
      </View>
    );
  }
  const initialData = {
    name: recipeData.name,
    categoryId: String(recipeData.categoryId),
    preparationTimeMinutes: String(recipeData.preparationTimeMinutes),
    servings: String(recipeData.servings),
    ingredients: recipeData.ingredients,
    directions: recipeData.directions,
  } satisfies RecipeFormDataInput;

  return (
    <RecipeForm
      initialValues={initialData}
      submitLabel="Editar"
      onSubmit={onSubmit}
      isPending={isPendingEditRecipe}
      error={errorEditRecipe}
      categories={categoriesData}
    />
  );
}
