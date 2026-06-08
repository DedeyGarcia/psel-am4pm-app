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

type RecipeEditRouteProp = RouteProp<RootStackParamList, 'RecipeEdit'>;

export default function RecipeEdit({ route }: { route: RecipeEditRouteProp }) {
  const {
    data: getRecipeData,
    isPending: isPendingGetRecipeData,
    error: errorGetRecipeData,
  } = useRecipe(route.params.id);
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const {
    mutate,
    isPending: isPendingEditRecipe,
    error: errorEditRecipe,
  } = useEditRecipe();
  const navigate = useNavigation();

  console.log(route.params.id);

  const onSubmit = (data: UpdateRecipe) => {
    mutate(
      { id: route.params.id, recipe: data },
      {
        onSuccess: () => {
          navigate.goBack();
        },
      },
    );
  };

  if (isPendingGetRecipeData) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (errorGetRecipeData) {
    return (
      <View style={styles.root}>
        <Text variant="titleLarge">Erro ao carregar detalhes da receita</Text>
      </View>
    );
  }
  const initialData = {
    name: getRecipeData.name,
    categoryId: String(getRecipeData.categoryId),
    preparationTimeMinutes: String(getRecipeData.preparationTimeMinutes),
    servings: String(getRecipeData.servings),
    ingredients: getRecipeData.ingredients,
    directions: getRecipeData.directions,
  } satisfies RecipeFormDataInput;

  return (
    <RecipeForm
      initialValues={initialData}
      submitLabel="Editar"
      onSubmit={onSubmit}
      isPending={isPendingEditRecipe}
      error={errorEditRecipe}
    />
  );
}
