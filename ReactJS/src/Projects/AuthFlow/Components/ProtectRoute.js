import { useLocation, Navigate, Outlet } from "react-router-dom"
import { loginRoute } from "../../../routes"
import { useAuth } from "../authContext"

function ProtectRoute() {
  const { user, gettingUser } = useAuth()
  const location = useLocation()
  return gettingUser ? (
    <h1 style={{ textAlign: "center" }}>Logging In...</h1>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to={loginRoute} state={{ from: location.pathname }} replace />
  )
}
export default ProtectRoute
