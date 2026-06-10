import { KeyboardGestureArea } from 'react-native-keyboard-controller';
import { makeStyles } from './styles';
import { useAppTheme } from '../../theme';

export default function CustomKeyboardGestureArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <KeyboardGestureArea interpolator="ios" style={styles.gestureArea}>
      {children}
    </KeyboardGestureArea>
  );
}
