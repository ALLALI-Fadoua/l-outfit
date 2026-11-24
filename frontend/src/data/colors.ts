import type { Lang } from '../types/product'

/** Preset colours. Names are translated through the keys `color.<key>` in i18n/translations.ts. */
export const colorPalette = [
  { key: 'bordeaux', hex: '#6E1F32' }, { key: 'noir', hex: '#1D1A19' }, { key: 'beige', hex: '#D9C6AE' },
  { key: 'ivoire', hex: '#F3EBDD' }, { key: 'marron', hex: '#7a5a45' }, { key: 'gris', hex: '#8b8985' },
  { key: 'rose', hex: '#D9A6B0' }, { key: 'vert', hex: '#5a6b55' }, { key: 'bleu', hex: '#3f5673' },
  { key: 'blanc', hex: '#FFFFFF' }, { key: 'camel', hex: '#C19A6B' }, { key: 'kaki', hex: '#7a7a52' },
  { key: 'marine', hex: '#1F2A44' }, { key: 'rouge', hex: '#B3202A' }, { key: 'orange', hex: '#E07B39' },
  { key: 'jaune', hex: '#E8C547' }, { key: 'violet', hex: '#6B4C8A' }, { key: 'turquoise', hex: '#3FA7A3' },
  { key: 'corail', hex: '#EE7B6D' }, { key: 'dore', hex: '#C7A56A' }, { key: 'argente', hex: '#BFC3C7' },
] as const
export const hexOf = (key: string) => colorPalette.find((c) => c.key === key)?.hex ?? '#cccccc'
export const styles = ['Casual', 'Chic', 'Élégant', 'Office', 'Soirée', 'Minimal', 'Streetwear'] as const
export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

/** Names of the colours created freely by the admin (key -> names in the 3 languages). Filled from the product list. */
export const colorLabels: Record<string, Record<Lang, string>> = {}
