import type { Product } from '../types/product'
/** Priority: same category > subcategory > style > color > price range. Never unrelated first. */
export function similarProducts(base: Product, all: Product[], limit = 4): Product[] {
  return all.filter((p) => p.id !== base.id).map((p) => {
    let s = 0
    if (p.category === base.category) s += 100
    if (p.subcategory === base.subcategory) s += 40
    if (p.style === base.style) s += 20
    if (p.colors.some((c) => base.colors.some((b) => b.key === c.key))) s += 10
    if (Math.abs(p.price - base.price) <= 3000) s += 5
    return { p, s }
  }).sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.p)
}
