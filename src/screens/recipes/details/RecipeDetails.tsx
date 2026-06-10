import { ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
  Card,
  Icon,
  IconButton,
  Menu,
  ProgressBar,
  Text,
} from 'react-native-paper';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import type { RootStackParamList } from '../../../navigation/types';
import type { RouteProp } from '@react-navigation/native';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDeleteRecipe } from '../../../hooks/recipe/useDeleteRecipe';
import { useCategories } from '../../../hooks/useCategory';

type RecipeDetailsRouteProp = RouteProp<RootStackParamList, 'RecipeDetails'>;

export default function RecipeDetails({
  route,
}: {
  route: RecipeDetailsRouteProp;
}) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { data, isPending, isFetching, error } = useRecipe(route.params.id);
  const { mutate, isPending: isPendingDelete } = useDeleteRecipe();
  const { data: categories } = useCategories();

  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const onEditPress = () => {
    navigation.navigate('RecipeEdit', { id: route.params.id });
    closeMenu();
  };

  const onDeletePress = () => {
    mutate(route.params.id, {
      onSuccess: () => {
        closeMenu();
        navigation.goBack();
      },
    });
  };

  const recipeCategory = categories?.find(c => c.id === data?.categoryId);

  if (isPending) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <Text variant="titleLarge">Erro ao carregar detalhes da receita</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ProgressBar indeterminate visible={isFetching} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleRow}>
          <Text variant="titleLarge">{data?.name}</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                mode="outlined"
                icon="dots-horizontal"
                onPress={openMenu}
                disabled={isPendingDelete}
                loading={isPendingDelete}
                size={theme.spacing.md}
              />
            }
          >
            <Menu.Item
              onPress={onEditPress}
              title="Editar"
              trailingIcon={'pencil'}
            />
            <Menu.Item
              onPress={onDeletePress}
              title="Deletar"
              trailingIcon={'delete'}
            />
          </Menu>
        </View>
        <Text variant="labelMedium">Categoria: {recipeCategory?.name}</Text>
        <View style={styles.subTitleRow}>
          <View style={styles.textWithIcon}>
            <Icon source="clock-outline" size={16} />
            <Text variant="labelMedium">
              Tempo: {data?.preparationTimeMinutes} min.
            </Text>
          </View>
          <View style={styles.textWithIcon}>
            <Icon source="food-turkey" size={16} />
            <Text variant="labelMedium">
              Rendimento: {data?.servings} porções
            </Text>
          </View>
        </View>
        <Text variant="titleMedium">Ingredientes:</Text>
        <Card mode="outlined">
          <Card.Content>
            <Text variant="bodyMedium">{data?.ingredients}</Text>
          </Card.Content>
        </Card>

        <Text variant="titleMedium">Modo de Preparo:</Text>
        <Card mode="outlined">
          <Card.Content>
            <Text variant="bodyMedium">{data?.directions}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
