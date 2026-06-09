import { FlashList } from '@shopify/flash-list';
import RecipeCard from '../recipeCard/RecipeCard';
import { Recipe } from '../../../../../../types/recipe';
import RecipesListSeparatorComponent from './RecipesListSeparatorComponent';
import RecipesListEmptyComponent from './RecipesListEmptyComponent';

interface RecipesListProps {
  filteredRecipes: Recipe[];
}

export default function RecipesList({ filteredRecipes }: RecipesListProps) {
  const recipesListRenderItem = ({ item }: { item: Recipe }) => {
    return <RecipeCard item={item} />;
  };

  const recipesListKeyExtractor = (item: Recipe) => item.id.toString();

  return (
    <FlashList
      data={filteredRecipes}
      renderItem={recipesListRenderItem}
      keyExtractor={recipesListKeyExtractor}
      ItemSeparatorComponent={RecipesListSeparatorComponent}
      ListEmptyComponent={RecipesListEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}
