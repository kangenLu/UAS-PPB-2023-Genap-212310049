import 'react-native-gesture-handler';
import Nav from './src/Nav';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  );
};