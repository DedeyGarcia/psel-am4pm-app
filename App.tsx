import RootNavigator from './src/navigation/RootNavigator';
import { AppProvider } from './src/providers/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
