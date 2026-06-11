import { Appbar } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { queryClient } from '../../lib/queryClient';

export default function LogoutButton() {
  const signOut = useAuthStore(state => state.signOut);

  const handleSignOut = () => {
    signOut();
    queryClient.clear();
  };

  return <Appbar.Action icon="logout" onPress={handleSignOut} />;
}
