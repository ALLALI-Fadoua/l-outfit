import { useState } from 'react'
import { getOrders, updateOrderStatus } from '../../services/orderService'
import { wilayas } from '../../data/wilayas'
import DemoBar from '../../components/common/DemoBar'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice } from '../../utils/helpers'
import { useToast } from '../../context/NotifyContext'
import type { OrderStatus } from '../../types/product'

const STATUSES: OrderStatus[] = ['new', 'confirmed', 'shipped', 'delivered']

export default function ManageOrders() {
  const { t, lang } = useLanguage()
  const toast = useToast()
  const [orders, setOrders] = useState(getOrders())
  const change = (id: string, s: OrderStatus) => { updateOrderStatus(id, s); setOrders(getOrders()); toast({ type: 'success', title: t('adm.statusUpdated'), message: `${id} → ${t(`st.${s}`)}` }) }
  return (
    <>
      <h1>{t('admin.orders')}</h1>
      <DemoBar onChange={() => setOrders(getOrders())} />
      {orders.length === 0 ? <p className="muted">{t('admin.noOrders')}</p> : (
        <div className="tablewrap"><table>
          <thead><tr><th>#</th><th>{t('admin.customer')}</th><th>{t('co.phone')}</th><th>{t('co.wilaya')}</th><th>{t('admin.items')}</th><th>{t('total')}</th><th>{t('admin.date')}</th><th>{t('admin.status')}</th></tr></thead>
          <tbody>{orders.map((o) => { const w = wilayas.find((x) => x.code === o.customer.wilaya)
            return <tr key={o.id}>
              <td dir="ltr">{o.id}{o.demo && <small><span className="pill pill--info">{t('adm.demoTag')}</span></small>}</td>
              <td>{o.customer.firstName} {o.customer.lastName}<small>{o.customer.address}, {o.customer.commune}</small>{o.customer.note && <small className="ordernote">“{o.customer.note}”</small>}</td>
              <td dir="ltr">{o.customer.phone}</td><td>{w ? (lang === 'ar' ? w.ar : w.fr) : ''}</td>
              <td>{o.items.reduce((n, i) => n + i.qty, 0)}</td><td>{formatPrice(o.total, lang)}</td><td>{new Date(o.date).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : lang)}</td>
              <td><select className={`statusselect statusselect--${o.status}`} aria-label={t('admin.status')} value={o.status} onChange={(e) => change(o.id, e.target.value as OrderStatus)}>{STATUSES.map((s) => <option key={s} value={s}>{t(`st.${s}`)}</option>)}</select></td></tr> })}</tbody>
        </table></div>
      )}
    </>
  )
}
