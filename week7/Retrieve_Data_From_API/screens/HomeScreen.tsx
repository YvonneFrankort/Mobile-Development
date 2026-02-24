import { View } from 'react-native';
import { Search } from '../components/Search';
import { RestaurantList } from '../components/RestaurantList';
import { useRestaurants } from '../hooks/useRestaurants';

export function HomeScreen({ navigation }: any) {
  const restaurantHook = useRestaurants();

  return (
    <View style={{ flex: 1 }}>
      <Search {...restaurantHook} />
      <RestaurantList navigation={navigation} {...restaurantHook} />
    </View>
  );
}
