import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
/** Protects /admin/*: only the signed-in admin gets in. */
export default function AdminRoute() {
  const { isAdmin, justLoggedOut } = useAuth()
  if (isAdmin) return <Outlet />
  // after an explicit logout go to the public home page; otherwise (visitor typing /admin) go to the login form
  return <Navigate to={justLoggedOut ? '/' : '/admin/login'} replace />
}
