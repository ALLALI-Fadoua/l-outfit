import type { Lang } from '../types/product'
export const formatPrice = (n: number, lang: Lang) =>
  n.toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR').replace(/\u202f|\u00a0/g, ' ') + (lang === 'ar' ? ' دج' : ' DA')
