import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { makeStyles } from './styles';
import { useAppTheme } from '../../../theme';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../../hooks/useLogin';
import { LoginFormData, loginSchema } from './schema';
import { getErrorMessage } from '../../../lib/getErrorMessage';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function LoginScreen() {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const { mutate, isPending, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onLoginPress: SubmitHandler<LoginFormData> = data => {
    mutate(data);
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text variant="titleLarge">Receitas App</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Login"
            placeholder="Digite seu login"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.login}
            errorMessage={errors.login?.message}
          />
        )}
        name="login"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Senha"
            placeholder="Digite sua senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <CustomButton
        mode="contained"
        fullWidth
        onPress={handleSubmit(onLoginPress)}
        loading={isPending}
        disabled={isPending}
      >
        Entrar
      </CustomButton>
      {error && (
        <Text style={{ color: theme.colors.error }}>
          {getErrorMessage(error, { 401: 'Login ou senha inválidos.' })}
        </Text>
      )}

      <CustomButton
        mode="outlined"
        fullWidth
        onPress={onSignUpPress}
        disabled={isPending}
      >
        Criar Conta
      </CustomButton>
    </KeyboardAvoidingView>
  );
}
