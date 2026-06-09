import { View } from 'react-native';
import { useRecipes } from '../../../hooks/recipe/useRecipes';
import { Recipe } from '../../../../types/recipe';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useCategories } from '../../../hooks/useCategory';
import RecipesList from './components/list/RecipesList';
import RecipesListFilters from './components/filters/RecipesListFilters';
import { useRecipeFiltersStore } from '../../../store/recipeFiltersStore';

export default function HomeScreen() {
  const { data: recipes, isPending, error } = useRecipes();
  const { isPending: isCategoriesPending } = useCategories();
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  const searchQuery = useRecipeFiltersStore(s => s.searchQuery);
  const selectedCategories = useRecipeFiltersStore(s => s.selectedCategories);

  const onFabPress = () => {
    navigation.navigate('RecipeCreate');
  };

  const getFilteredRecipes = () => {
    let filtered: Recipe[] = [];
    if (!recipes) {
      return filtered;
    }

    filtered = recipes;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedCategories.includes(recipe.categoryId),
      );
    }

    if (searchQuery.length > 0) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  };

  if (isPending || isCategoriesPending) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <Text variant="titleLarge">Erro ao carregar receitas</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <RecipesListFilters />
      <RecipesList filteredRecipes={getFilteredRecipes()} />
      <FAB style={styles.fab} icon="plus" onPress={onFabPress} />
    </View>
  );
}
