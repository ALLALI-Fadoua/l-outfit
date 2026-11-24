import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../../components/shop/ProductGrid'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { menu } from '../../data/menu'
import { useLanguage } from '../../context/LanguageContext'

export default function Shop({ saleOnly = false }: { saleOnly?: boolean }) {
  const { t, lang } = useLanguage()
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState('new')
  const category = params.get('category')
  const filter = params.get('filter')
  const sub = params.get('sub')
  const subLabel = sub ? menu.flatMap((g) => g.items).find((i) => i.sub === sub)?.label[lang] : undefined
  const items = useMemo(() => {
    let l = products.filter((p) => (!saleOnly || p.oldPrice) && (!category || p.category === category) && (!sub || p.subcategory === sub)
      && (filter !== 'new' || p.isNew) && (filter !== 'trending' || p.isTrending))
    if (sort === 'asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'desc') l = [...l].sort((a, b) => b.price - a.price)
    return l
  }, [saleOnly, category, filter, sub, sort])
  return (
    <div className="container page">
      <h1>{saleOnly ? t('sale.title') : t('nav.clothes')}</h1>
      <div className="toolbar">
        <div className="chips">
          <button className={!category ? 'is-on' : ''} onClick={() => setParams({})}>{t('all')}</button>
          {categories.map((c) => <button key={c.slug} className={category === c.slug ? 'is-on' : ''} onClick={() => setParams({ category: c.slug })}>{t(`cat.${c.slug}`)}</button>)}
        </div>
        <label className="sr" htmlFor="sort">{t('sort.label')}</label>
        <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">{t('sort.new')}</option><option value="asc">{t('sort.asc')}</option><option value="desc">{t('sort.desc')}</option>
        </select>
      </div>
      {subLabel && <div className="chips active"><button className="is-on" onClick={() => setParams(category ? { category } : {})} aria-label="×">{subLabel} ×</button></div>}
      {items.length ? <ProductGrid items={items} /> : <p className="muted">{t('shop.empty')}</p>}
    </div>
  )
}
