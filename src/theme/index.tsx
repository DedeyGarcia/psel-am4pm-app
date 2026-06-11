import {
  MD3LightTheme,
  MD3Theme,
  configureFonts,
  useTheme,
} from 'react-native-paper';

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
const sizes = { headerHeight: 32 } as const;

const regular = {
  fontFamily: 'Montserrat-Regular',
  fontWeight: '400',
} as const;
const medium = { fontFamily: 'Montserrat-Medium', fontWeight: '400' } as const;
const bold = { fontFamily: 'Montserrat-Bold', fontWeight: '400' } as const;

const fonts = configureFonts({
  config: {
    displayLarge: bold,
    displayMedium: bold,
    displaySmall: bold,
    headlineLarge: bold,
    headlineMedium: medium,
    headlineSmall: medium,
    titleLarge: medium,
    titleMedium: medium,
    titleSmall: medium,
    labelLarge: medium,
    labelMedium: medium,
    labelSmall: medium,
    bodyLarge: regular,
    bodyMedium: regular,
    bodySmall: regular,
  },
});

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#902500',
    onPrimary: '#FFFFFF',
    primaryContainer: '#B33B15',
    onPrimaryContainer: '#FFDAD0',
    secondary: '#8E4C39',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FEA991',
    onSecondaryContainer: '#793B29',
    tertiary: '#745B00',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#C8A84A',
    onTertiaryContainer: '#4F3D00',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',
    background: '#FFF8F6',
    onBackground: '#251915',
    surface: '#FFF8F6',
    onSurface: '#251915',
    surfaceVariant: '#FEDBD2',
    onSurfaceVariant: '#59413B',
    outline: '#8C7169',
    outlineVariant: '#E0BFB7',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#3C2D29',
    inverseOnSurface: '#FFEDE8',
    inversePrimary: '#FFB5A0',
  },
  fonts,
  spacing,
  sizes,
} satisfies MD3Theme & { spacing: typeof spacing; sizes: typeof sizes };

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
