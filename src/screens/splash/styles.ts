import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme';

export const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
