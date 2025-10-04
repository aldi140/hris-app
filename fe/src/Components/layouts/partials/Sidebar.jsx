import { BriefcaseBusiness, Building, CalendarArrowUp, CalendarClock, FileClock, FilePen, History, LayoutDashboard, PanelsLeftBottom, Users } from "lucide-react";
import NavLink from "../../commons/atoms/NavLink";


const Sidebar = ({ location, minMaxSize }) => {
    return (
        <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
            )}
            <NavLink
                to="/"
                active={location.pathname === "/"}
                icon={LayoutDashboard}
                {...(minMaxSize && { title: "Dashboard" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Absensi & Kehadiran</div>
            )}
            <NavLink
                to="/absensi"
                icon={CalendarArrowUp}
                active={location.pathname.startsWith("/absensi")}
                {...(minMaxSize && { title: "Absensi" })}
            />
            <NavLink
                to="#"
                icon={CalendarClock }
                {...(minMaxSize && { title: "Riwayat Kehadiran" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Cuti & Izin</div>
            )}
            <NavLink
                to="#"
                icon={FilePen }
                {...(minMaxSize && { title: "Pengajuan Cuti/Izin" })}
            />
            <NavLink
                to="#"
                icon={FileClock}
                {...(minMaxSize && { title: "Riwayat Pengajuan" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Departmen</div>
            )}
            <NavLink
                to="/departmen"
                active={location.pathname.startsWith("/departmen")}
                icon={Building}
                {...(minMaxSize && { title: "Master Departmen" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Jabatan</div>
            )}
            <NavLink
                to="/jabatan"
                active={location.pathname.startsWith("/jabatan")}
                icon={BriefcaseBusiness}
                {...(minMaxSize && { title: "Master Jabatan" })}
            />
            <NavLink
                to="/gapok"
                active={location.pathname.startsWith("/gapok")}
                icon={BriefcaseBusiness}
                {...(minMaxSize && { title: "Master Gapok" })}
            />
            <NavLink
                to="/jabatan"
                active={location.pathname.startsWith("/jabatan")}
                icon={BriefcaseBusiness}
                {...(minMaxSize && { title: "Master Tunjangan" })}
            />
            <NavLink
                to="/jabatan"
                active={location.pathname.startsWith("/jabatan")}
                icon={BriefcaseBusiness}
                {...(minMaxSize && { title: "Master Potongan" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Karyawan</div>
            )}
            <NavLink
                to="/karyawan"
                active={location.pathname.startsWith("/karyawan")}
                icon={Users}
                {...(minMaxSize && { title: "Master Karyawan" })}
            />

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Shift</div>
            )}
            <NavLink
                to="/shift"
                active={location.pathname.startsWith("/shift")}
                icon={Users}
                {...(minMaxSize && { title: "Master Shift Karyawan" })}
            />
        </nav>
    );
};


export default Sidebar