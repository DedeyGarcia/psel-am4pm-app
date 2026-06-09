import { StyleSheet } from 'react-native';
import { AppTheme, theme } from '../../../../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    separator: {
      width: theme.spacing.xs,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoriesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
