import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';
import { EdgeInsets } from 'react-native-safe-area-context';

export const makeStyles = (theme: AppTheme, insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      height: theme.sizes.headerHeight + insets.top,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    titleContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
  });
