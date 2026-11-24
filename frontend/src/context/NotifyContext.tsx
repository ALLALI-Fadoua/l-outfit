import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLanguage } from './LanguageContext'

type Kind = 'success' | 'error' | 'info'
export interface ToastOptions { type?: Kind; title: string; message?: string; duration?: number }
export interface ConfirmOptions { title: string; message?: string; confirmLabel: string; cancelLabel: string; danger?: boolean }
interface ToastData extends ToastOptions { id: number }

interface Ctx { toast: (o: ToastOptions) => void; confirm: (o: ConfirmOptions) => Promise<boolean> }
const NotifyContext = createContext<Ctx | null>(null)

const Icon = ({ kind }: { kind: Kind }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'success' && <path d="m5 12.5 4.5 4.5L19 7.5" />}
    {kind === 'error' && <><path d="M12 7v6" /><path d="M12 17h.01" /></>}
    {kind === 'info' && <><path d="M12 11v6" /><path d="M12 7h.01" /></>}
  </svg>
)

/** One toast: auto-closes (paused while hovered), can be closed by hand. */
function ToastItem({ data, onDone, closeLabel }: { data: ToastData; onDone: (id: number) => void; closeLabel: string }) {
  const kind = data.type ?? 'success'
  const total = data.duration ?? (kind === 'error' ? 6000 : 3800)
  const [leaving, setLeaving] = useState(false)
  const remaining = useRef(total)
  const startedAt = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  const close = useCallback(() => { setLeaving(true); window.setTimeout(() => onDone(data.id), 260) }, [data.id, onDone])
  const start = useCallback(() => { startedAt.current = Date.now(); timer.current = window.setTimeout(close, remaining.current) }, [close])
  const pause = () => { window.clearTimeout(timer.current); remaining.current -= Date.now() - startedAt.current }
  useEffect(() => { start(); return () => window.clearTimeout(timer.current) }, [start])

  return (
    <div className={`toast toast--${kind} ${leaving ? 'is-leaving' : ''}`} role={kind === 'error' ? 'alert' : 'status'} onMouseEnter={pause} onMouseLeave={start}>
      <span className="toast__icon"><Icon kind={kind} /></span>
      <div className="toast__body"><p className="toast__title">{data.title}</p>{data.message && <p className="toast__msg">{data.message}</p>}</div>
      <button className="toast__close" onClick={close} aria-label={closeLabel}>×</button>
      <span className="toast__bar" style={{ ['--d' as string]: `${total}ms` }} />
    </div>
  )
}

/** Branded confirmation window (replaces the browser's grey confirm box). */
function ConfirmDialog({ opts, onAnswer }: { opts: ConfirmOptions; onAnswer: (v: boolean) => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const okRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    cancelRef.current?.focus()                       // safe default: Cancel
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onAnswer(false) }
    if (e.key === 'Tab') {                           // keep focus inside the window
      const first = cancelRef.current, last = okRef.current
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
  }
  return (
    <div className="dialog-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onAnswer(false) }} onKeyDown={onKey}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dlg-title" aria-describedby={opts.message ? 'dlg-msg' : undefined}>
        <span className={`dialog__icon ${opts.danger ? '' : 'dialog__icon--info'}`}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {opts.danger ? <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" /> : <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>}
          </svg>
        </span>
        <h2 id="dlg-title">{opts.title}</h2>
        {opts.message && <p id="dlg-msg">{opts.message}</p>}
        <div className="dialog__actions">
          <button ref={cancelRef} type="button" className="btn" onClick={() => onAnswer(false)}>{opts.cancelLabel}</button>
          <button ref={okRef} type="button" className={`btn ${opts.danger ? 'btn--dangersolid' : 'btn--solid'}`} onClick={() => onAnswer(true)}>{opts.confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export function NotifyProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [dialog, setDialog] = useState<{ opts: ConfirmOptions; resolve: (v: boolean) => void } | null>(null)
  const seq = useRef(0)

  const toast = useCallback((o: ToastOptions) => setToasts((l) => [...l.slice(-3), { ...o, id: ++seq.current }]), [])
  const dismiss = useCallback((id: number) => setToasts((l) => l.filter((x) => x.id !== id)), [])
  const confirm = useCallback((opts: ConfirmOptions) => new Promise<boolean>((resolve) => setDialog({ opts, resolve })), [])
  const answer = (v: boolean) => { dialog?.resolve(v); setDialog(null) }

  const value = useMemo(() => ({ toast, confirm }), [toast, confirm])
  return (
    <NotifyContext.Provider value={value}>
      {children}
      <div className="toasts" aria-live="polite">{toasts.map((x) => <ToastItem key={x.id} data={x} onDone={dismiss} closeLabel={t('notify.close')} />)}</div>
      {dialog && <ConfirmDialog opts={dialog.opts} onAnswer={answer} />}
    </NotifyContext.Provider>
  )
}

export function useNotify() {
  const c = useContext(NotifyContext)
  if (!c) throw new Error('useNotify must be used inside NotifyProvider')
  return c
}
export const useToast = () => useNotify().toast
export const useConfirm = () => useNotify().confirm
