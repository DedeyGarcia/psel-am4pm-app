import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../theme';
import { makeStyles } from './styles';

export function StatusBarBackground() {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  const styles = makeStyles(theme, insets);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.root} />
    </>
  );
}
