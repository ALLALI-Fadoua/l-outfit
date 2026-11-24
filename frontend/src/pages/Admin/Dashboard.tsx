import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { allSizes } from '../../data/colors'
import { getOrders } from '../../services/orderService'
import DemoBar from '../../components/common/DemoBar'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice } from '../../utils/helpers'
import type { OrderStatus } from '../../types/product'

const STATUSES: OrderStatus[] = ['new', 'confirmed', 'shipped', 'delivered']

export default function Dashboard() {
  const { t, lang } = useLanguage()
  const [tick, setTick] = useState(0)
  const orders = useMemo(() => getOrders(), [tick])
  const revenue = orders.reduce((n, o) => n + o.total, 0)
  const lowStock = products
    .map((p) => ({ p, out: allSizes.filter((s) => p.sizes.includes(s) && p.stock[s] === false) }))
    .filter((x) => x.out.length > 0)
  const missing = lowStock.reduce((n, x) => n + x.out.length, 0)
  const stats: [string, string][] = [
    [t('admin.products'), String(products.length)], [t('admin.orders'), String(orders.length)],
    [t('admin.revenue'), formatPrice(revenue, lang)], [t('admin.lowstock'), String(missing)],
  ]
  const date = (iso: string) => new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : lang)
  return (
    <>
      <h1>{t('admin.dashboard')}</h1>
      <DemoBar onChange={() => setTick((n) => n + 1)} />
      <div className="stats">{stats.map(([k, v]) => <div className="stat" key={k}><small>{k}</small><strong>{v}</strong></div>)}</div>

      <h2 className="sub">{t('adm.byStatus')}</h2>
      <div className="statusrow">
        {STATUSES.map((s) => <div key={s} className={`statuscard statuscard--${s}`}><strong>{orders.filter((o) => o.status === s).length}</strong><span>{t(`st.${s}`)}</span></div>)}
      </div>

      <h2 className="sub">{t('admin.recent')}</h2>
      {orders.length === 0 ? <p className="muted">{t('admin.noOrders')}</p> : (
        <div className="tablewrap"><table>
          <thead><tr><th>#</th><th>{t('admin.customer')}</th><th>{t('admin.date')}</th><th>{t('admin.status')}</th><th>{t('total')}</th></tr></thead>
          <tbody>{orders.slice(0, 5).map((o) => (
            <tr key={o.id}>
              <td dir="ltr">{o.id}{o.demo && <small><span className="pill pill--info">{t('adm.demoTag')}</span></small>}</td>
              <td>{o.customer.firstName} {o.customer.lastName}</td><td>{date(o.date)}</td>
              <td><span className={`pill pill--s-${o.status}`}>{t(`st.${o.status}`)}</span></td><td>{formatPrice(o.total, lang)}</td>
            </tr>))}</tbody>
        </table></div>
      )}
      <p><Link className="link" to="/admin/orders">{t('admin.orders')}</Link></p>

      <h2 className="sub">{t('admin.lowstock')} — {t('adm.lowstockHint')}</h2>
      {lowStock.length === 0 ? <p className="muted">{t('adm.noLowStock')}</p> : (
        <div className="tablewrap"><table>
          <thead><tr><th>{t('admin.products')}</th><th>{t('admin.category')}</th><th>{t('admin.lowstock')}</th></tr></thead>
          <tbody>{lowStock.map(({ p, out }) => (
            <tr key={p.id}>
              <td><Link className="link" to={`/admin/products/${p.id}`}>{p.name[lang]}</Link></td><td>{t(`cat.${p.category}`)}</td>
              <td><div className="chipsrow">{out.map((s) => <span key={s} className="chip chip--off">{s}</span>)}</div></td>
            </tr>))}</tbody>
        </table></div>
      )}
    </>
  )
}
