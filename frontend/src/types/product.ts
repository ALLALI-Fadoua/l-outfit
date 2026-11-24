export type Lang = 'fr' | 'en' | 'ar'
export interface Product {
  id: string
  name: Record<Lang, string>
  category: string
  subcategory: string
  price: number
  oldPrice?: number
  discount?: number
  sizes: string[]
  colors: { key: string; hex: string; label?: Record<Lang, string> }[]
  style: string
  image: string
  images: string[]
  tags: string[]
  description?: Record<Lang, string>
  /** true for articles added from the admin (stored in this browser) */
  custom?: boolean
  /** a built-in article modified from the admin */
  edited?: boolean
  /** edited article that keeps the built-in photos (nothing stored for them) */
  keepBaseImages?: boolean
  stock: Record<string, boolean>
  isNew?: boolean
  isBestSeller?: boolean
  isTrending?: boolean
}
export interface Category { slug: string; hex: string }
export interface CartItem { productId: string; size: string; color: string; qty: number }
export type OrderStatus = 'new' | 'confirmed' | 'shipped' | 'delivered'
export interface Customer { lastName: string; firstName: string; phone: string; wilaya: number; commune: string; address: string; note: string }
export interface Order { id: string; items: CartItem[]; subtotal: number; delivery: number; total: number; date: string; status: OrderStatus; customer: Customer; demo?: boolean }
