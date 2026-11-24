import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useShop } from '../../context/ShopContext'
import { useToast } from '../../context/NotifyContext'
import { products } from '../../data/products'
import { wilayas } from '../../data/wilayas'
import { formatPrice } from '../../utils/helpers'
import { isValidDzPhone } from '../../utils/validators'
import { nextOrderId, saveOrder } from '../../services/orderService'
import type { Customer, Order } from '../../types/product'

const FREE_FROM = 15000
const FEE = 700
const empty: Customer = { lastName: '', firstName: '', phone: '', wilaya: 0, commune: '', address: '', note: '' }

export default function Checkout() {
  const { t, lang } = useLanguage()
  const { cart, subtotal, clearCart } = useShop()
  const toast = useToast()
  const [c, setC] = useState<Customer>(empty)
  const [phoneErr, setPhoneErr] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const delivery = useMemo(() => (subtotal >= FREE_FROM || subtotal === 0 ? 0 : FEE), [subtotal])
  const set = (k: keyof Customer, v: string | number) => setC((p) => ({ ...p, [k]: v }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidDzPhone(c.phone)) { setPhoneErr(true); return }
    const order: Order = { id: nextOrderId(), items: cart, subtotal, delivery, total: subtotal + delivery, date: new Date().toISOString(), status: 'new', customer: c }
    saveOrder(order); clearCart(); setDone(order.id); toast({ type: 'success', title: t('co.toast'), message: order.id })
  }

  if (done) return (
    <div className="container page empty">
      <h1>{t('co.thanks')}</h1><p>{t('co.saved')}</p>
      <p>{t('co.orderNo')} : <strong dir="ltr">{done}</strong></p>
      <Link to="/shop" className="btn btn--solid">{t('hero.cta1')}</Link>
    </div>
  )
  if (cart.length === 0) return (
    <div className="container page empty"><h1>{t('co.title')}</h1><p>{t('cart.empty')}</p><Link to="/shop" className="btn btn--solid">{t('hero.cta1')}</Link></div>
  )
  const field = (id: keyof Customer, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="field"><label htmlFor={id}>{label}</label><input id={id} value={String(c[id])} onChange={(e) => set(id, e.target.value)} required {...props} /></div>
  )
  return (
    <div className="container page">
      <h1>{t('co.title')}</h1>
      <form className="checkout" onSubmit={submit} noValidate={false}>
        <section>
          <h2>{t('co.info')}</h2>
          <div className="grid2">{field('lastName', t('co.lastname'), { autoComplete: 'family-name' })}{field('firstName', t('co.firstname'), { autoComplete: 'given-name' })}</div>
          <div className="field">
            <label htmlFor="phone">{t('co.phone')}</label>
            <input id="phone" type="tel" inputMode="tel" dir="ltr" value={c.phone} onChange={(e) => { set('phone', e.target.value); setPhoneErr(false) }} required aria-invalid={phoneErr} aria-describedby={phoneErr ? 'phone-err' : undefined} />
            {phoneErr && <small id="phone-err" className="err">{t('co.phoneErr')}</small>}
          </div>
          <div className="grid2">
            <div className="field"><label htmlFor="wilaya">{t('co.wilaya')}</label>
              <select id="wilaya" value={c.wilaya} onChange={(e) => set('wilaya', Number(e.target.value))} required>
                <option value={0} disabled>{t('co.wilayaPick')}</option>
                {wilayas.map((w) => <option key={w.code} value={w.code}>{String(w.code).padStart(2, '0')} — {lang === 'ar' ? w.ar : w.fr}</option>)}
              </select></div>
            {field('commune', t('co.commune'))}
          </div>
          {field('address', t('co.address'), { autoComplete: 'street-address' })}
          <div className="field"><label htmlFor="note">{t('co.note')}</label><textarea id="note" rows={3} value={c.note} onChange={(e) => set('note', e.target.value)} /></div>
        </section>
        <aside className="summary">
          <h2>{t('co.summary')}</h2>
          {cart.map((i) => { const p = products.find((x) => x.id === i.productId); if (!p) return null
            return <div className="srow" key={i.productId + i.size + i.color}><span>{p.name[lang]} <small>({i.size} · {t(`color.${i.color}`)}) × {i.qty}</small></span><span>{formatPrice(p.price * i.qty, lang)}</span></div> })}
          <div className="srow"><span>{t('co.subtotal')}</span><span>{formatPrice(subtotal, lang)}</span></div>
          <div className="srow"><span>{t('co.mode')}<small>{t('co.home')}</small></span><span /></div>
          <div className="srow"><span>{t('co.fee')}</span><span>{delivery === 0 ? t('co.free') : formatPrice(delivery, lang)}</span></div>
          <div className="srow total"><strong>{t('total')}</strong><strong>{formatPrice(subtotal + delivery, lang)}</strong></div>
          <button className="btn btn--solid" type="submit" disabled={c.wilaya === 0}>{t('co.confirm')}</button>
        </aside>
      </form>
    </div>
  )
}
