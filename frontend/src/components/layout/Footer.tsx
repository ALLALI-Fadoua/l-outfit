import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import logoLight from '../../assets/images/logo-light.png'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/NotifyContext'

export default function Footer() {
  const { t } = useLanguage()
  const [done, setDone] = useState(false)
  const toast = useToast()
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); toast({ type: 'success', title: t('news.ok') }) }
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div><img src={logoLight} alt="L’Outfit" className="footer__logo" /><p>{t('foot.tag')}</p></div>
        <div><h3>{t('foot.shop')}</h3><Link to="/shop?filter=new">{t('nav.new')}</Link><Link to="/shop">{t('nav.clothes')}</Link><Link to="/collections/burgundy-edit">{t('nav.collections')}</Link><Link to="/sale">{t('nav.sale')}</Link><Link to="/wishlist">{t('foot.fav')}</Link></div>
        <div><h3>{t('foot.help')}</h3><Link to="/">{t('foot.contact')}</Link><Link to="/">{t('foot.delivery')}</Link><Link to="/">{t('foot.returns')}</Link><Link to="/">{t('foot.faq')}</Link></div>
        <form onSubmit={submit} className="footer__news">
          <h3>{t('news.title')}</h3><p>{t('news.text')}</p>
          {done ? <p className="ok">{t('news.ok')}</p> : <div><label className="sr" htmlFor="nl">{t('news.ph')}</label><input id="nl" type="email" required placeholder={t('news.ph')} /><button type="submit">{t('news.btn')}</button></div>}
        </form>
      </div>
      <div className="footer__copy">{t('copy')}</div>
    </footer>
  )
}
