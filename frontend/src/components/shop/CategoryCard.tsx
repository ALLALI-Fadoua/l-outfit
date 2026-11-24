import { Link } from 'react-router-dom'
import type { Category } from '../../types/product'
import { useLanguage } from '../../context/LanguageContext'
import ProductImage from '../ui/ProductImage'
import { categoryImages } from '../../assets/images/categories'

export default function CategoryCard({ category }: { category: Category }) {
  const { t } = useLanguage()
  const img = categoryImages[category.slug]
  const label = t(`cat.${category.slug}`)
  return (
    <Link to={`/shop?category=${category.slug}`} className="ccard">
      <div className={`ccard__img ${img?.pack ? 'ccard__img--pack' : ''}`}>
        {img ? <img src={img.src} alt={label} loading="lazy" /> : <ProductImage src="placeholder:x" alt="" category={category.slug} />}
      </div>
      <span>{label}</span>
    </Link>
  )
}
