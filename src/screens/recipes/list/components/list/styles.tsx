import { StyleSheet } from 'react-native';
import { AppTheme, theme } from '../../../../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    separator: {
      height: theme.spacing.md,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
