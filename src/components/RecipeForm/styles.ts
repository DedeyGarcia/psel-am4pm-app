import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      gap: theme.spacing.sm,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingVertical: theme.spacing.sm,
    },
    button: {
      flex: 1,
    },
    textAreaInput: {
      minHeight: 120,
    },
  });
