import { FlatList, View } from 'react-native';
import { useRecipes } from '../../../hooks/recipe/useRecipes';
import { Recipe } from '../../../../types/recipe';
import RecipeCard from './components/RecipeCard';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function RecipesList() {
  const { data, isPending, error } = useRecipes();
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

  if (isPending) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} animating />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <Text variant="titleLarge">Erro ao carregar receitas</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <FAB style={styles.fab} icon="plus" onPress={onFabPress} />
    </View>
  );
}
