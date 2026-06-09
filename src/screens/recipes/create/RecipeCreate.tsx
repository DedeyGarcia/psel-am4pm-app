import { CreateRecipe } from '../../../../types/recipe';
import { useNavigation } from '@react-navigation/native';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import { useCreateRecipe } from '../../../hooks/recipe/useCreateRecipe';
import { useCategories } from '../../../hooks/useCategory';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';

export default function RecipeCreate() {
  const { mutate, isPending, error } = useCreateRecipe();
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useCategories();

  const onSubmit = (data: CreateRecipe) => {
    mutate(data, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  if (isCategoriesPending) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (isCategoriesError) {
    return (
      <View style={styles.root}>
        <Text variant="titleLarge">Erro ao carregar categorias</Text>
      </View>
    );
  }

  return (
    <RecipeForm
      submitLabel="Criar"
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
      categories={categories}
    />
  );
}
