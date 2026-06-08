import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import { makeStyles } from './styles';
import { useAppTheme } from '../../../theme';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress = () => {};

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Receitas App</Text>
      <CustomTextInput label="Nome" />
      <CustomTextInput label="Email" />
      <CustomTextInput label="Senha" />
      <CustomButton mode="contained" fullWidth onPress={onSignUpPress}>
        Criar Conta
      </CustomButton>
      <CustomButton mode="outlined" fullWidth onPress={onLoginPress}>
        Entrar
      </CustomButton>
    </View>
  );
}
