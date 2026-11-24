import type { Product } from '../../types/product'
import ProductCard from './ProductCard'
export default function ProductGrid({ items, badge }: { items: Product[]; badge?: 'best' | 'new' }) {
  return <div className="pgrid">{items.map((p) => <ProductCard key={p.id} product={p} badge={badge} />)}</div>
}
