import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   alignItems: 'center',
      gap: theme.spacing.sm,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    button: {
      flex: 1,
    },
  });
