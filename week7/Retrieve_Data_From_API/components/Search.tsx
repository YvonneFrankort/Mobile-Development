import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  city: string;
  setCity: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  search: () => void;
};

export function Search({ city, setCity, type, setType, search }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant type"
        value={type}
        onChangeText={setType}
      />
      <Button title="Search" onPress={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, fontSize: 16 },
});
