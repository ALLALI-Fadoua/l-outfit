import { Link } from 'react-router-dom'
import { getVisibleMenu } from '../../data/menu'
import { useLanguage } from '../../context/LanguageContext'

/** Desktop: large panel under the header. */
export function MegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const { lang, t } = useLanguage()
  const menu = getVisibleMenu()
  return (
    <div className="mega" role="region" aria-label={t('nav.clothes')}>
      <div className="container mega__grid">
        {menu.map((g) => (
          <div key={g.key} className="mega__col">
            <h3>{g.label[lang]}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it.sub}><Link to={`/shop?category=${it.category}&sub=${encodeURIComponent(it.sub)}`} onClick={onNavigate}>{it.label[lang]}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mega__foot"><Link className="link" to="/shop" onClick={onNavigate}>{t('nav.seeAll')} {lang === 'ar' ? '←' : '→'}</Link></div>
    </div>
  )
}

/** Mobile / tablet: accordion (group → links). */
import { useState } from 'react'
export function MegaAccordion({ onNavigate }: { onNavigate: () => void }) {
  const { lang, t } = useLanguage()
  const menu = getVisibleMenu()
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="macc">
      {menu.map((g) => (
        <div key={g.key} className="macc__group">
          <button aria-expanded={open === g.key} onClick={() => setOpen(open === g.key ? null : g.key)}>
            {g.label[lang]}<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={open === g.key ? 'is-up' : ''}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {open === g.key && (
            <ul>
              {g.items.map((it) => <li key={it.sub}><Link to={`/shop?category=${it.category}&sub=${encodeURIComponent(it.sub)}`} onClick={onNavigate}>{it.label[lang]}</Link></li>)}
            </ul>
          )}
        </div>
      ))}
      <Link className="link macc__all" to="/shop" onClick={onNavigate}>{t('nav.seeAll')} {lang === 'ar' ? '←' : '→'}</Link>
    </div>
  )
}
