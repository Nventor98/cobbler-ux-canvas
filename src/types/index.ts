// User roles
export type UserRole = 'customer' | 'cobbler' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

// Cobbler (Vendor) profile
export interface Cobbler {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  verified: boolean;
  specialties: string[];
  portfolio: string[];
  yearsExperience: number;
  completionRate: number;
  responseTime: string;
  createdAt: string;
}

// Product
export interface Product {
  id: string;
  cobblerId: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  sizes?: string[];
  colors?: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export type ProductCategory = 
  | 'shoes'
  | 'sandals'
  | 'bags'
  | 'belts'
  | 'wallets'
  | 'accessories'
  | 'custom';

// Repair Service
export interface RepairService {
  id: string;
  cobblerId: string;
  name: string;
  description: string;
  basePrice: number;
  estimatedDays: number;
  category: RepairCategory;
}

export type RepairCategory = 
  | 'sole-replacement'
  | 'heel-repair'
  | 'stitching'
  | 'polishing'
  | 'color-restoration'
  | 'size-adjustment'
  | 'custom-repair';

// Repair Request
export interface RepairRequest {
  id: string;
  customerId: string;
  cobblerId: string;
  serviceId: string;
  description: string;
  images: string[];
  status: RepairStatus;
  quotedPrice?: number;
  estimatedCompletion?: string;
  cobblerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type RepairStatus = 
  | 'pending'
  | 'quoted'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'rejected';

// Order
export interface Order {
  id: string;
  customerId: string;
  cobblerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Cart
export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

// Review
export interface Review {
  id: string;
  userId: string;
  targetId: string; // cobblerId or productId
  targetType: 'cobbler' | 'product' | 'order';
  rating: number;
  comment: string;
  createdAt: string;
}

// Message
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'repair' | 'message' | 'system';
  read: boolean;
  createdAt: string;
}
