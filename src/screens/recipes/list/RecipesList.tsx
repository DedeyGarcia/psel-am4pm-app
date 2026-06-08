import { View } from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useAuthStore } from '../../../store/authStore';

export default function RecipesList() {
  const signOut = useAuthStore(store => store.signOut);

  return (
    <View>
      <CustomButton mode="contained" fullWidth onPress={signOut}>
        Sair
      </CustomButton>
    </View>
  );
}
