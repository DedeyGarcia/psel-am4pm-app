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
