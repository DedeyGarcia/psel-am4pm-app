export interface Recipe {
  id: number;
  categoryId: number;
  userId: number;
  name: string;
  preparationTimeMinutes: number;
  servings: number;
  directions: string;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateRecipe = Pick<
  Recipe,
  | 'categoryId'
  | 'name'
  | 'preparationTimeMinutes'
  | 'servings'
  | 'directions'
  | 'ingredients'
>;

export type UpdateRecipe = Partial<CreateRecipe>;
