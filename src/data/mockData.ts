import { Address, CartItem, Category, Order, Product, Review, UserProfile, WishlistItem } from '../types';

export const categories: Category[] = [
  { id: 'c1', name: 'Sneakers' },
  { id: 'c2', name: 'Accessories' },
  { id: 'c3', name: 'Outerwear' },
  { id: 'c4', name: 'Denim' },
  { id: 'c5', name: 'Fitness' },
  { id: 'c6', name: 'Watches' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Aurora Running Shoe',
    brand: 'Atlas',
    price: 148,
    discount: 0.15,
    rating: 4.8,
    reviewCount: 248,
    colors: ['#0A84FF', '#34C759', '#FF9F0A'],
    sizes: ['7', '8', '9', '10', '11'],
    categoryId: 'c1',
    description: 'Lightweight runner with breathable mesh and responsive cushioning.',
    specs: ['Mesh upper', 'Foam midsole', 'Rubber outsole', '320g'],
    imageCount: 4,
  },
  {
    id: 'p2',
    name: 'Solstice Jacket',
    brand: 'Northline',
    price: 220,
    discount: 0.1,
    rating: 4.6,
    reviewCount: 143,
    colors: ['#111827', '#6B7280'],
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 'c3',
    description: 'Water-resistant shell with premium insulation for urban winters.',
    specs: ['Water resistant', 'Thermal lining', 'Hidden pockets'],
    imageCount: 3,
  },
  {
    id: 'p3',
    name: 'Verde Crossbody',
    brand: 'Linea',
    price: 96,
    discount: 0.2,
    rating: 4.4,
    reviewCount: 89,
    colors: ['#34C759', '#0A84FF'],
    sizes: ['One Size'],
    categoryId: 'c2',
    description: 'Compact crossbody with soft grain leather and easy access zip.',
    specs: ['Leather', 'Magnetic clasp', 'Adjustable strap'],
    imageCount: 5,
  },
  {
    id: 'p4',
    name: 'Cascade Smartwatch',
    brand: 'Chronos',
    price: 310,
    discount: 0.05,
    rating: 4.9,
    reviewCount: 412,
    colors: ['#111827', '#0A84FF', '#FF9F0A'],
    sizes: ['40mm', '44mm'],
    categoryId: 'c6',
    description: 'OLED smartwatch with adaptive health tracking and week-long battery.',
    specs: ['OLED display', '7-day battery', 'Heart rate sensor'],
    imageCount: 4,
  },
  {
    id: 'p5',
    name: 'Prime Denim',
    brand: 'Stoneworks',
    price: 132,
    discount: 0.12,
    rating: 4.3,
    reviewCount: 67,
    colors: ['#1F2937', '#4B5563'],
    sizes: ['28', '30', '32', '34', '36'],
    categoryId: 'c4',
    description: 'Slim straight denim with stretch and clean hemming.',
    specs: ['98% cotton', '2% elastane', 'Mid-rise'],
    imageCount: 3,
  },
  {
    id: 'p6',
    name: 'Pulse Training Set',
    brand: 'Aero',
    price: 118,
    discount: 0.18,
    rating: 4.5,
    reviewCount: 112,
    colors: ['#0A84FF', '#111827'],
    sizes: ['S', 'M', 'L'],
    categoryId: 'c5',
    description: 'Performance training set with sweat-wicking fabric.',
    specs: ['Quick dry', 'Four-way stretch', 'Anti-odor'],
    imageCount: 3,
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    author: 'Sophia R.',
    rating: 5,
    comment: 'Incredibly light and comfortable for long runs.',
    date: '2024-07-18',
  },
  {
    id: 'r2',
    productId: 'p1',
    author: 'Marcus T.',
    rating: 4,
    comment: 'Supportive fit and great cushioning.',
    date: '2024-08-02',
  },
  {
    id: 'r3',
    productId: 'p4',
    author: 'Amelia W.',
    rating: 5,
    comment: 'Battery life is impressive and the screen is crisp.',
    date: '2024-09-01',
  },
];

export const cartSeed: CartItem[] = [
  { id: 'ci1', productId: 'p1', quantity: 1 },
  { id: 'ci2', productId: 'p3', quantity: 2 },
];

export const wishlistSeed: WishlistItem[] = [
  { id: 'w1', productId: 'p4', addedAt: '2024-09-10' },
  { id: 'w2', productId: 'p2', addedAt: '2024-09-12' },
];

export const ordersSeed: Order[] = [
  {
    id: 'o1',
    items: [
      { id: 'oi1', productId: 'p6', quantity: 1, price: 118 },
      { id: 'oi2', productId: 'p5', quantity: 1, price: 132 },
    ],
    status: 'delivered',
    placedAt: '2024-08-21',
    eta: '2024-08-26',
    total: 250,
    paymentMethod: 'Apple Pay',
    shipping: 0,
  },
  {
    id: 'o2',
    items: [{ id: 'oi3', productId: 'p1', quantity: 1, price: 148 }],
    status: 'shipped',
    placedAt: '2024-09-12',
    eta: '2024-09-18',
    total: 148,
    paymentMethod: 'Visa •• 4242',
    shipping: 6,
  },
];

export const addresses: Address[] = [
  {
    id: 'a1',
    label: 'Home',
    line1: '220 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
  },
  {
    id: 'a2',
    label: 'Studio',
    line1: '19 Howard Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'USA',
  },
];

export const userProfile: UserProfile = {
  id: 'u1',
  name: 'Jordan Evans',
  email: 'jordan.evans@example.com',
  phone: '+1 (415) 230-8820',
  defaultAddressId: 'a1',
  appearance: 'system',
  notificationsEnabled: true,
  privacyMode: false,
};
