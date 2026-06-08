/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import type { RootStackParamList } from './types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import LoginScreen from '../screens/auth/login/LoginScreen';
import SignUpScreen from '../screens/auth/signup/SignUpScreen';
import RecipesList from '../screens/recipes/list/RecipesList';
import { AppHeader } from './AppHeader';
import RecipeDetails from '../screens/recipes/details/RecipeDetails';
import { RecipeCreate } from '../screens/recipes/create/RecipeCreate';
import RecipeEdit from '../screens/recipes/edit/RecipeEdit';
import { AuthenticatedScreensLayout } from './layouts/authenticated/AuthenticatedScreensLayout';
import { PublicScreensLayout } from './layouts/public/PublicScreensLayout';

const RootStack = createNativeStackNavigator<RootStackParamList>();

type RootStackType = typeof RootStack;

declare module '@react-navigation/core' {
  interface RootNavigator extends RootStackType {}
}

export function RootNavigator() {
  const token = useAuthStore(state => state.token);
  const hasHydrated = useAuthStore(state => state.hasHydrated);

  // TODO: Add Splash Screen
  if (!hasHydrated) {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {token ? (
          <RootStack.Group
            screenOptions={{ header: AppHeader }}
            screenLayout={({ children }) => (
              <AuthenticatedScreensLayout>
                {children}
              </AuthenticatedScreensLayout>
            )}
          >
            <RootStack.Screen
              name="Recipes"
              component={RecipesList}
              options={{ title: 'Minhas Receitas' }}
            />
            <RootStack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              options={{ title: 'Detalhes da Receita' }}
            />
            <RootStack.Screen
              name="RecipeCreate"
              component={RecipeCreate}
              options={{ title: 'Criar Receita' }}
            />
            <RootStack.Screen
              name="RecipeEdit"
              component={RecipeEdit}
              options={{ title: 'Editar Receita' }}
            />
          </RootStack.Group>
        ) : (
          <RootStack.Group
            screenOptions={{ headerShown: false }}
            screenLayout={({ children }) => (
              <PublicScreensLayout>{children}</PublicScreensLayout>
            )}
          >
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
