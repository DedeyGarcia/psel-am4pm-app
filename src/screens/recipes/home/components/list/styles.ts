import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    separator: {
      height: theme.spacing.md,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
