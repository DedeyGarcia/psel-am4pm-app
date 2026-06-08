import {
  Dropdown,
  DropdownProps,
  DropdownInputProps,
} from 'react-native-paper-dropdown';
import CustomTextInput from '../CustomTextInput/CustomTextInput';

type CustomDropdownInputProps = DropdownInputProps & {
  errorMessage?: string;
};

type CustomDropdownProps = DropdownProps & {
  errorMessage?: string;
};

function DropdownInput({
  rightIcon,
  selectedLabel,
  errorMessage,
  ...rest
}: CustomDropdownInputProps) {
  return (
    <CustomTextInput
      {...rest}
      value={selectedLabel}
      right={rightIcon}
      editable={false}
      errorMessage={errorMessage}
    />
  );
}

export default function CustomDropdown({
  errorMessage,
  ...props
}: CustomDropdownProps) {
  return (
    <Dropdown
      {...props}
      // eslint-disable-next-line react/no-unstable-nested-components
      CustomDropdownInput={inputProps => (
        <DropdownInput {...inputProps} errorMessage={errorMessage} />
      )}
    />
  );
}
