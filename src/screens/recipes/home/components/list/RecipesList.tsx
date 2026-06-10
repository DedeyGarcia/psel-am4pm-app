import { FlashList } from '@shopify/flash-list';
import RecipeCard from '../recipeCard/RecipeCard';
import { Recipe } from '../../../../../../types/recipe';
import RecipesListSeparatorComponent from './RecipesListSeparatorComponent';
import RecipesListEmptyComponent from './RecipesListEmptyComponent';
import { useRecipeFiltersStore } from '../../../../../store/recipeFiltersStore';

interface RecipesListProps {
  filteredRecipes: Recipe[];
}

export default function RecipesList({ filteredRecipes }: RecipesListProps) {
  const searchQuery = useRecipeFiltersStore(s => s.searchQuery);
  const selectedCategories = useRecipeFiltersStore(s => s.selectedCategories);

  const listKey = `${searchQuery}|${selectedCategories.join(',')}`;

  const recipesListRenderItem = ({ item }: { item: Recipe }) => {
    return <RecipeCard item={item} />;
  };

  const recipesListKeyExtractor = (item: Recipe) => item.id.toString();

  return (
    <FlashList
      key={listKey}
      data={filteredRecipes}
      renderItem={recipesListRenderItem}
      keyExtractor={recipesListKeyExtractor}
      ItemSeparatorComponent={RecipesListSeparatorComponent}
      ListEmptyComponent={RecipesListEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}
