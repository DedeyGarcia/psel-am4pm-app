import { View } from 'react-native';
import {
  RecipeFormDataOutput,
  RecipeFormDataInput,
  recipeSchema,
} from './schema';
import { Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import { useAppTheme } from '../../theme';
import { makeStyles } from './styles';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getErrorMessage } from '../../lib/getErrorMessage';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { Category } from '../../../types/category';

type RecipeFormProps = {
  initialValues?: Partial<RecipeFormDataInput>;
  onSubmit: (data: RecipeFormDataOutput) => void;
  isPending?: boolean;
  submitLabel: string;
  error?: Error | null;
  categories: Category[];
};

export default function RecipeForm({
  submitLabel,
  initialValues,
  isPending,
  onSubmit,
  error,
}: RecipeFormProps) {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const navigation = useNavigation();

  const onCancel = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormDataInput, any, RecipeFormDataOutput>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      preparationTimeMinutes: '',
      servings: '',
      ingredients: '',
      directions: '',
      ...initialValues,
    },
  });

  return (
    <View style={styles.root}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        bottomOffset={90}
      >
        <Text variant="titleLarge">{submitLabel} Receita</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Nome"
              placeholder="Digite o nome da receita"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
          name="name"
        />
        {/* TODO: Criar um input de select para categorias */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Categoria"
              placeholder="Digite a categoria"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.categoryId}
              errorMessage={errors.categoryId?.message}
            />
          )}
          name="categoryId"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Tempo de preparo (minutos)"
              placeholder="Digite o tempo de preparo em minutos"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.preparationTimeMinutes}
              errorMessage={errors.preparationTimeMinutes?.message}
              inputMode="numeric"
            />
          )}
          name="preparationTimeMinutes"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Porções"
              placeholder="Digite a quantidade de porções"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.servings}
              errorMessage={errors.servings?.message}
              inputMode="numeric"
            />
          )}
          name="servings"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Ingredientes"
              placeholder="Digite os ingredientes"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.ingredients}
              errorMessage={errors.ingredients?.message}
              multiline
              style={styles.textAreaInput}
            />
          )}
          name="ingredients"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              label="Modo de preparo"
              placeholder="Digite o modo de preparo"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.directions}
              errorMessage={errors.directions?.message}
              multiline
              style={styles.textAreaInput}
            />
          )}
          name="directions"
        />
        {error && (
          <Text style={{ color: theme.colors.error }}>
            {getErrorMessage(error)}
          </Text>
        )}
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        style={styles.buttonContainer}
        offset={{ closed: 0, opened: 16 }}
      >
        <CustomButton
          mode="outlined"
          onPress={onCancel}
          disabled={isPending}
          style={styles.button}
        >
          Cancelar
        </CustomButton>
        <CustomButton
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          loading={isPending}
          style={styles.button}
        >
          {submitLabel}
        </CustomButton>
      </KeyboardStickyView>
    </View>
  );
}
