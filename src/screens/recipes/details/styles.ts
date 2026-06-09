import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    scrollView: {
      gap: theme.spacing.sm,
    },
    loadingOrErrorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    subTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });
