// ─── Product ───────────────────────────────────────────────
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: "charts" | "models" | "3d-printing" | "clothes";
  image: string;
  description: string;
  stock: number;
  featured: boolean;
  createdAt: string;
}

// ─── Cart ──────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Order ─────────────────────────────────────────────────
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  _id: string;
  user: string;
  items: { product: Product; quantity: number; price: number }[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// ─── User ──────────────────────────────────────────────────
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

// ─── Custom Requests ───────────────────────────────────────
export type RequestType = "model" | "clothes" | "3d-printing";
export type RequestStatus = "pending" | "reviewing" | "accepted" | "rejected" | "completed";

export interface CustomRequest {
  _id: string;
  type: RequestType;
  title: string;
  description: string;
  budget?: number;
  fileUrl?: string;
  status: RequestStatus;
  user: string;
  createdAt: string;
}

// ─── News ──────────────────────────────────────────────────
export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  createdAt: string;
}

// ─── Auth ──────────────────────────────────────────────────
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
