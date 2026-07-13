export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  categoryId: string;
  description: string;
  specs: string[];
  imageCount: number;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
};

export type WishlistItem = {
  id: string;
  productId: string;
  addedAt: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  status: 'processing' | 'shipped' | 'delivered';
  placedAt: string;
  eta: string;
  total: number;
  paymentMethod: string;
  shipping: number;
};

export type Address = {
  id: string;
  label: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  defaultAddressId: string;
  appearance: 'system' | 'light' | 'dark';
  notificationsEnabled: boolean;
  privacyMode: boolean;
};
