import { DimensionValue, View } from 'react-native';
import { makeStyles } from './styles';
import { Text, TextInput } from 'react-native-paper';
import type { TextInputProps } from 'react-native-paper';
import { useAppTheme } from '../../theme';

type CustomTextInputProps = TextInputProps & {
  maxWidth?: DimensionValue | undefined;
  errorMessage?: string;
};

export default function CustomTextInput(props: CustomTextInputProps) {
  const theme = useAppTheme();
  const styles = makeStyles(theme, props.maxWidth);
  return (
    <View style={styles.root}>
      <TextInput
        outlineStyle={{ borderRadius: theme.spacing.md }}
        mode="outlined"
        {...props}
      />
      {props.errorMessage && (
        <Text variant="bodySmall" style={{ color: theme.colors.error }}>
          {props.errorMessage}
        </Text>
      )}
    </View>
  );
}
