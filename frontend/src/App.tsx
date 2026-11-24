import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ShopProvider } from './context/ShopContext'
import { AuthProvider } from './context/AuthContext'
import { NotifyProvider } from './context/NotifyContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/layout/CartDrawer'
import BackButton from './components/common/BackButton'
import AppRoutes from './routes/AppRoutes'
import './assets/styles/App.css'

function ScrollTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }

function Shell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const isHome = pathname === '/'
  if (isAdmin) return <AppRoutes />            // admin pages have their own layout
  return <><Navbar /><main>{!isHome && <div className="container backbar"><BackButton fallback={pathname.startsWith('/product/') ? '/shop' : '/'} /></div>}<AppRoutes /></main><Footer /><CartDrawer /></>
}

export default function App() {
  return (
    <LanguageProvider><NotifyProvider><AuthProvider><ShopProvider><BrowserRouter>
      <ScrollTop /><Shell />
    </BrowserRouter></ShopProvider></AuthProvider></NotifyProvider></LanguageProvider>
  )
}
