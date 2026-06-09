import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      gap: theme.spacing.md,
    },
    buttonContainer: {
      backgroundColor: theme.colors.background,
      paddingVertical: theme.spacing.sm,
    },
    button: {
      alignSelf: 'stretch',
    },
    textAreaInput: {
      minHeight: 120,
    },
  });
