import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useShop } from '../../context/ShopContext'
import { products } from '../../data/products'
import ProductImage from '../ui/ProductImage'
import { formatPrice } from '../../utils/helpers'

export default function CartDrawer() {
  const { t, lang } = useLanguage()
  const { cart, cartOpen, setCartOpen, removeFromCart, setQty, subtotal } = useShop()
  return (
    <>
      <div className={`overlay ${cartOpen ? 'is-open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen} aria-label={t('cart')}>
        <div className="drawer__head"><h2>{t('cart')}</h2><button onClick={() => setCartOpen(false)} aria-label="×">×</button></div>
        <div className="drawer__body">
          {cart.length === 0 && <p className="muted">{t('cart.empty')}</p>}
          {cart.map((i) => { const p = products.find((x) => x.id === i.productId); if (!p) return null
            return (
              <div className="line" key={i.productId + i.size + i.color}>
                <div className="line__img"><ProductImage src={p.image.startsWith('placeholder:') ? `placeholder:${i.color}` : p.image} alt={p.name[lang]} /></div>
                <div>
                  <strong>{p.name[lang]}</strong><small>{i.size} · {t(`color.${i.color}`)}</small>
                  <div className="qty"><button onClick={() => setQty(i.productId, i.size, i.color, i.qty - 1)} aria-label="-">−</button><span>{i.qty}</span><button onClick={() => setQty(i.productId, i.size, i.color, i.qty + 1)} aria-label="+">+</button></div>
                </div>
                <div className="line__end"><span>{formatPrice(p.price * i.qty, lang)}</span><button onClick={() => removeFromCart(i.productId, i.size, i.color)} aria-label="Remove">×</button></div>
              </div>) })}
        </div>
        <div className="drawer__foot"><div className="total"><span>{t('total')}</span><strong>{formatPrice(subtotal, lang)}</strong></div>
          <Link className={`btn btn--solid ${cart.length === 0 ? 'is-disabled' : ''}`} to="/checkout" onClick={() => setCartOpen(false)}>{t('checkout')}</Link></div>
      </aside>
    </>
  )
}
