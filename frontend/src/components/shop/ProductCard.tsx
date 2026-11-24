import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import ProductImage from '../ui/ProductImage'
import { useLanguage } from '../../context/LanguageContext'
import { useShop } from '../../context/ShopContext'
import { formatPrice } from '../../utils/helpers'

export default function ProductCard({ product, badge }: { product: Product; badge?: 'best' | 'new' }) {
  const { lang, t } = useLanguage()
  const { wishlist, toggleWish, addToCart } = useShop()
  const liked = wishlist.includes(product.id)
  const name = product.name[lang]
  const firstSize = product.sizes.find((s) => product.stock[s]) ?? product.sizes[0]
  return (
    <article className="pcard">
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} aria-label={name}>
          <ProductImage src={product.image} alt={name} category={product.category} />
          {product.images[1] && <span className="pcard__alt"><ProductImage src={product.images[1]} alt="" category={product.category} /></span>}
        </Link>
        {product.discount ? <span className="badge badge--sale">-{product.discount}%</span> : badge ? <span className="badge">{t(`badge.${badge}`)}</span> : null}
        <button className={`heart ${liked ? 'is-on' : ''}`} onClick={() => toggleWish(product.id)} aria-pressed={liked} aria-label={t('wishlist')}>
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
        <button className="pcard__quick" onClick={() => addToCart({ productId: product.id, size: firstSize, color: product.colors[0].key, qty: 1 })}>{t('quickAdd')}</button>
      </div>
      <div className="pcard__info">
        <Link to={`/product/${product.id}`} className="pcard__name">{name}</Link>
        <div className="pcard__price">
          <strong>{formatPrice(product.price, lang)}</strong>
          {product.oldPrice && <s>{formatPrice(product.oldPrice, lang)}</s>}
        </div>
        <div className="dots">{product.colors.map((c) => <i key={c.key} style={{ background: c.hex }} title={t(`color.${c.key}`)} />)}</div>
      </div>
    </article>
  )
}
