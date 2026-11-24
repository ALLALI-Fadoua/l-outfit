import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import logoLight from '../../assets/images/logo-light.png'
import { useLanguage } from '../../context/LanguageContext'
import { useShop } from '../../context/ShopContext'
import LangSwitch from '../ui/LangSwitch'
import { MegaPanel, MegaAccordion } from './MegaMenu'
import SearchOverlay from './SearchOverlay'

const Icon = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>

export default function Navbar() {
  const { t } = useLanguage()
  const { count, wishlist, setCartOpen } = useShop()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [accOpen, setAccOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const openMega = () => { window.clearTimeout(closeTimer.current); setMega(true) }
  const closeMega = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setMega(false), 140) }
  const closeAll = () => { setMega(false); setOpen(false); setAccOpen(false) }
  const { pathname } = useLocation()
  useEffect(() => { setMega(false) }, [pathname])
  const isHome = useLocation().pathname === '/'
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [['/', 'nav.home'], ['/shop?filter=new', 'nav.new'], ['/shop', 'nav.clothes'], ['/collections/burgundy-edit', 'nav.collections'], ['/shop?filter=trending', 'nav.trends'], ['/sale', 'nav.sale']]
  return (
    <>
      <div className="announce">{t('announce')}</div>
      <header className={`nav ${isHome ? 'nav--home' : ''} ${!isHome || scrolled || open || mega ? 'is-solid' : ''}`} onMouseLeave={closeMega} onKeyDown={(e) => { if (e.key === 'Escape') setMega(false) }}>
        <div className="container nav__row">
          <button className="nav__burger" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen(!open)}><Icon d="M4 7h16M4 12h16M4 17h16" /></button>
          <Link to="/" className="nav__logo" aria-label="L’Outfit"><img className="logo--dark" src={logo} alt="L’Outfit" /><img className="logo--light" src={logoLight} alt="" aria-hidden="true" /></Link>
          <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Principal">
            {links.map(([to, k]) => k === 'nav.clothes' ? (
              <div key={k} className="nav__item" onMouseEnter={openMega} onFocus={openMega}>
                <NavLink to={to} className="nav__clothes" aria-haspopup="true" aria-expanded={mega} onClick={closeAll}>{t(k)}</NavLink>
                <button className="nav__accbtn" aria-expanded={accOpen} onClick={() => setAccOpen(!accOpen)}>{t(k)}<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={accOpen ? 'is-up' : ''}><path d="m6 9 6 6 6-6" /></svg></button>
                {accOpen && <MegaAccordion onNavigate={closeAll} />}
              </div>
            ) : <NavLink key={k} to={to} end={to === '/'} onClick={closeAll} onMouseEnter={closeMega}>{t(k)}</NavLink>)}
            <LangSwitch className="lang--menu" />
          </nav>
          <div className="nav__actions">
            <LangSwitch className="lang--bar" />
            <button onClick={() => { setSearchOpen(true); closeAll() }} aria-label={t('search')}><Icon d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4" /></button>
            <Link to="/wishlist" className="nav__ico" aria-label={t('wishlist')}><Icon d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
            <button className="nav__ico" onClick={() => setCartOpen(true)} aria-label={t('cart')}><Icon d="M6 8h12l-1 12H7L6 8zm3 0V6a3 3 0 0 1 6 0v2" />{count > 0 && <b>{count}</b>}</button>
          </div>
        </div>
        {mega && <div onMouseEnter={openMega}><MegaPanel onNavigate={closeAll} /></div>}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
