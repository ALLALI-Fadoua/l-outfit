import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import LangSwitch from '../../components/ui/LangSwitch'
import BackButton from '../../components/common/BackButton'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../context/LanguageContext'

export default function AdminLayout() {
  const { t } = useLanguage()
  const { logout } = useAuth()
  return (
    <div className="admin">
      <aside className="admin__side">
        <img src={logo} alt="L’Outfit" />
        <nav aria-label="Admin">
          <NavLink to="/admin" end>{t('admin.dashboard')}</NavLink>
          <NavLink to="/admin/products">{t('admin.products')}</NavLink>
          <NavLink to="/admin/orders">{t('admin.orders')}</NavLink>
        </nav>
        <div className="admin__foot">
          <button onClick={logout}>{t('admin.logout')}</button>
        </div>
      </aside>
      <div className="admin__main">
        <div className="admin__top"><BackButton fallback="/admin" /><LangSwitch /></div>
        <Outlet />
      </div>
    </div>
  )
}
