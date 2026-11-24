import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

/** Goes back to the previous page. If the page was opened directly (no history in this tab), goes to `fallback`. */
export default function BackButton({ fallback = '/', className = '' }: { fallback?: string; className?: string }) {
  const nav = useNavigate()
  const { t } = useLanguage()
  const hasHistory = () => (window.history.state?.idx ?? 0) > 0
  return (
    <button type="button" className={`back ${className}`} onClick={() => (hasHistory() ? nav(-1) : nav(fallback))}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      <span>{t('back')}</span>
    </button>
  )
}
