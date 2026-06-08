import { DimensionValue, StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

export const makeStyles = (theme: AppTheme, maxWidth?: DimensionValue) =>
  StyleSheet.create({
    root: {
      width: '100%',
      maxWidth: maxWidth,
      gap: theme.spacing.sm,
    },
  });
