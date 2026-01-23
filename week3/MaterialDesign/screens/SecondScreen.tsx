
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SecondScreen({ navigation }: any) {
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Second Screen 🐿️</Text>

      <Button 
      title="Go back to Home Screen" 
      color= "green"
      onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  }
});
