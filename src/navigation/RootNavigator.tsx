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
            // eslint-disable-next-line react/no-unstable-nested-components
            screenOptions={{ header: props => <AppHeader {...props} /> }}
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
          </RootStack.Group>
        ) : (
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
