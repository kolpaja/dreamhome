import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../../hooks/useAuthStatus"

const PrivateRoute = () => {
    const { isLoading, isLoggedIn } = useAuthStatus()

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute