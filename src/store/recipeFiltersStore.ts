import { create } from 'zustand';

type RecipeFiltersStoreState = {
  searchQuery: string;
  selectedCategories: number[];
};

type RecipeFiltersStoreActions = {
  setSearchQuery: (searchQuery: string) => void;
  setSelectedCategories: (selectedCategories: number[]) => void;
  clearFilters: () => void;
};

type RecipeFiltersStore = RecipeFiltersStoreState & RecipeFiltersStoreActions;

export const useRecipeFiltersStore = create<RecipeFiltersStore>()(set => ({
  searchQuery: '',
  selectedCategories: [],
  setSearchQuery: searchQuery => set({ searchQuery }),
  setSelectedCategories: selectedCategories => set({ selectedCategories }),
  clearFilters: () => set({ searchQuery: '', selectedCategories: [] }),
}));
