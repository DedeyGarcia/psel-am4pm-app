import { useCallback } from 'react';
import RNPrint from 'react-native-print';
import { Category } from '../../types/category';
import { Recipe } from '../../types/recipe';

export const resolvePrintHtml = (
  data: Recipe,
  recipeCategory: Category | undefined,
) => {
  return `
      <h1>${data?.name ?? ''}</h1>
      <p><strong>Categoria:</strong> ${recipeCategory?.name ?? ''}</p>
      <p><strong>Tempo:</strong> ${
        data?.preparationTimeMinutes
      } min &nbsp;|&nbsp;
         <strong>Rendimento:</strong> ${data?.servings} porções</p>
      <h2>Ingredientes</h2>
      <p>${(data?.ingredients ?? '').replace(/\n/g, '<br/>')}</p>
      <h2>Modo de Preparo</h2>
      <p>${(data?.directions ?? '').replace(/\n/g, '<br/>')}</p>
    `;
};

export function usePrintRecipe() {
  return useCallback(async (recipe: Recipe, category: Category | undefined) => {
    await RNPrint.print({ html: resolvePrintHtml(recipe, category) });
  }, []);
}
