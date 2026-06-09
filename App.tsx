import { AppProvider } from './src/providers/AppProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
