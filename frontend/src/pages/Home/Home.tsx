import { Link } from 'react-router-dom'
import heroPortrait from '../../assets/images/hero-portrait.jpg'
import logo from '../../assets/images/logo.png'
import banner from '../../assets/images/banner-store.jpg'
import Section from '../../components/common/Section'
import ProductGrid from '../../components/shop/ProductGrid'
import CategoryCard from '../../components/shop/CategoryCard'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { useLanguage } from '../../context/LanguageContext'

const Line = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>

export default function Home() {
  const { t } = useLanguage()
  const trust = [
    ['M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-.1zM17 19a1.5 1.5 0 1 0 0-.1z', 1],
    ['M4 7h16v10H4zM4 11h16M8 15h3', 2],
    ['M5 13a7 7 0 0 1 14 0M4 13h3v5H4zM17 13h3v5h-3z', 3],
    ['M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z', 4],
  ] as const
  return (
    <>
      <section className="hero">
        <h1 className="sr">L’Outfit — WEAR YOUR STYLE</h1>
        <div className="hero__stage">
          <img className="hero__bg hero__bg--wide" src={banner} alt="" />
          <img className="hero__bg hero__bg--portrait" src={heroPortrait} alt="" />
          <div className="hero__brand">
            <img src={logo} alt="L’Outfit" />
            <p className="hero__tag">WEAR YOUR STYLE</p>
            <span className="hero__rule" aria-hidden="true"><b>✦</b></span>
            <nav className="hero__links" aria-label="L’Outfit">
              <Link to="/shop?filter=new">{t('nav.new')}</Link><i aria-hidden="true" />
              <Link to="/collections/burgundy-edit">{t('nav.collections')}</Link><i aria-hidden="true" />
              <Link to="/shop">{t('hero.acc')}</Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="trustbar"><div className="container trustbar__row">
        {trust.map(([d, n]) => <div key={n}><Line d={d} /><div><strong>{t(`trust.${n}.t`)}</strong><small>{t(`trust.${n}.d`)}</small></div></div>)}
      </div></section>

      <Section title={t('cat.title')} sub={t('cat.sub')}>
        <div className="cgrid">{categories.map((c) => <CategoryCard key={c.slug} category={c} />)}</div>
      </Section>

      <section className="promo container">
        <div className="promo__text"><small>{t('promo.label')}</small><h2>{t('promo.title')}</h2><p>{t('promo.text')}</p><Link to="/sale" className="btn btn--light">{t('promo.cta')}</Link></div>
        <img src={banner} alt="" loading="lazy" />
      </section>

      <Section title={t('new.title')} sub={t('new.sub')} cta={{ to: '/shop?filter=new', label: t('new.all') }}>
        <ProductGrid items={products.filter((p) => p.isNew).slice(0, 8)} badge="new" />
      </Section>

      <Section title={t('trend.title')} tone="beige">
        <div className="carousel">{products.filter((p) => p.isTrending).map((p) => <div key={p.id}><ProductGrid items={[p]} /></div>)}</div>
      </Section>

      <Section title={t('best.title')} sub={t('best.sub')} cta={{ to: '/shop', label: t('viewAll') }}>
        <ProductGrid items={products.filter((p) => p.isBestSeller).slice(0, 8)} badge="best" />
      </Section>

      <Section title={t('sale.title')} sub={t('sale.sub')} cta={{ to: '/sale', label: t('sale.all') }} tone="beige">
        <ProductGrid items={products.filter((p) => p.oldPrice).slice(0, 4)} />
      </Section>
    </>
  )
}
