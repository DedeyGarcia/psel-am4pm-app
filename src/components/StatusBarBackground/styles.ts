import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { AppTheme } from '../../theme';

export const makeStyles = (theme: AppTheme, insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      height: insets.top,
      backgroundColor: theme.colors.background,
    },
  });
