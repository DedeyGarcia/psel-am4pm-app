import { StyleSheet } from 'react-native';
import { AppTheme, theme } from '../../../../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    content: {
      gap: theme.spacing.sm,
    },
    ingredientsRow: {
      gap: theme.spacing.xs,
    },
    textWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });
