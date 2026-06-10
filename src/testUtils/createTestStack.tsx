import { View } from 'react-native';
import { createNavigatorFactory, useNavigationBuilder } from '@react-navigation/core';
import { StackRouter } from '@react-navigation/routers';

function TestStackNavigator(props: any) {
  const { state, descriptors, NavigationContent } = useNavigationBuilder(
    StackRouter,
    props,
  );
  return (
    <NavigationContent>
      {state.routes.map((route, index) => (
        <View key={route.key} aria-hidden={index !== state.index}>
          {descriptors[route.key].render()}
        </View>
      ))}
    </NavigationContent>
  );
}

export const createTestStack = createNavigatorFactory(TestStackNavigator);
