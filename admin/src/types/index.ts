export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'restaurant_owner';
  addresses: Address[];
  loyaltyPoints: number;
  totalOrders: number;
  favoriteCuisine?: string;
  dietaryPreference?: string;
  spiceLevel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  veg: boolean;
  bestseller: boolean;
  offer: boolean;
  rating: number;
  description?: string;
  preparationTime?: string;
  calories?: string;
  image?: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  image: string;
  offer?: string;
  hasOffer: boolean;
  isVeg: boolean;
  priceRange: number;
  isBestseller: boolean;
  popularity: number;
  menu: MenuItem[];
  owner?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  veg: boolean;
}

export interface Order {
  _id: string;
  user: string;
  restaurant: string;
  restaurantName: string;
  restaurantCuisine: string;
  items: OrderItem[];
  total: number;
  finalAmount: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'upi' | 'cash' | 'qr';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryAddress: string;
  deliveryInstructions?: string;
  orderDate: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
  };
  rating?: number;
  review?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  activeOrders: number;
  todayOrders: number;
  todayRevenue: number;
  usersChange: number;
  restaurantsChange: number;
  ordersChange: number;
  revenueChange: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
