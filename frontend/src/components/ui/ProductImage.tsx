import { categories } from '../../data/categories'
interface Props { src: string; alt: string; category?: string }
const HEX: Record<string, string> = { bordeaux:'#6E1F32', noir:'#1D1A19', beige:'#D9C6AE', ivoire:'#F3EBDD', marron:'#7a5a45', gris:'#8b8985', rose:'#D9A6B0', vert:'#5a6b55', bleu:'#3f5673' }
/** Mock visual until real photos exist: a tone-on-tone garment tile. Swap for <img> when real images are added. */
export default function ProductImage({ src, alt, category }: Props) {
  if (!src.startsWith('placeholder:')) return <img src={src} alt={alt} loading="lazy" />
  const hex = HEX[src.split(':')[1]] ?? categories.find((c) => c.slug === category)?.hex ?? '#E8DCCF'
  return (
    <div className="pimg" role="img" aria-label={alt} style={{ ['--tone' as string]: hex }}>
      <svg viewBox="0 0 100 130" aria-hidden="true"><path d="M50 14c-3 0-5 2-5 5 0 2 2 3 4 4L18 46c-3 2-2 6 2 6h60c4 0 5-4 2-6L51 23" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M30 52l-8 62c0 3 2 5 5 5h46c3 0 5-2 5-5l-8-62z" fill="currentColor" opacity=".92"/></svg>
    </div>
  )
}
