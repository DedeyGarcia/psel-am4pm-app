import { View } from 'react-native';
import { useRecipes } from '../../../hooks/recipe/useRecipes';
import { Recipe } from '../../../../types/recipe';
import RecipeCard from './components/recipeCard/RecipeCard';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import RecipesListSeparatorComponent from './components/list/RecipesListSeparatorComponent';
import RecipesListEmptyComponent from './components/list/RecipesListEmptyComponent';
import { useCategories } from '../../../hooks/useCategory';

export default function RecipesList() {
  const { data, isPending, error } = useRecipes();
  const { isPending: isCategoriesPending } = useCategories();
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const onFabPress = () => {
    navigation.navigate('RecipeCreate');
  };

  const renderItem = ({ item }: { item: Recipe }) => {
    return <RecipeCard item={item} />;
  };

  const keyExtractor = (item: Recipe) => item.id.toString();

  if (isPending || isCategoriesPending) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingOrErrorContainer}>
        <Text variant="titleLarge">Erro ao carregar receitas</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={RecipesListSeparatorComponent}
        ListEmptyComponent={RecipesListEmptyComponent}
      />
      <FAB style={styles.fab} icon="plus" onPress={onFabPress} />
    </View>
  );
}
