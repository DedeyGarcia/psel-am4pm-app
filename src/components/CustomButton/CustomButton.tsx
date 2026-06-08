import { Button } from 'react-native-paper';
import type { ButtonProps } from 'react-native-paper';
import { makeStyles } from './styles';

type CustomButtonProps = ButtonProps & {
  fullWidth?: boolean;
};

export default function CustomButton(props: CustomButtonProps) {
  const styles = makeStyles(props.fullWidth);
  return <Button style={{ ...props.style, ...styles.root }} {...props} />;
}
