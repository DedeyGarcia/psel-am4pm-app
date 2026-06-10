import { useRecipeFiltersStore } from '../recipeFiltersStore';

const initialState = useRecipeFiltersStore.getState();

describe('recipeFiltersStore', () => {
  beforeEach(() => {
    useRecipeFiltersStore.setState(initialState);
  });

  it('should start with empty filters', () => {
    const state = useRecipeFiltersStore.getState();

    expect(state.searchQuery).toBe('');
    expect(state.selectedCategories).toEqual([]);
  });

  it('should update the search query', () => {
    useRecipeFiltersStore.getState().setSearchQuery('bolo');

    expect(useRecipeFiltersStore.getState().searchQuery).toBe('bolo');
  });

  it('should update the selected categories', () => {
    useRecipeFiltersStore.getState().setSelectedCategories([1, 3]);

    expect(useRecipeFiltersStore.getState().selectedCategories).toEqual([1, 3]);
  });
});
