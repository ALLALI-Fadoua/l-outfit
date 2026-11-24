import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products, productsVersion } from '../../data/products'
import ProductImage from '../../components/ui/ProductImage'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice } from '../../utils/helpers'
import { deleteProduct, deletedCount, restoreDeleted } from '../../services/productService'
import { allSizes } from '../../data/colors'
import { isBaseProduct } from '../../data/products'
import { useConfirm, useToast } from '../../context/NotifyContext'

const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
const EyeIcon = () => <Svg><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>
const PencilIcon = () => <Svg><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></Svg>
const TrashIcon = () => <Svg><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" /></Svg>

export default function ManageProducts() {
  const { t, lang } = useLanguage()
  const confirm = useConfirm()
  const toast = useToast()
  const [q, setQ] = useState('')
  const [, bump] = useState(0)
  const [openSizes, setOpenSizes] = useState<string[]>([])   // articles whose missing sizes are shown
  const toggleSizes = (id: string) => setOpenSizes((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))
  const version = productsVersion()
  const list = useMemo(() => products.filter((p) => (p.name.fr + p.name.en + p.name.ar + p.category).toLowerCase().includes(q.toLowerCase())), [q, version])
  const removed = deletedCount()
  const remove = async (id: string, name: string) => {
    const ok = await confirm({ title: t('adm.deleteConfirm'), message: `${name} — ${t(isBaseProduct(id) ? 'adm.deleteTextBase' : 'adm.deleteText')}`, confirmLabel: t('adm.delete'), cancelLabel: t('adm.cancel'), danger: true })
    if (!ok) return
    deleteProduct(id); bump((n) => n + 1); toast({ type: 'success', title: t('adm.deleted'), message: name })
  }
  return (
    <>
      <div className="admin__headrow"><h1>{t('admin.products')}</h1><Link to="/admin/products/new" className="btn btn--solid">＋ {t('adm.add')}</Link></div>
      <label className="sr" htmlFor="pq">{t('admin.search')}</label>
      <input id="pq" className="asearch" placeholder={t('admin.search')} value={q} onChange={(e) => setQ(e.target.value)} />
      {removed > 0 && <p className="restorebar">{removed} {t('adm.deletedCount')} · <button className="link" onClick={() => { restoreDeleted(); bump((n) => n + 1); toast({ type: 'success', title: t('adm.restored') }) }}>{t('adm.restore')}</button></p>}
      <div className="tablewrap"><table>
        <thead><tr><th /><th>{t('admin.products')}</th><th>{t('admin.category')}</th><th>{t('admin.price')}</th><th>{t('admin.stock')}</th><th>{t('admin.photo')}</th><th>{t('adm.actions')}</th></tr></thead>
        <tbody>{list.map((p) => {
          const missingSizes = allSizes.filter((sz) => p.sizes.includes(sz) && p.stock[sz] === false)
          const miss = Object.values(p.stock).filter((v) => !v).length
          const shown = openSizes.includes(p.id)
          const photos = p.images.filter((i) => !i.startsWith('placeholder:')).length
          return (
            <tr key={p.id}>
              <td><div className="thumb"><ProductImage src={p.image} alt="" category={p.category} /></div></td>
              <td>{p.name[lang]}{p.custom && <small><span className="pill pill--info">{t('adm.custom')}</span></small>}{p.edited && <small><span className="pill pill--info">{t('adm.edited')}</span></small>}</td>
              <td>{t(`cat.${p.category}`)}</td><td>{formatPrice(p.price, lang)}</td>
              <td>{miss
                ? <>
                    <button type="button" className="pill pill--warn pill--btn" aria-expanded={shown} onClick={() => toggleSizes(p.id)}>{`${t('admin.partial')} (${miss})`}<span className={`pill__caret ${shown ? 'is-up' : ''}`} aria-hidden="true" /></button>
                    {shown && <div className="missing" aria-label={t('admin.lowstock')}><small>{t('admin.lowstock')} :</small><div className="chipsrow">{missingSizes.map((sz) => <span key={sz} className="chip chip--off">{sz}</span>)}</div></div>}
                  </>
                : <span className="pill">{t('admin.inStock')}</span>}</td>
              <td><span className={`pill ${photos ? '' : 'pill--warn'}`}>{photos} {t('adm.photosCount')}</span></td>
              <td><div className="rowactions">
                <Link className="iconbtn" to={`/admin/products/${p.id}`} title={t('adm.details')} aria-label={`${t('adm.details')} : ${p.name[lang]}`}><EyeIcon /></Link>
                <Link className="iconbtn" to={`/admin/products/${p.id}/edit`} title={t('adm.editShort')} aria-label={`${t('adm.editShort')} : ${p.name[lang]}`}><PencilIcon /></Link>
                <button className="iconbtn iconbtn--danger" onClick={() => void remove(p.id, p.name[lang])} title={t('adm.delete')} aria-label={`${t('adm.delete')} : ${p.name[lang]}`}><TrashIcon /></button>
              </div></td>
            </tr>
          )
        })}</tbody>
      </table></div>
    </>
  )
}
