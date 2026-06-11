/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import type { RootStackParamList } from './types';
import LoginScreen from '../screens/auth/login/LoginScreen';
import SignUpScreen from '../screens/auth/signup/SignUpScreen';
import HomeScreen from '../screens/recipes/home/HomeScreen';
import RecipeDetails from '../screens/recipes/details/RecipeDetails';
import RecipeEdit from '../screens/recipes/edit/RecipeEdit';
import { AuthenticatedScreensLayout } from './layouts/authenticated/AuthenticatedScreensLayout';
import { PublicScreensLayout } from './layouts/public/PublicScreensLayout';
import AppHeader from '../components/AppHeader/AppHeader';
import RecipesHeader from '../components/RecipesHeader/RecipesHeader';
import RecipeCreate from '../screens/recipes/create/RecipeCreate';

const RootStack = createNativeStackNavigator<RootStackParamList>();

type RootStackType = typeof RootStack;

declare module '@react-navigation/core' {
  interface RootNavigator extends RootStackType {}
}

export default function RootNavigator() {
  const token = useAuthStore(state => state.token);
  const hasHydrated = useAuthStore(state => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      BootSplash.hide({ fade: true });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null;
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
              component={HomeScreen}
              options={{ header: RecipesHeader }}
            />
            <RootStack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              options={{ title: 'Detalhes da Receita' }}
            />
            <RootStack.Screen
              name="RecipeCreate"
              component={RecipeCreate}
              options={{ title: 'Nova Receita' }}
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
