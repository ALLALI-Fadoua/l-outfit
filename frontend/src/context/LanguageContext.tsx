import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types/product'
import { translations } from '../i18n/translations'
import { colorLabels } from '../data/colors'

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: 'ltr' | 'rtl' }
const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('lo_lang') as Lang) || 'fr')
  /** Switch language instantly: transitions are frozen for a moment so nothing slides/flips while the direction changes. */
  const setLang = (l: Lang) => {
    const root = document.documentElement
    root.classList.add('no-anim')
    setLangState(l)
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-anim')))
  }
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem('lo_lang', lang)
  }, [lang, dir])
  const value = useMemo<Ctx>(() => ({ lang, setLang, dir, t: (k) => translations[lang][k] ?? translations.fr[k] ?? (k.startsWith('color.') ? colorLabels[k.slice(6)]?.[lang] : undefined) ?? k }), [lang, dir])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export function useLanguage() {
  const c = useContext(LanguageContext)
  if (!c) throw new Error('useLanguage must be used inside LanguageProvider')
  return c
}
