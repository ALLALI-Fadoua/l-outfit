import { Link } from 'react-router-dom'
import ProductGrid from '../../components/shop/ProductGrid'
import { products } from '../../data/products'
import { useShop } from '../../context/ShopContext'
import { useLanguage } from '../../context/LanguageContext'
export default function Wishlist() {
  const { wishlist } = useShop()
  const { t } = useLanguage()
  const items = products.filter((p) => wishlist.includes(p.id))
  return (
    <div className="container page">
      <h1>{t('wish.title')}</h1>
      {items.length ? <ProductGrid items={items} /> : (
        <div className="empty"><p>{t('wish.empty')}</p><small>{t('wish.hint')}</small><Link to="/shop" className="btn btn--solid">{t('hero.cta1')}</Link></div>
      )}
    </div>
  )
}
