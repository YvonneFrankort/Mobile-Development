import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Restaurant } from '../types/RestaurantTypes';

type Props = {
  navigation: any;
  restaurants: Restaurant[];
  loading: boolean;
  error: boolean;
};


export function RestaurantList({ navigation, restaurants, loading, error }: Props) {

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Something went wrong</Text>
      </View>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Search for restaurants close to you!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Details', { restaurant: item })}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.address}</Text>
          <Text>Type: {item.category}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { 
    padding: 16, 
    gap: 12 
},
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 10, 
    elevation: 2 
},
  name: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 4 
},
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 },
});
