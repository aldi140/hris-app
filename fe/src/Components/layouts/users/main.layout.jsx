import { Toaster } from "sonner"
import NavLayoutMobile from "./navigation.layout"
import { Outlet, useLocation } from "react-router-dom"

const MainLayoutUser = () => {
    const location = useLocation()

    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="relative min-h-screen pb-20 bg-slate-100">
                <Outlet />
                <NavLayoutMobile location={location} />
            </div>
        </>
    )
}

export default MainLayoutUser