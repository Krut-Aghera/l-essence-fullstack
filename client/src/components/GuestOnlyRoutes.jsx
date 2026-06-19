import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const GuestOnlyRoutes = () => {

      const { isLoggedIn } = useSelector(
            state => state.auth
      )

      if (isLoggedIn) {
            return <Navigate to="/" replace />
      }

      return <Outlet />
}

export default GuestOnlyRoutes