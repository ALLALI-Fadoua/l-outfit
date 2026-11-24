import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '../types/product'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { products } from '../data/products'
import { useLanguage } from './LanguageContext'
import { useToast } from './NotifyContext'

interface Ctx {
  cart: CartItem[]; wishlist: string[]; cartOpen: boolean
  setCartOpen: (b: boolean) => void
  addToCart: (i: CartItem) => void
  removeFromCart: (id: string, size: string, color: string) => void
  setQty: (id: string, size: string, color: string, qty: number) => void
  toggleWish: (id: string) => void
  clearCart: () => void
  count: number; subtotal: number
}
const ShopContext = createContext<Ctx | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const toast = useToast()
  const [rawCart, setCart] = useLocalStorage<CartItem[]>('lo_cart', [])
  const [rawWishlist, setWishlist] = useLocalStorage<string[]>('lo_wishlist', [])
  // ignore ids of products that were renamed/removed (old saved data)
  const known = (id: string) => products.some((p) => p.id === id)
  const cart = useMemo(() => rawCart.filter((i) => known(i.productId)), [rawCart])
  const wishlist = useMemo(() => rawWishlist.filter(known), [rawWishlist])
  const [cartOpen, setCartOpen] = useState(false)
  const same = (a: CartItem, id: string, s: string, c: string) => a.productId === id && a.size === s && a.color === c

  const value = useMemo<Ctx>(() => ({
    cart, wishlist, cartOpen, setCartOpen,
    addToCart: (i) => { setCart((p) => p.some((a) => same(a, i.productId, i.size, i.color))
      ? p.map((a) => same(a, i.productId, i.size, i.color) ? { ...a, qty: a.qty + i.qty } : a) : [...p, i]); setCartOpen(true) },
    removeFromCart: (id, s, c) => setCart((p) => p.filter((a) => !same(a, id, s, c))),
    setQty: (id, s, c, qty) => setCart((p) => p.map((a) => same(a, id, s, c) ? { ...a, qty: Math.max(1, qty) } : a)),
    clearCart: () => setCart([]),
    toggleWish: (id) => {
      const had = wishlist.includes(id)
      setWishlist((p) => (had ? p.filter((x) => x !== id) : [...p.filter((x) => x !== id), id]))
      toast({ type: 'success', title: t(had ? 'wish.removed' : 'wish.added') })
    },
    count: cart.reduce((n, i) => n + i.qty, 0),
    subtotal: cart.reduce((n, i) => n + i.qty * (products.find((p) => p.id === i.productId)?.price ?? 0), 0),
  }), [cart, wishlist, cartOpen, setCart, setWishlist, toast, t])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export function useShop() {
  const c = useContext(ShopContext)
  if (!c) throw new Error('useShop must be used inside ShopProvider')
  return c
}
