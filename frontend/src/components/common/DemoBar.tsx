import { useLanguage } from '../../context/LanguageContext'
import { isDemoOn, setDemoOn } from '../../services/orderService'

/** Tells the admin that example data is shown, and lets them hide/show it in one click. */
export default function DemoBar({ onChange }: { onChange: () => void }) {
  const { t } = useLanguage()
  const on = isDemoOn()
  return (
    <div className={`demobar ${on ? '' : 'demobar--off'}`}>
      <span>{on ? t('adm.demoBanner') : t('adm.demoOff')}</span>
      <button className="link" onClick={() => { setDemoOn(!on); onChange() }}>{on ? t('adm.demoHide') : t('adm.demoShow')}</button>
    </div>
  )
}
