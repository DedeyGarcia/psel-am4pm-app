import { View } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import type { RootStackParamList } from '../../../navigation/types';
import type { RouteProp } from '@react-navigation/native';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';

type RecipeDetailsRouteProp = RouteProp<RootStackParamList, 'RecipeDetails'>;

export default function RecipeDetails({
  route,
}: {
  route: RecipeDetailsRouteProp;
}) {
  const { data, isPending, error } = useRecipe(route.params.id);

  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const onFabPress = () => {
    navigation.navigate('RecipeEdit', { id: route.params.id });
  };

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
      <Text variant="titleLarge">{data?.name}</Text>
      <Text variant="bodyMedium">{data?.directions}</Text>
      <FAB style={styles.fab} icon="pencil" onPress={onFabPress} />
    </View>
  );
}
