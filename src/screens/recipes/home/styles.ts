import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      gap: theme.spacing.sm,
    },
    loadingOrErrorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  });
