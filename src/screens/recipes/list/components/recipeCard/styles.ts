import { StyleSheet } from 'react-native';
import { AppTheme, theme } from '../../../../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    content: {
      gap: theme.spacing.sm,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ingredientsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
