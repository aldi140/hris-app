import { Building, CalendarArrowUp, History, LayoutDashboard, PanelsLeftBottom } from "lucide-react";
import NavLink from "../../commons/atoms/NavLink";


const Sidebar = ({ location}) => {
    return (
        <nav className="gird items-start px-2 text-sm font-semibold lg:px-4">
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
            <NavLink to="/" title="Dashboard" active={location.pathname === "/"} icon={LayoutDashboard} />

            <div className="px-3 py-2 text-sm font-semibold text-foreground">Absensi & Kehadiran</div>
            <NavLink to="#" title="Absensi" icon={CalendarArrowUp} />
            <NavLink to="#" title="Riwayat Kehadiran" icon={History} />

            <div className="px-3 py-2 text-sm font-semibold text-foreground">Cuti & Izin</div>
            <NavLink to="#" title="Pengajuan Cuti/Izin" icon={LayoutDashboard} />
            <NavLink to="#" title="Riwayat Pengajuan" icon={LayoutDashboard} />

            <div className="px-3 py-2 text-sm font-semibold text-foreground">Departmen</div>
            <NavLink to="/departmen" active={location.pathname === "/departmen"} title="Master" icon={Building } />
        </nav>
    )
}

export default Sidebar