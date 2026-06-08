import { View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useAppTheme } from '../../../theme';
import { makeStyles } from './styles';

export function AuthenticatedScreensLayout({ children }: PropsWithChildren) {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  return <View style={styles.root}>{children}</View>;
}
