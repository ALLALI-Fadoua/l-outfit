import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductImage from '../../components/ui/ProductImage'
import ProductGrid from '../../components/shop/ProductGrid'
import { similarProducts } from '../../utils/recommendations'
import { useLanguage } from '../../context/LanguageContext'
import { useShop } from '../../context/ShopContext'
import { useToast } from '../../context/NotifyContext'
import { formatPrice } from '../../utils/helpers'

export default function ProductDetails() {
  const { id } = useParams()
  const p = products.find((x) => x.id === id)
  const { lang, t } = useLanguage()
  const { addToCart, toggleWish, wishlist } = useShop()
  const [size, setSize] = useState('')
  const [color, setColor] = useState(p?.colors[0].key ?? '')
  const [qty, setQty] = useState(1)
  const [notice, setNotice] = useState(false)
  const toast = useToast()
  if (!p) return <div className="container page empty"><h1>{t('pdp.notfound')}</h1><Link to="/shop" className="btn btn--solid">{t('pdp.back')}</Link></div>
  const outOfStock = size !== '' && !p.stock[size]
  return (
    <div className="container page">
      <div className="pdp">
        <div className="pdp__gallery">{p.images.map((im, i) => <div key={i}><ProductImage src={im} alt={p.name[lang]} category={p.category} /></div>)}</div>
        <div className="pdp__info">
          <h1>{p.name[lang]}</h1>
          <div className="pcard__price"><strong>{formatPrice(p.price, lang)}</strong>{p.oldPrice && <s>{formatPrice(p.oldPrice, lang)}</s>}</div>
          {p.description && <p className="pdp__desc">{p.description[lang]}</p>}
          <p className="label">{t('pdp.color')}</p>
          <div className="dots dots--lg">{p.colors.map((c) => <button key={c.key} aria-label={t(`color.${c.key}`)} title={t(`color.${c.key}`)} aria-pressed={color === c.key} className={color === c.key ? 'is-on' : ''} style={{ background: c.hex }} onClick={() => setColor(c.key)} />)}</div>
          <p className="label">{t('pdp.size')}</p>
          <div className="sizes">{p.sizes.map((s) => <button key={s} className={`${size === s ? 'is-on' : ''} ${!p.stock[s] ? 'is-off' : ''}`} onClick={() => { setSize(s); setNotice(false) }}>{s}</button>)}</div>
          {outOfStock && <div className="alert"><p>{t('pdp.unavailable')}</p>{notice ? <strong>{t('pdp.notified')}</strong> : <button className="btn" onClick={() => { setNotice(true); toast({ type: 'success', title: t('pdp.notified') }) }}>{t('pdp.notify')}</button>}</div>}
          <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="-">−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="+">+</button></div>
          <button className="btn btn--solid" disabled={!size || outOfStock} onClick={() => addToCart({ productId: p.id, size, color, qty })}>{size ? t('add') : t('pdp.chooseSize')}</button>
          <button className="btn" onClick={() => toggleWish(p.id)}>{wishlist.includes(p.id) ? '♥' : '♡'} {t('wishlist')}</button>
        </div>
      </div>
      <h2 className="sub">{t('pdp.similar')}</h2>
      <ProductGrid items={similarProducts(p, products)} />
    </div>
  )
}
