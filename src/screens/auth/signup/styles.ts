import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
  });
