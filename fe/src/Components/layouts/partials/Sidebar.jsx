import { BriefcaseBusiness, Building, CalendarArrowUp, CalendarClock, CalendarOff, ChevronRight, Database, Dot, FileClock, FilePen, History, LayoutDashboard, PanelsLeftBottom, Users } from "lucide-react";
import NavLink from "../../commons/atoms/NavLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { cn } from "../../../lib/utils";
import { use, useEffect, useState } from "react";
import { is, se } from "date-fns/locale";


const Sidebar = ({ location, minMaxSize }) => {
    const sectionMasterDataRoutes = [
        "/admin/karyawan",
        "/admin/jabatan",
        "/admin/departmen",
        "/admin/shift",
        "/admin/gapok",
    ];
    const sectionLeaveRoutes = [
        "/admin/cuti",
        "/admin/riwayat-cuti",
    ];
    const sectionAttandanceRoutes = [
        "/admin/absensi",
        "/admin/kehadiran",
    ]

    const [openMaster, setOpenMaster] = useState(false);
    const [openAttandance, setOpenAttandance] = useState(false);
    const [openLeave, setOpenLeave] = useState(false);

    const isMasterActive = sectionMasterDataRoutes.some(route => location.pathname.startsWith(route));
    const isAttandanceActive = sectionAttandanceRoutes.some(route => location.pathname.startsWith(route));
    const isLeaveActive = sectionLeaveRoutes.some(route => location.pathname.startsWith(route));

    useEffect(() => {
        setOpenMaster(isMasterActive)
    }, [isMasterActive])

    useEffect(() => {
        setOpenAttandance(isAttandanceActive)
    }, [isAttandanceActive])

    useEffect(() => {
        setOpenLeave(isLeaveActive)
    }, [isLeaveActive])

    return (
        <nav className="grid items-start px-2 text-sm lg:px-4 gap-2">
            {/* Dashboard */}
            <NavLink
                to="/"
                isMasterActive={location.pathname === "/"}
                icon={LayoutDashboard}
                {...(minMaxSize && { title: "Dashboard" })}
            />

            {/* Absensi & Kehadiran */}
            <Collapsible open={openAttandance} onOpenChange={setOpenAttandance} >
                <CollapsibleTrigger
                    className={cn(
                        isAttandanceActive && "bg-indigo-100 text-indigo-500",
                        "group flex items-center justify-between w-full p-3 text-sm text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 rounded-md transition",

                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <CalendarArrowUp className="h-4 w-4 shrink-0" />
                            Absensi & Kehadiran
                        </span>
                    ) : (
                        <CalendarArrowUp className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>

                {minMaxSize && (
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                            <NavLink
                                to="/riwayat-kehadiran"
                                icon={Dot}
                                title="Riwayat Kehadiran"
                            />
                            <NavLink
                                to="/riwayat-kehadiran"
                                icon={Dot}
                                title="Riwayat Absensi"
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Cuti & Izin */}
            <Collapsible open={openLeave} onOpenChange={setOpenLeave} >
                <CollapsibleTrigger
                    className={cn(
                        isAttandanceActive && "bg-indigo-100 text-indigo-500",
                        "group flex items-center justify-between w-full p-3 text-sm text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 rounded-md transition",

                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <CalendarOff className="h-4 w-4 shrink-0" />
                            Cuti & Izin
                        </span>
                    ) : (
                        <CalendarOff className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>

                {minMaxSize && (
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                            <NavLink to="/cuti" icon={Dot} title="Pengajuan Cuti/Izin" />
                            <NavLink to="/riwayat-cuti" icon={Dot} title="Riwayat Pengajuan" />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Cuti */}
            {/* <Collapsible open={open}>
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 rounded-md transition",
                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <FilePen className="h-4 w-4 shrink-0" />
                            Cuti & Izin
                        </span>
                    ) : (
                        <FilePen className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>

                {minMaxSize && (
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                            <NavLink to="/cuti" icon={Dot} title="Pengajuan Cuti/Izin" />
                            <NavLink to="/riwayat-cuti" icon={Dot} title="Riwayat Pengajuan" />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible> */}

            {/* Master Data */}
            <Collapsible open={openMaster} onOpenChange={setOpenMaster}>
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm rounded-md transition",
                        isMasterActive ?
                            'bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-500 font-semibold text-white hover:text-white'
                            :
                            'text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 '

                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <Database className="h-4 w-4 shrink-0" />
                            Master Data
                        </span>
                    ) : (
                        <Database className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>

                {minMaxSize && (
                    <CollapsibleContent className="max-h-[250px] overflow-y-auto scrollbar-thin data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                            <NavLink
                                to="/admin/karyawan"
                                active={location.pathname.startsWith("/admin/karyawan")}
                                icon={Dot}
                                title="Karyawan"
                            />
                            <NavLink
                                to="/admin/jabatan"
                                active={location.pathname.startsWith("/admin/jabatan")}
                                icon={Dot}
                                title="Jabatan"
                            />
                            <NavLink
                                to="/admin/departmen"
                                active={location.pathname.startsWith("/admin/departmen")}
                                icon={Dot}
                                title="Departmen"
                            />
                            <NavLink
                                to="/admin/shift"
                                active={location.pathname.startsWith("/admin/shift")}
                                icon={Dot}
                                title="Shift"
                            />
                            <NavLink
                                to="/admin/tunjaangan"
                                active={location.pathname.startsWith("/admin/tunjaangan")}
                                icon={Dot}
                                title="Tunjanagan"
                            />
                            <NavLink
                                to="/admin/potongan"
                                active={location.pathname.startsWith("/admin/potongan")}
                                icon={Dot}
                                title="Potongan"
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>
        </nav>

    );
};


export default Sidebar