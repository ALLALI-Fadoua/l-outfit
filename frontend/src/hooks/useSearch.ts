import { useMemo } from 'react'
import { products, productsVersion } from '../data/products'
import { translations } from '../i18n/translations'
import type { Product } from '../types/product'

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u064B-\u065F]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
const stem = (w: string) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w)
const tokens = (q: string) => norm(q).split(/[\s,;]+/).filter(Boolean).map(stem)

/** Everything a product can be found by, in all 3 languages (names, category, colour, tags). */
const haystack = (p: Product) => norm([
  p.name.fr, p.name.en, p.name.ar, p.category, p.subcategory, p.style, ...p.tags,
  translations.fr[`cat.${p.category}`], translations.en[`cat.${p.category}`], translations.ar[`cat.${p.category}`],
  ...p.colors.flatMap((c) => [translations.fr[`color.${c.key}`], translations.en[`color.${c.key}`], translations.ar[`color.${c.key}`], ...(c.label ? Object.values(c.label) : [])]),
].join(' '))
let cache: { v: number; idx: { p: Product; h: string }[] } | null = null
const getIndex = () => {
  const v = productsVersion()
  if (!cache || cache.v !== v) cache = { v, idx: products.map((p) => ({ p, h: haystack(p) })) }
  return cache.idx
}

export function useSearch(query: string): Product[] {
  return useMemo(() => {
    const tk = tokens(query)
    if (tk.length === 0) return []
    return getIndex().filter(({ h }) => tk.every((t) => h.includes(t))).map(({ p }) => p)
  }, [query])
}

/** Visual search is SIMULATED: a deterministic pick from predefined similarity data, not real image recognition. */
export function similarToImage(file: { name: string; size: number }): Product[] {
  const cats = [...new Set(products.map((p) => p.category))]
  const seed = [...file.name].reduce((n, ch) => n + ch.charCodeAt(0), file.size)
  const cat = cats[seed % cats.length]
  const same = products.filter((p) => p.category === cat)
  const rest = products.filter((p) => p.category !== cat && p.style === same[0]?.style)
  return [...same, ...rest].slice(0, 4)
}
