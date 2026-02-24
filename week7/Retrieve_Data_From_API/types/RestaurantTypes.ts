export type Restaurant = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address: string;
  category: string;
};

export type RestaurantDetail = {
  title: string;
  description?: string;
  extract?: string;
  image?: string;
};
