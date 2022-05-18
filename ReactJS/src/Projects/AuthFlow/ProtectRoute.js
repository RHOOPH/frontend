import { useLocation, Navigate, Outlet } from "react-router-dom"
import { loginRoute } from "../../routes"
import { useAuth } from "./auth"

function ProtectRoute() {
  const { user } = useAuth()
  const location = useLocation()
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={loginRoute} state={{ from: location.pathname }} replace />
  )
}
export default ProtectRoute
