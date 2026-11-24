import type { Product } from '../types/product'

/**
 * PRODUCT PHOTOS — drop files in  src/assets/images/products/  and they are picked up automatically.
 *   <product-id>-1.jpg   main photo (card + gallery first image)
 *   <product-id>-2.jpg   2nd photo  (shown on hover in cards + gallery)   → -3, -4 … add more
 * (jpg, jpeg, png, webp). The product id is the `id` in src/data/products.ts.
 * A product without a file keeps its coloured placeholder.
 */
const files = import.meta.glob('../assets/images/products/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const byProduct: Record<string, { n: number; url: string }[]> = {}
for (const [path, url] of Object.entries(files)) {
  const m = /\/([^/]+?)(?:-(\d+))?\.(?:jpe?g|png|webp)$/i.exec(path)
  if (!m) continue
  ;(byProduct[m[1]] ??= []).push({ n: m[2] ? Number(m[2]) : 0, url })
}

export const photosOf = (id: string): string[] => (byProduct[id] ?? []).sort((a, b) => a.n - b.n).map((x) => x.url)
export const photoFileName = (id: string) => `${id}-1.jpg`

/** Replaces placeholders by real photos when they exist. */
export function applyPhotos(p: Product): Product {
  const photos = photosOf(p.id)
  return photos.length ? { ...p, image: photos[0], images: photos } : p
}
