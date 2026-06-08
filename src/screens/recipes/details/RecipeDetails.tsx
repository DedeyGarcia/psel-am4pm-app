import { View } from 'react-native';
import { ActivityIndicator, FAB, Menu, Text } from 'react-native-paper';
import { useRecipe } from '../../../hooks/recipe/useRecipe';
import type { RootStackParamList } from '../../../navigation/types';
import type { RouteProp } from '@react-navigation/native';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDeleteRecipe } from '../../../hooks/recipe/useDeleteRecipe';

type RecipeDetailsRouteProp = RouteProp<RootStackParamList, 'RecipeDetails'>;

export default function RecipeDetails({
  route,
}: {
  route: RecipeDetailsRouteProp;
}) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { data, isPending, error } = useRecipe(route.params.id);
  const { mutate, isPending: isPendingDelete } = useDeleteRecipe();

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
      <View style={styles.fab}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <FAB
              icon="dots-vertical"
              onPress={openMenu}
              disabled={isPendingDelete}
              loading={isPendingDelete}
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
    </View>
  );
}
