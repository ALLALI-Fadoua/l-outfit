import { useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isBaseProduct, products } from '../../data/products'
import { menu } from '../../data/menu'
import { categories } from '../../data/categories'
import { allSizes, colorPalette, hexOf, styles } from '../../data/colors'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/NotifyContext'
import { compressImage, makeId, MAX_PHOTOS, saveCustomProduct, slugify } from '../../services/productService'
import type { Lang, Product } from '../../types/product'

interface CustomColor { key: string; hex: string; label: Record<Lang, string> }
type SizeState = Record<string, { offered: boolean; stock: boolean }>
const defaultSizes = (): SizeState => Object.fromEntries(allSizes.map((s) => [s, { offered: ['S', 'M', 'L', 'XL'].includes(s), stock: true }]))

interface FormState {
  nameFr: string; nameEn: string; nameAr: string; descFr: string; descEn: string; descAr: string
  category: string; sub: string; style: string; price: string; oldPrice: string
  sizes: SizeState; colors: string[]; customColors: CustomColor[]; images: string[]
  isNew: boolean; isBest: boolean; isTrending: boolean; extraTags: string
}

/** Built-in photos are build-time URLs: when an article keeps changed photos we store them as real image data. */
async function ensureDataUrls(srcs: string[]): Promise<string[]> {
  return Promise.all(srcs.map(async (s) => {
    if (s.startsWith('data:')) return s
    try { const b = await (await fetch(s)).blob(); return await compressImage(new File([b], 'photo.jpg', { type: b.type })) } catch { return s }
  }))
}

const subsOf = (category: string) => menu.flatMap((g) => g.items).filter((i) => i.category === category)

function fromProduct(p: Product): FormState {
  const sizes = Object.fromEntries(allSizes.map((s) => [s, { offered: p.sizes.includes(s), stock: p.stock[s] ?? true }])) as SizeState
  const auto = new Set([p.category, p.subcategory.toLowerCase(), p.style.toLowerCase(), ...p.colors.map((c) => c.key)])
  return {
    nameFr: p.name.fr, nameEn: p.name.en === p.name.fr ? '' : p.name.en, nameAr: p.name.ar === p.name.fr ? '' : p.name.ar,
    descFr: p.description?.fr ?? '', descEn: p.description && p.description.en !== p.description.fr ? p.description.en : '', descAr: p.description && p.description.ar !== p.description.fr ? p.description.ar : '',
    category: p.category, sub: p.subcategory, style: p.style, price: String(p.price), oldPrice: p.oldPrice ? String(p.oldPrice) : '',
    sizes, colors: p.colors.map((c) => c.key), images: p.images,
    customColors: p.colors.filter((c): c is CustomColor => !!c.label).map((c) => ({ key: c.key, hex: c.hex, label: c.label })),
    isNew: !!p.isNew, isBest: !!p.isBestSeller, isTrending: !!p.isTrending, extraTags: p.tags.filter((t) => !auto.has(t)).join(', '),
  }
}
const emptyForm = (): FormState => ({
  nameFr: '', nameEn: '', nameAr: '', descFr: '', descEn: '', descAr: '', category: 'robes', sub: subsOf('robes')[0]?.sub ?? '', style: 'Chic',
  price: '', oldPrice: '', sizes: defaultSizes(), colors: [], customColors: [], images: [], isNew: true, isBest: false, isTrending: false, extraTags: '',
})

