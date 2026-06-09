import { FlashList, FlashListRef } from '@shopify/flash-list';
import RecipeCard from '../recipeCard/RecipeCard';
import { Recipe } from '../../../../../../types/recipe';
import RecipesListSeparatorComponent from './RecipesListSeparatorComponent';
import RecipesListEmptyComponent from './RecipesListEmptyComponent';
import { useEffect, useRef } from 'react';
import { useRecipeFiltersStore } from '../../../../../store/recipeFiltersStore';

interface RecipesListProps {
  filteredRecipes: Recipe[];
}

export default function RecipesList({ filteredRecipes }: RecipesListProps) {
  const listRef = useRef<FlashListRef<Recipe>>(null);
  const searchQuery = useRecipeFiltersStore(s => s.searchQuery);
  const selectedCategories = useRecipeFiltersStore(s => s.selectedCategories);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        listRef.current?.scrollToTop({
          animated: false,
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [searchQuery, selectedCategories]);

  const recipesListRenderItem = ({ item }: { item: Recipe }) => {
    return <RecipeCard item={item} />;
  };

  const recipesListKeyExtractor = (item: Recipe) => item.id.toString();

  return (
    <FlashList
      ref={listRef}
      data={filteredRecipes}
      renderItem={recipesListRenderItem}
      keyExtractor={recipesListKeyExtractor}
      ItemSeparatorComponent={RecipesListSeparatorComponent}
      ListEmptyComponent={RecipesListEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}
