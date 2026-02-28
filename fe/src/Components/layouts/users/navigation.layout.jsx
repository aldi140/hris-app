import { Home, LucideBell, LucideCalendarCheck, LucideSettings, LucideUserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import NavLinkBottom from "../../commons/atoms/NavBottom";

const NavLayoutMobile = ({ location }) => {
    const hideOn = ["/home", "/attendance", "/notification", "/profile"]
    if (!hideOn.includes(location.pathname)) return null
    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-11/12 lg:max-w-xl p-3 border rounded-xl bg-white shadow-2xl">
            <div className="flex flex-row justify-evenly items-center">
                {/* <Link to="/home" className={`bg-linear-to-r from-red-800 to-red-700  text-xs text-white p-3 rounded-xl flex flex-row items-center gap-2`}><Home className="w-5 h-5" />Home</Link> */}
                <NavLinkBottom to="/home" title="Beranda" icon={Home} active={location.pathname.startsWith("/home")} />
                <NavLinkBottom to="/attendance" title="Absensi" icon={LucideCalendarCheck} active={location.pathname.startsWith("/attendance")} />
                {/* <NavLinkBottom to="/notification" title="Notifikasi" icon={LucideBell} active={location.pathname.startsWith("/notification")} /> */}
                <NavLinkBottom to="/profile" title="Profil" icon={LucideUserRoundCog} active={location.pathname.startsWith("/profile")} />


                {/* <Link to="/attendance" className={`text-neutral-400 p-2 rounded-md`}><LucideCalendarCheck className="w-6 h-6" /></Link>
                <Link to="/" className={`text-neutral-400 p-2 rounded-md`}><LucideBell className="w-6 h-6" /></Link>
                <Link to="/" className={`text-neutral-400 p-2 rounded-md`}><LucideUserRoundCog className="w-6 h-6" /></Link> */}
            </div>
        </nav>
    );
}

export default NavLayoutMobile