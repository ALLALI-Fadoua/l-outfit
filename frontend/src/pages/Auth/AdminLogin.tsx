import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import LangSwitch from '../../components/ui/LangSwitch'
import BackButton from '../../components/common/BackButton'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../context/LanguageContext'

export default function AdminLogin() {
  const { t } = useLanguage()
  const { isAdmin, login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  if (isAdmin) return <Navigate to="/admin" replace />
  const submit = (e: FormEvent) => { e.preventDefault(); if (login(email, pw)) nav('/admin', { replace: true }); else setErr(true) }
  return (
    <div className="alogin">
      <BackButton className="alogin__back" />
      <form className="alogin__card" onSubmit={submit}>
        <LangSwitch className="alogin__lang" />
        <img src={logo} alt="L’Outfit" />
        <h1>{t('admin.login')}</h1>
        <div className="field"><label htmlFor="ae">{t('admin.email')}</label><input id="ae" type="email" dir="ltr" value={email} onChange={(e) => { setEmail(e.target.value); setErr(false) }} required autoComplete="username" /></div>
        <div className="field"><label htmlFor="ap">{t('admin.password')}</label><input id="ap" type="password" dir="ltr" value={pw} onChange={(e) => { setPw(e.target.value); setErr(false) }} required autoComplete="current-password" /></div>
        {err && <p className="err" role="alert">{t('admin.error')}</p>}
        <button className="btn btn--solid" type="submit">{t('admin.signin')}</button>
        <small className="muted">{t('admin.demo')}</small>
      </form>
    </div>
  )
}
