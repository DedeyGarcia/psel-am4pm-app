import { Chip, IconButton, Text, TextInput } from 'react-native-paper';
import CustomTextInput from '../../../../../components/CustomTextInput/CustomTextInput';
import { FlashList } from '@shopify/flash-list';
import { Category } from '../../../../../../types/category';
import { useCategories } from '../../../../../hooks/useCategory';
import { useRecipeFiltersStore } from '../../../../../store/recipeFiltersStore';
import RecipesListCategoriesListEmptyComponent from './RecipesListCategoriesListEmptyComponent';
import RecipesListCategoriesListSeparatorComponent from './RecipesListCategoriesListSeparatorComponent';
import { View } from 'react-native';
import { makeStyles } from './styles';
import { useAppTheme } from '../../../../../theme';

export default function RecipesListFilters() {
  const searchQuery = useRecipeFiltersStore(s => s.searchQuery);
  const selectedCategories = useRecipeFiltersStore(s => s.selectedCategories);
  const setSearchQuery = useRecipeFiltersStore(s => s.setSearchQuery);
  const setSelectedCategories = useRecipeFiltersStore(
    s => s.setSelectedCategories,
  );

  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const onClearCategoriesPress = () => {
    setSelectedCategories([]);
  };

  const categoriesListKeyExtractor = (item: Category) => item.id.toString();
  const { data: categories } = useCategories();

  const categoriesListRenderItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategories.includes(item.id);

    const toggleCategorySelection = () => {
      if (isSelected) {
        setSelectedCategories(selectedCategories.filter(id => id !== item.id));
      } else {
        setSelectedCategories([...selectedCategories, item.id]);
      }
    };

    return (
      <Chip
        selected={isSelected}
        compact
        onPress={toggleCategorySelection}
        mode="outlined"
        style={{
          backgroundColor: isSelected ? theme.colors.surfaceVariant : undefined,
        }}
        showSelectedCheck={false}
        selectedColor={theme.colors.onSurfaceVariant}
      >
        {item.name}
      </Chip>
    );
  };

  return (
    <>
      <CustomTextInput
        label="Pesquisar"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Digite o nome da receita"
        right={
          searchQuery.length > 0 ? (
            <TextInput.Icon icon="close" onPress={() => setSearchQuery('')} />
          ) : (
            <TextInput.Icon icon="magnify" />
          )
        }
      />
      <View style={styles.categoriesHeader}>
        <Text variant="titleMedium">Categorias</Text>
        <IconButton
          icon="close"
          size={theme.spacing.md}
          onPress={onClearCategoriesPress}
        />
      </View>

      <FlashList
        data={categories}
        extraData={selectedCategories}
        horizontal
        renderItem={categoriesListRenderItem}
        keyExtractor={categoriesListKeyExtractor}
        ListEmptyComponent={RecipesListCategoriesListEmptyComponent}
        ItemSeparatorComponent={RecipesListCategoriesListSeparatorComponent}
      />
    </>
  );
}
