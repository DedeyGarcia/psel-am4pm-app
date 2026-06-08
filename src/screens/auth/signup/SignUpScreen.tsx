import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import { makeStyles } from './styles';
import { useAppTheme } from '../../../theme';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '../../../hooks/useSignUp';
import { CreateAccountFormData, createAccountSchema } from './schema';
import { getErrorMessage } from '../../../lib/getErrorMessage';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const { mutate, isPending, error } = useSignUp();

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress: SubmitHandler<CreateAccountFormData> = data => {
    mutate(data, {
      onSuccess: () => {
        navigation.navigate('Login');
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Receitas App</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Nome"
            placeholder="Digite seu nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        )}
        name="name"
      />
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
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <CustomButton
        mode="contained"
        fullWidth
        onPress={handleSubmit(onSignUpPress)}
        loading={isPending}
        disabled={isPending}
      >
        Criar Conta
      </CustomButton>
      {error && (
        <Text variant="bodySmall" style={{ color: theme.colors.error }}>
          {getErrorMessage(error, {
            409: 'Já existe uma conta com esse login.',
          })}
        </Text>
      )}

      <CustomButton
        mode="outlined"
        fullWidth
        onPress={onLoginPress}
        disabled={isPending}
      >
        Entrar
      </CustomButton>
    </View>
  );
}