export default function ProductForm() {
  const { id } = useParams()
  const editing = id ? products.find((p) => p.id === id) : undefined
  const { t, lang } = useLanguage()
  const nav = useNavigate()
  const toast = useToast()
  const fileInput = useRef<HTMLInputElement>(null)
  const [f, setF] = useState<FormState>(() => (editing ? fromProduct(editing) : emptyForm()))
  const [errors, setErrors] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [nc, setNc] = useState({ hex: '#b08968', fr: '', en: '', ar: '' })
  const [colorErr, setColorErr] = useState('')
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((p) => ({ ...p, [k]: v }))

  if (id && !editing) return <><h1>{t('pdp.notfound')}</h1></>

  const subs = subsOf(f.category)
  const price = Number(f.price), old = f.oldPrice ? Number(f.oldPrice) : 0
  const discount = old > price && price > 0 ? Math.round(((old - price) / old) * 100) : 0

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    const room = MAX_PHOTOS - f.images.length
    const added: string[] = []
    for (const file of Array.from(files).slice(0, Math.max(0, room))) {
      try { added.push(await compressImage(file)) } catch { /* not an image: ignored */ }
    }
    setF((p) => ({ ...p, images: [...p.images, ...added] }))
    setBusy(false)
  }
  const addCustomColor = () => {
    const fr = nc.fr.trim()
    if (!fr) { setColorErr(t('adm.err.colorName')); return }
    const key = `x-${slugify(fr) || 'couleur'}-${nc.hex.slice(1).toLowerCase()}`
    setColorErr('')
    setF((p) => ({
      ...p,
      customColors: p.customColors.some((c) => c.key === key) ? p.customColors : [...p.customColors, { key, hex: nc.hex, label: { fr, en: nc.en.trim() || fr, ar: nc.ar.trim() || fr } }],
      colors: p.colors.includes(key) ? p.colors : [...p.colors, key],
    }))
    setNc((x) => ({ ...x, fr: '', en: '', ar: '' }))
  }
  const removeCustomColor = (key: string) => setF((p) => ({ ...p, customColors: p.customColors.filter((c) => c.key !== key), colors: p.colors.filter((k) => k !== key) }))
  const move = (i: number, d: number) => setF((p) => {
    const j = i + d; if (j < 0 || j >= p.images.length) return p
    const imgs = [...p.images]; [imgs[i], imgs[j]] = [imgs[j], imgs[i]]; return { ...p, images: imgs }
  })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs: string[] = []
    if (!f.nameFr.trim()) errs.push(t('adm.err.name'))
    if (!(price > 0)) errs.push(t('adm.err.price'))
    if (f.oldPrice && !(old > price)) errs.push(t('adm.err.old'))
    const sizes = allSizes.filter((s) => f.sizes[s].offered)
    if (sizes.length === 0) errs.push(t('adm.err.sizes'))
    if (f.colors.length === 0) errs.push(t('adm.err.colors'))
    if (f.images.length === 0) errs.push(t('adm.err.photos'))
    setErrors(errs)
    if (errs.length) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }

    const fr = f.nameFr.trim()
    const extra = f.extraTags.split(',').map((x) => x.trim().toLowerCase()).filter(Boolean)
    const product: Product = {
      id: editing?.id ?? makeId(fr),
      name: { fr, en: f.nameEn.trim() || fr, ar: f.nameAr.trim() || fr },
      category: f.category, subcategory: f.sub, price, sizes,
      colors: f.colors.map((k) => { const cc = f.customColors.find((c) => c.key === k); return cc ? { key: cc.key, hex: cc.hex, label: cc.label } : { key: k, hex: hexOf(k) } }),
      style: f.style, image: f.images[0], images: f.images,
      tags: [f.category, f.sub.toLowerCase(), f.style.toLowerCase(), ...f.colors.map((k) => f.customColors.find((c) => c.key === k)?.label.fr.toLowerCase() ?? k), ...extra],
      stock: Object.fromEntries(sizes.map((s) => [s, f.sizes[s].stock])),
      isNew: f.isNew, isBestSeller: f.isBest, isTrending: f.isTrending,
      ...(old > price ? { oldPrice: old, discount } : {}),
      ...(f.descFr.trim() ? { description: { fr: f.descFr.trim(), en: f.descEn.trim() || f.descFr.trim(), ar: f.descAr.trim() || f.descFr.trim() } } : {}),
    }
    // built-in article with unchanged photos: keep its own photos (nothing to store); otherwise store the photos
    const unchanged = !!editing && JSON.stringify(f.images) === JSON.stringify(editing.images)
    const keepBase = !!editing && isBaseProduct(editing.id) && unchanged && (!!editing.keepBaseImages || !editing.edited)
    setBusy(true)
    try {
      if (keepBase) { product.keepBaseImages = true; product.images = []; product.image = '' }
      else if (editing && isBaseProduct(editing.id)) { product.images = await ensureDataUrls(product.images); product.image = product.images[0] }
      saveCustomProduct(product)
      toast({ type: 'success', title: t('adm.saved'), message: product.name[lang] })
      nav('/admin/products')
    } catch { setErrors([t('adm.err.storage')]); toast({ type: 'error', title: t('adm.err.storage') }) }
    finally { setBusy(false) }
  }

  const text = (k: keyof FormState, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="field"><label htmlFor={`f-${k}`}>{label}</label><input id={`f-${k}`} value={String(f[k])} onChange={(e) => set(k, e.target.value as never)} {...props} /></div>
  )

  return (
    <>
      <h1>{editing ? t('adm.edit') : t('adm.new')}</h1>
      <p className="muted photohint">{t('adm.proto')}</p>
      {errors.length > 0 && <div className="form-errors" role="alert"><ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul></div>}
      <form className="pform" onSubmit={submit} noValidate>
        <fieldset><legend>{t('adm.sec.info')}</legend>
          {text('nameFr', t('adm.nameFr'), { required: true })}
          <div className="grid2">{text('nameEn', t('adm.nameEn'), { dir: 'ltr' })}{text('nameAr', t('adm.nameAr'), { dir: 'rtl' })}</div>
          <small className="muted">{t('adm.nameHint')}</small>
          <div className="field"><label htmlFor="f-descFr">{t('adm.descFr')}</label><textarea id="f-descFr" rows={3} value={f.descFr} onChange={(e) => set('descFr', e.target.value)} /></div>
          <div className="grid2">
            <div className="field"><label htmlFor="f-descEn">{t('adm.descEn')}</label><textarea id="f-descEn" rows={3} dir="ltr" value={f.descEn} onChange={(e) => set('descEn', e.target.value)} /></div>
            <div className="field"><label htmlFor="f-descAr">{t('adm.descAr')}</label><textarea id="f-descAr" rows={3} dir="rtl" value={f.descAr} onChange={(e) => set('descAr', e.target.value)} /></div>
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.class')}</legend>
          <div className="grid3">
            <div className="field"><label htmlFor="f-cat">{t('admin.category')}</label>
              <select id="f-cat" value={f.category} onChange={(e) => setF((p) => ({ ...p, category: e.target.value, sub: subsOf(e.target.value)[0]?.sub ?? '' }))}>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{t(`cat.${c.slug}`)}</option>)}
              </select></div>
            <div className="field"><label htmlFor="f-sub">{t('adm.sub')}</label>
              <select id="f-sub" value={f.sub} onChange={(e) => set('sub', e.target.value)}>
                {subs.map((s) => <option key={s.sub} value={s.sub}>{s.label[lang]}</option>)}
              </select></div>
            <div className="field"><label htmlFor="f-style">{t('adm.style')}</label>
              <select id="f-style" value={f.style} onChange={(e) => set('style', e.target.value)}>{styles.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.price')}</legend>
          <div className="grid3">
            {text('price', t('adm.priceNow'), { type: 'number', min: 0, step: 100, inputMode: 'numeric', dir: 'ltr', required: true })}
            {text('oldPrice', t('adm.priceOld'), { type: 'number', min: 0, step: 100, inputMode: 'numeric', dir: 'ltr' })}
            <div className="field"><label>{t('adm.discount')}</label><div className="static">{discount ? `-${discount}%` : '—'}</div></div>
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.sizes')}</legend>
          <div className="sizegrid">
            {allSizes.map((s) => (
              <div key={s} className={`sizebox ${f.sizes[s].offered ? 'is-on' : ''}`}>
                <label className="check"><input type="checkbox" checked={f.sizes[s].offered} onChange={(e) => set('sizes', { ...f.sizes, [s]: { ...f.sizes[s], offered: e.target.checked } })} /><strong>{s}</strong></label>
                <label className="check small"><input type="checkbox" disabled={!f.sizes[s].offered} checked={f.sizes[s].stock} onChange={(e) => set('sizes', { ...f.sizes, [s]: { ...f.sizes[s], stock: e.target.checked } })} />{t('adm.inStockCk')}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.colors')}</legend>
          <div className="swatches">
            {colorPalette.map((c) => {
              const on = f.colors.includes(c.key)
              return (
                <label key={c.key} className={`swatch ${on ? 'is-on' : ''}`}>
                  <input type="checkbox" checked={on} onChange={() => set('colors', on ? f.colors.filter((k) => k !== c.key) : [...f.colors, c.key])} />
                  <i style={{ background: c.hex }} />{t(`color.${c.key}`)}
                </label>
              )
            })}
            {f.customColors.map((c) => {
              const on = f.colors.includes(c.key)
              return (
                <span key={c.key} className="swatchwrap">
                  <label className={`swatch ${on ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={on} onChange={() => set('colors', on ? f.colors.filter((k) => k !== c.key) : [...f.colors, c.key])} />
                    <i style={{ background: c.hex }} />{c.label[lang] || c.label.fr}
                  </label>
                  <button type="button" className="swatch__x" onClick={() => removeCustomColor(c.key)} aria-label={`${t('adm.removeColor')} : ${c.label.fr}`}>×</button>
                </span>
              )
            })}
          </div>
          <small className="muted">{t('adm.colorHint')}</small>
          <div className="newcolor">
            <strong>{t('adm.moreColors')}</strong>
            <div className="newcolor__row">
              <div className="field newcolor__pick"><label htmlFor="nc-hex">{t('adm.pickColor')}</label><input id="nc-hex" type="color" value={nc.hex} onChange={(e) => setNc({ ...nc, hex: e.target.value })} /></div>
              <div className="field"><label htmlFor="nc-fr">{t('adm.colorNameFr')}</label><input id="nc-fr" value={nc.fr} onChange={(e) => { setNc({ ...nc, fr: e.target.value }); setColorErr('') }} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomColor() } }} /></div>
              <div className="field"><label htmlFor="nc-en">{t('adm.colorNameEn')}</label><input id="nc-en" dir="ltr" value={nc.en} onChange={(e) => setNc({ ...nc, en: e.target.value })} /></div>
              <div className="field"><label htmlFor="nc-ar">{t('adm.colorNameAr')}</label><input id="nc-ar" dir="rtl" value={nc.ar} onChange={(e) => setNc({ ...nc, ar: e.target.value })} /></div>
              <button type="button" className="btn" onClick={addCustomColor}>{t('adm.addColor')}</button>
            </div>
            {colorErr && <p className="err" role="alert">{colorErr}</p>}
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.photos')} ({f.images.length}/{MAX_PHOTOS})</legend>
          <p className="muted photohint">{t('adm.photosHint')}</p>
          <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => { void addPhotos(e.target.files); e.target.value = '' }} />
          <div className="photos">
            {f.images.map((src, i) => (
              <div className="photo" key={i}>
                <img src={src} alt={`${f.nameFr || t('adm.sec.photos')} ${i + 1}`} />
                {i === 0 && <span className="photo__main">{t('adm.main')}</span>}
                <div className="photo__bar">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={t('adm.earlier')}>{lang === 'ar' ? '→' : '←'}</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === f.images.length - 1} aria-label={t('adm.later')}>{lang === 'ar' ? '←' : '→'}</button>
                  <button type="button" onClick={() => set('images', f.images.filter((_, j) => j !== i))} aria-label={t('adm.removePhoto')}>×</button>
                </div>
              </div>
            ))}
            {f.images.length < MAX_PHOTOS && (
              <button type="button" className="photo photo--add" onClick={() => fileInput.current?.click()} disabled={busy}>
                <span>＋</span>{busy ? t('adm.processing') : t('adm.addPhotos')}
              </button>
            )}
          </div>
        </fieldset>

        <fieldset><legend>{t('adm.sec.flags')}</legend>
          <div className="flags">
            <label className="check"><input type="checkbox" checked={f.isNew} onChange={(e) => set('isNew', e.target.checked)} />{t('adm.isNew')}</label>
            <label className="check"><input type="checkbox" checked={f.isBest} onChange={(e) => set('isBest', e.target.checked)} />{t('adm.isBest')}</label>
            <label className="check"><input type="checkbox" checked={f.isTrending} onChange={(e) => set('isTrending', e.target.checked)} />{t('adm.isTrending')}</label>
          </div>
          {text('extraTags', t('adm.tags'))}
        </fieldset>

        <div className="pform__actions">
          <button type="submit" className="btn btn--solid" disabled={busy}>{t('adm.save')}</button>
          <button type="button" className="btn" onClick={() => nav('/admin/products')}>{t('adm.cancel')}</button>
        </div>
      </form>
    </>
  )
}
