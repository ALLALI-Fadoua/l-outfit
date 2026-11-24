import { createContext, useContext, useState, type ReactNode } from 'react'

/** Prototype only: admin sign-in is mocked. Replace with the real backend (JWT) later. */
interface Ctx { isAdmin: boolean; justLoggedOut: boolean; login: (email: string, password: string) => boolean; logout: () => void }
const AuthContext = createContext<Ctx | null>(null)
const KEY = 'lo_admin'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(KEY) === '1')
  const [justLoggedOut, setJustLoggedOut] = useState(false)
  const login = (email: string, password: string) => {
    const ok = email.trim().toLowerCase() === 'admin@loutfit.dz' && password === 'admin123'
    if (ok) { localStorage.setItem(KEY, '1'); setIsAdmin(true); setJustLoggedOut(false) }
    return ok
  }
  const logout = () => { localStorage.removeItem(KEY); setJustLoggedOut(true); setIsAdmin(false) }
  return <AuthContext.Provider value={{ isAdmin, justLoggedOut, login, logout }}>{children}</AuthContext.Provider>
}
export function useAuthContext() {
  const c = useContext(AuthContext)
  if (!c) throw new Error('useAuth must be used inside AuthProvider')
  return c
}
