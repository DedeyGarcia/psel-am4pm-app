import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { queryClient } from '../lib/queryClient';
import { StatusBarBackground } from '../components/StatusBarBackground/StatusBarBackground';
import { theme } from '../theme';
import { styles } from './styles';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <View style={styles.root}>
              <StatusBarBackground />
              {children}
            </View>
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}
