import { StyleSheet, Text, View } from 'react-native';
import OnBoarding from './components/OnBoarding/OnBoarding';

export default function App() {
  return (
    <View style={styles.container}>
      <OnBoarding/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
