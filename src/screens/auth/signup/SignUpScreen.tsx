import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress = () => {};

  return (
    <View>
      <Text>LoginScreen</Text>
      <TextInput label="Nome" />
      <TextInput label="Email" />
      <TextInput label="Senha" />
      <Button mode="contained" onPress={onSignUpPress}>
        Criar Conta
      </Button>
      <Button mode="outlined" onPress={onLoginPress}>
        Fazer Login
      </Button>
    </View>
  );
}
