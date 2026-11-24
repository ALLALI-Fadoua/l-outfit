import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useSearch, similarToImage } from '../../hooks/useSearch'
import { products } from '../../data/products'
import ProductGrid from '../shop/ProductGrid'
import type { Lang, Product } from '../../types/product'

const SUGGEST: Record<Lang, { title: string; items: string[] }[]> = {
  fr: [{ title: 'Robes', items: ['Robe de soirée', 'Robe à nœud', 'Robe en maille'] }, { title: 'Manteaux', items: ['Manteau fausse fourrure', 'Trench ceinturé', 'Manteau oversize'] }],
  en: [{ title: 'Dresses', items: ['Evening gown', 'Bow dress', 'Knit dress'] }, { title: 'Coats', items: ['Faux fur coat', 'Belted trench', 'Oversized coat'] }],
  ar: [{ title: 'فساتين', items: ['فستان سهرة', 'فستان بعقدة', 'فستان تريكو'] }, { title: 'معاطف', items: ['معطف فرو', 'ترنش بحزام', 'معطف واسع'] }],
}
const TRENDING: Record<Lang, string[]> = {
  fr: ['Bordeaux', 'Ensembles', 'Abayas'], en: ['Burgundy', 'Sets', 'Abayas'], ar: ['بوردو', 'أطقم', 'عبايات'],
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useLanguage()
  const [q, setQ] = useState('')
  const [img, setImg] = useState<{ url: string; items: Product[] } | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const file = useRef<HTMLInputElement>(null)
  const results = useSearch(q)
  const recommended = products.filter((p) => p.isTrending || p.isBestSeller).slice(0, 4)

  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  useEffect(() => () => { if (img) URL.revokeObjectURL(img.url) }, [img])

  const pickImage = (f?: File) => {
    if (!f) return
    setQ('')
    setImg({ url: URL.createObjectURL(f), items: similarToImage(f) })
  }
  const hasQuery = q.trim().length > 0

  return (
    <div className={`search ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={t('search')} aria-hidden={!open}
      onClick={(e) => { if ((e.target as HTMLElement).closest('a')) onClose() }}>
      <div className="container search__inner">
        <div className="search__bar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4" /></svg>
          <input ref={input} type="search" value={q} onChange={(e) => { setQ(e.target.value); setImg(null) }} placeholder={t('search.ph')} aria-label={t('search')} />
          <button className="search__close" onClick={onClose} aria-label={t('search.close')}>×</button>
        </div>
        <div className="search__tools">
          <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { pickImage(e.target.files?.[0]); e.target.value = '' }} />
          <button className="btn" onClick={() => file.current?.click()}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ verticalAlign: '-3px', marginInlineEnd: 8 }}><path d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></svg>
            {t('search.visual')}
          </button>
        </div>

        {img ? (
          <section className="search__block">
            <div className="search__img"><img src={img.url} alt={t('search.yourImage')} /><div><h2>{t('search.similar')}</h2><small className="muted">{t('search.demo')}</small></div></div>
            <ProductGrid items={img.items} />
          </section>
        ) : !hasQuery ? (
          <section className="search__block search__suggest">
            {SUGGEST[lang].map((g) => (
              <div key={g.title}><h3>{g.title}</h3>{g.items.map((s) => <button key={s} onClick={() => setQ(s)}>{s}</button>)}</div>
            ))}
            <div><h3>{t('search.trending')}</h3>{TRENDING[lang].map((s) => <button key={s} onClick={() => setQ(s)}>{s}</button>)}</div>
          </section>
        ) : results.length > 0 ? (
          <section className="search__block"><ProductGrid items={results} /></section>
        ) : (
          <section className="search__block">
            <p className="search__none">{t('shop.empty')}</p>
            <h2>{t('search.maybe')}</h2>
            <ProductGrid items={recommended} />
            <p><Link className="link" to="/shop">{t('nav.seeAll')} {lang === 'ar' ? '←' : '→'}</Link></p>
          </section>
        )}
      </div>
    </div>
  )
}
