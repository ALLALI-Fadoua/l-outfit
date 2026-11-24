import { CUSTOM_KEY, DELETED_KEY, isBaseProduct, loadCustomProducts, loadDeletedIds, products, syncProducts } from '../data/products'
import type { Product } from '../types/product'

export const MAX_PHOTOS = 8

export const slugify = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** "Robe Soirée Évasée" -> "robe-soiree-evasee" (unique among existing ids). */
export function makeId(name: string, ignoreId?: string): string {
  const base = slugify(name) || 'article'
  let id = base, n = 2
  while (products.some((p) => p.id === id && p.id !== ignoreId)) id = `${base}-${n++}`
  return id
}

const persist = (list: Product[]) => {
  // `custom` / `edited` are runtime flags, not stored. Throws if the browser storage is full.
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list.map(({ custom, edited, ...rest }) => { void custom; void edited; return rest })))
  syncProducts()
}

export function saveCustomProduct(p: Product): void {
  const list = loadCustomProducts()
  const exists = list.some((x) => x.id === p.id)
  persist(exists ? list.map((x) => (x.id === p.id ? p : x)) : [p, ...list])
}
/** Delete any article: an article added by the admin is removed; a built-in one is hidden (can be restored). */
export function deleteProduct(id: string): void {
  if (isBaseProduct(id)) localStorage.setItem(DELETED_KEY, JSON.stringify([...new Set([...loadDeletedIds(), id])]))
  persist(loadCustomProducts().filter((x) => x.id !== id))
}
export const deletedCount = () => loadDeletedIds().length
export function restoreDeleted(): void { localStorage.removeItem(DELETED_KEY); syncProducts() }

/** Resize + re-encode a photo in the browser so many photos fit in the browser storage (JPEG, max 1000 px). */
export function compressImage(file: File, maxSide = 1000, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const k = Math.min(1, maxSide / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k)
      const ctx = c.getContext('2d')
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error('canvas')); return }
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height)   // PNG transparency -> white
      ctx.drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image')) }
    img.src = url
  })
}
