import { useState } from 'react';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import { TextInput } from 'react-native-paper';

type PasswordInputProps = {
  label: string;
  placeholder: string;
  onBlur: () => void;
  onChangeText: (value: string) => void;
  value: string;
  error: boolean;
  errorMessage?: string;
};

export default function PasswordInput({
  label,
  placeholder,
  onBlur,
  onChangeText,
  value,
  error,
  errorMessage,
}: PasswordInputProps) {
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <CustomTextInput
      label={label}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={hidePassword}
      error={error}
      errorMessage={errorMessage}
      right={
        <TextInput.Icon
          icon={hidePassword ? 'eye' : 'eye-off'}
          onPress={toggleHidePassword}
          forceTextInputFocus={false}
        />
      }
    />
  );
}
