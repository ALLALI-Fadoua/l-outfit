import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../../data/products'
import { menu } from '../../data/menu'
import ProductImage from '../../components/ui/ProductImage'
import { useLanguage } from '../../context/LanguageContext'
import { allSizes } from '../../data/colors'
import { formatPrice } from '../../utils/helpers'
import { deleteProduct } from '../../services/productService'
import { isBaseProduct } from '../../data/products'
import { useConfirm, useToast } from '../../context/NotifyContext'
import type { Lang } from '../../types/product'

const LANGS: Lang[] = ['fr', 'en', 'ar']

export default function ProductDetail() {
  const { id } = useParams()
  const p = products.find((x) => x.id === id)
  const { t, lang } = useLanguage()
  const nav = useNavigate()
  const confirm = useConfirm()
  const toast = useToast()
  if (!p) return <><h1>{t('pdp.notfound')}</h1><Link className="link" to="/admin/products">{t('pdp.back')}</Link></>

  const sub = menu.flatMap((g) => g.items).find((i) => i.sub === p.subcategory)?.label[lang] ?? p.subcategory
  const photos = p.images.filter((i) => !i.startsWith('placeholder:'))
  const origin = p.custom ? t('adm.custom') : p.edited ? t('adm.edited') : t('adm.catalog')
  const flags = [p.isNew && t('adm.isNew'), p.isBestSeller && t('adm.isBest'), p.isTrending && t('adm.isTrending')].filter(Boolean) as string[]
  const remove = async () => {
    const ok = await confirm({ title: t('adm.deleteConfirm'), message: `${p.name[lang]} — ${t(isBaseProduct(p.id) ? 'adm.deleteTextBase' : 'adm.deleteText')}`, confirmLabel: t('adm.delete'), cancelLabel: t('adm.cancel'), danger: true })
    if (!ok) return
    deleteProduct(p.id); toast({ type: 'success', title: t('adm.deleted'), message: p.name[lang] }); nav('/admin/products', { replace: true })
  }
  const row = (label: string, value: React.ReactNode) => <div className="drow"><dt>{label}</dt><dd>{value}</dd></div>

  return (
    <>
      <div className="admin__headrow">
        <h1>{p.name[lang]}</h1>
        <div className="rowactions">
          <Link className="btn btn--solid" to={`/admin/products/${p.id}/edit`}>{t('adm.editShort')}</Link>
          <Link className="btn" to={`/product/${p.id}`}>{t('adm.viewSite')}</Link>
          <button className="btn btn--danger" onClick={() => void remove()}>{t('adm.delete')}</button>
        </div>
      </div>

      <section className="dsection">
        <h2>{t('adm.d.photos')} ({photos.length})</h2>
        <div className="photos photos--view">
          {(photos.length ? photos : p.images).map((src, i) => (
            <div className="photo" key={i}><ProductImage src={src} alt={`${p.name[lang]} ${i + 1}`} category={p.category} />{i === 0 && <span className="photo__main">{t('adm.main')}</span>}</div>
          ))}
        </div>
      </section>

      <section className="dsection">
        <dl className="dlist">
          {row(t('adm.d.id'), <code dir="ltr">{p.id}</code>)}
          {row(t('adm.d.source'), origin)}
          {row(t('adm.d.names'), <ul className="plain">{LANGS.map((l) => <li key={l}><span className="muted">{t(`adm.d.${l}`)} :</span> <span dir={l === 'ar' ? 'rtl' : 'ltr'}>{p.name[l]}</span></li>)}</ul>)}
          {row(t('adm.d.desc'), p.description ? <ul className="plain">{LANGS.map((l) => <li key={l}><span className="muted">{t(`adm.d.${l}`)} :</span> <span dir={l === 'ar' ? 'rtl' : 'ltr'}>{p.description?.[l]}</span></li>)}</ul> : t('adm.d.none'))}
          {row(t('admin.category'), `${t(`cat.${p.category}`)} › ${sub}`)}
          {row(t('adm.style'), p.style)}
          {row(t('adm.d.price'), <><strong>{formatPrice(p.price, lang)}</strong>{p.oldPrice && <> <s className="muted">{formatPrice(p.oldPrice, lang)}</s> <span className="pill pill--warn">-{p.discount}%</span></>}</>)}
          {row(t('adm.sec.sizes'), <div className="chipsrow">{allSizes.filter((s) => p.sizes.includes(s)).map((s) => <span key={s} className={`chip ${p.stock[s] ? '' : 'chip--off'}`}>{s}{!p.stock[s] && <small> · {t('adm.d.out')}</small>}</span>)}</div>)}
          {row(t('adm.sec.colors').replace(' *', ''), <div className="chipsrow">{p.colors.map((c) => <span key={c.key} className="chip"><i className="chip__dot" style={{ background: c.hex }} />{t(`color.${c.key}`)}</span>)}</div>)}
          {row(t('adm.d.flags'), flags.length ? <div className="chipsrow">{flags.map((f) => <span key={f} className="chip">{f}</span>)}</div> : t('adm.d.none'))}
          {row(t('adm.d.tags'), <div className="chipsrow">{p.tags.map((x) => <span key={x} className="chip chip--tag">{x}</span>)}</div>)}
        </dl>
      </section>
    </>
  )
}
