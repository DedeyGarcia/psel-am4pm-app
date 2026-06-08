import { StyleSheet } from 'react-native';

export const makeStyles = (fullWidth?: boolean) =>
  StyleSheet.create({
    root: {
      width: fullWidth ? '100%' : 'auto',
    },
  });
