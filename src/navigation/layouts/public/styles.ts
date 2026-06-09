import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
  });
