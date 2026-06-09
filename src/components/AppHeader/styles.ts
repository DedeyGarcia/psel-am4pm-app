import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';
import { EdgeInsets } from 'react-native-safe-area-context';

export const makeStyles = (theme: AppTheme, insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      paddingTop: insets.bottom,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
  });
