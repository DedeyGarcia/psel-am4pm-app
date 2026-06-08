import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      margin: theme.spacing.md,
      right: 0,
      bottom: 0,
    },
  });
