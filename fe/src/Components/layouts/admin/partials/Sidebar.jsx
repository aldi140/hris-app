import { BriefcaseBusiness, Building, CalendarArrowUp, CalendarClock, CalendarOff, ChevronRight, Database, Dot, LayoutDashboard, MapPinCheck } from "lucide-react";
import NavLink from "../../../commons/atoms/NavLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible";
import { cn } from "../../../../lib/utils";
import { useEffect, useState } from "react";


const Sidebar = ({ location, minMaxSize }) => {
    const sectionMasterDataRoutes = [
        "/karyawan",
        "/jabatan",
        "/departmen",
        "/shift",
        "/gapok",
        "/jadwal-kerja",
        "/office",

    ];
    const sectionLeaveRoutes = [
        "/cuti",
        "/riwayat-cuti",
    ];
    const sectionAttandanceRoutes = [
        "/attendance/list-attendance",
        "/attendance/list-presence",
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
            <NavLink
                to="/field-visit"
                isMasterActive={location.pathname === "/field-visit"}
                icon={MapPinCheck}
                {...(minMaxSize && { title: "Survey & Kunjungan" })}
            />

            {/* Absensi & Kehadiran */}
            <Collapsible open={openAttandance} onOpenChange={setOpenAttandance} >
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm rounded-md transition",
                        isAttandanceActive ?
                            'bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-500 font-semibold text-white hover:text-white'
                            :
                            'text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 '

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
                            {/* <NavLink
                                to="attendance/list-presence"
                                icon={Dot}
                                title="Riwayat Kehadiran"
                                active={location.pathname === "/attendance/list-presence"}
                            /> */}
                            <NavLink
                                to="attendance/list-attendance"
                                icon={Dot}
                                title="Riwayat Absensi"
                                active={location.pathname === "/attendance/list-attendance"}
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Cuti & Izin */}
            <Collapsible open={openLeave} onOpenChange={setOpenLeave} >
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm rounded-md transition",
                        isLeaveActive ?
                            'bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-500 font-semibold text-white hover:text-white'
                            :
                            'text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 '


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
                            <NavLink to="#" icon={Dot} title="Pengajuan Cuti/Izin" />
                            <NavLink to="#" icon={Dot} title="Riwayat Pengajuan" />
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
                                to="employee"
                                active={location.pathname.startsWith("/employee")}
                                icon={Dot}
                                title="Karyawan"
                            />
                            <NavLink
                                to="jabatan"
                                active={location.pathname.startsWith("/jabatan")}
                                icon={Dot}
                                title="Jabatan"
                            />
                            <NavLink
                                to="departmen"
                                active={location.pathname.startsWith("/departmen")}
                                icon={Dot}
                                title="Departemen"
                            />
                            <NavLink
                                to="shift"
                                active={location.pathname.startsWith("/shift")}
                                icon={Dot}
                                title="Shift"
                            />
                            {/* <NavLink
                                to="tunjangan"
                                active={location.pathname.startsWith("/tunjangan")}
                                icon={Dot}
                                title="Tunjangan"
                            /> */}
                            {/* <NavLink
                                to="potongan"
                                active={location.pathname.startsWith("/potongan")}
                                icon={Dot}
                                title="Potongan"
                            /> */}
                            {/* <NavLink
                                to="jadwal-kerja"
                                active={location.pathname.startsWith("/jadwal-kerja")}
                                icon={Dot}
                                title="Jadwal Kerja"
                            /> */}
                            <NavLink
                                to="office"
                                active={location.pathname.startsWith("/office")}
                                icon={Dot}
                                title="Kantor"
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>
        </nav>

    );
};


export default Sidebar