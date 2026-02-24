import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export function DetailScreen({ route }: any) {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.address}>{restaurant.address}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lon,
          }}
          title={restaurant.name}
        />
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    gap: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  address: { 
    fontSize: 16, 
    color: '#555' 
  },
  map: { 
    flex: 1, 
    borderRadius: 12 },
});
