import { useLanguage } from '../../context/LanguageContext'
import type { Lang } from '../../types/product'
export default function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className={`lang ${className}`} role="group" aria-label={t('lang')}>
      {(['fr', 'en', 'ar'] as Lang[]).map((l) => <button key={l} className={l === lang ? 'is-on' : ''} onClick={() => setLang(l)} aria-pressed={l === lang}>{l === 'ar' ? 'ع' : l.toUpperCase()}</button>)}
    </div>
  )
}
