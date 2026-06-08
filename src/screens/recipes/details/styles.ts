import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    loadingOrErrorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  });
