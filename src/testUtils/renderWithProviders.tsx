import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

function AppProviders({ children }: { children: ReactNode }) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}

export async function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return await render(ui, { wrapper: AppProviders, ...options });
}
