import { CreateRecipe } from '../../../../types/recipe';
import { useNavigation } from '@react-navigation/native';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import { useCreateRecipe } from '../../../hooks/recipe/useCreateRecipe';

export function RecipeCreate() {
  const { mutate, isPending, error } = useCreateRecipe();
  const navigate = useNavigation();

  const onSubmit = (data: CreateRecipe) => {
    mutate(data, {
      onSuccess: () => {
        navigate.goBack();
      },
    });
  };

  return (
    <RecipeForm
      submitLabel="Criar"
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
    />
  );
}
