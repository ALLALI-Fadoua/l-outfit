import type { Order, OrderStatus } from '../types/product'
import { makeDemoOrders } from './demoData'

const KEY = 'lo_orders'
const SEQ = 'lo_order_seq'
const DEMO_OFF = 'lo_demo_off'          // '1' = demo examples hidden
const DEMO_STATUS = 'lo_demo_status'    // status changes made on demo examples

const readJson = <T,>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback } }
const realOrders = (): Order[] => readJson<Order[]>(KEY, [])

export const isDemoOn = () => localStorage.getItem(DEMO_OFF) !== '1'
export function setDemoOn(on: boolean) { if (on) localStorage.removeItem(DEMO_OFF); else localStorage.setItem(DEMO_OFF, '1') }

/** Real orders (placed on the site) + demo examples when enabled, newest first. */
export function getOrders(): Order[] {
  const status = readJson<Record<string, OrderStatus>>(DEMO_STATUS, {})
  const demo = isDemoOn() ? makeDemoOrders().map((o) => ({ ...o, status: status[o.id] ?? o.status })) : []
  return [...realOrders(), ...demo].sort((a, b) => b.date.localeCompare(a.date))
}
export function nextOrderId(): string {
  const n = Number(localStorage.getItem(SEQ) || 123) + 1
  localStorage.setItem(SEQ, String(n))
  return `#LO-${String(n).padStart(6, '0')}`
}
export function saveOrder(o: Order) { localStorage.setItem(KEY, JSON.stringify([o, ...realOrders()])) }
export function updateOrderStatus(id: string, status: OrderStatus) {
  if (makeDemoOrders().some((o) => o.id === id)) {
    localStorage.setItem(DEMO_STATUS, JSON.stringify({ ...readJson<Record<string, OrderStatus>>(DEMO_STATUS, {}), [id]: status }))
    return
  }
  localStorage.setItem(KEY, JSON.stringify(realOrders().map((o) => (o.id === id ? { ...o, status } : o))))
}
