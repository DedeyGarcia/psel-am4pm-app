import { MD3LightTheme, MD3Theme, useTheme } from 'react-native-paper';

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
  },
  spacing,
} satisfies MD3Theme & { spacing: typeof spacing };

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
