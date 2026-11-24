import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
interface Props { title: string; sub?: string; cta?: { to: string; label: string }; children: ReactNode; tone?: 'plain' | 'beige' }
export default function Section({ title, sub, cta, children, tone = 'plain' }: Props) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <div className="section__head"><div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>{cta && <Link className="link" to={cta.to}>{cta.label}</Link>}</div>
        {children}
      </div>
    </section>
  )
}
