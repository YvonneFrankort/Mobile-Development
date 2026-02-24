import { useState } from 'react';
import type { Restaurant } from '../types/RestaurantTypes';

export function useRestaurants() {
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = async () => {
    if (!city.trim() || !type.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const query = encodeURIComponent(`${type} ${city}`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );

      if (!res.ok) throw new Error('Fetch failed');

      const data = await res.json();

      const mapped: Restaurant[] = data.map((item: any) => ({
        id: String(item.place_id),
        name: item.display_name.split(',')[0],
        address: item.display_name,
        category: item.type,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }));

      setRestaurants(mapped);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    setCity,
    type,
    setType,
    search,
    restaurants,
    loading,
    error,
  } as const;
}
