import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { makeStyles } from './styles';
import { useAppTheme } from '../../../theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const onLoginPress = () => {};

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TextInput label="Email" />
      <TextInput label="Senha" />
      <Button mode="contained" onPress={onLoginPress}>
        Entrar
      </Button>
      <Button mode="outlined" onPress={onSignUpPress}>
        Criar Conta
      </Button>
    </View>
  );
}
