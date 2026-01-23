import { BriefcaseBusiness, Building, CalendarArrowUp, CalendarClock, ChevronRight, FileClock, FilePen, History, LayoutDashboard, PanelsLeftBottom, Users } from "lucide-react";
import NavLink from "../../commons/atoms/NavLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { cn } from "../../../lib/utils";


const Sidebar = ({ location, minMaxSize }) => {
    return (
        <nav className="grid items-start px-2 text-sm lg:px-4">
            {/* Dashboard */}
            <NavLink
                to="/"
                active={location.pathname === "/"}
                icon={LayoutDashboard}
                {...(minMaxSize && { title: "Dashboard" })}
            />

            {/* Absensi */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger
                    className={cn(
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
                                to="/absensi"
                                icon={CalendarArrowUp}
                                active={location.pathname.startsWith("/absensi")}
                                title="Absensi"
                            />
                            <NavLink
                                to="/riwayat-kehadiran"
                                icon={CalendarClock}
                                title="Riwayat Kehadiran"
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Cuti */}
            <Collapsible>
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
                            <NavLink to="/cuti" icon={FilePen} title="Pengajuan Cuti/Izin" />
                            <NavLink to="/riwayat-cuti" icon={FileClock} title="Riwayat Pengajuan" />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Departemen */}
            <Collapsible>
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 rounded-md transition",

                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <Building className="h-4 w-4 shrink-0" />
                            Departemen
                        </span>
                    ) : (
                        <Building className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>

                {minMaxSize && (
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                            <NavLink
                                to="/admin/departmen"
                                active={location.pathname.startsWith("/admin/departmen")}
                                icon={Building}
                                title="Master Departmen"
                            />
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>

            {/* Jabatan */}
            <Collapsible>
                <CollapsibleTrigger
                    className={cn(
                        "group flex items-center justify-between w-full p-3 text-sm text-muted-foreground hover:bg-indigo-100 hover:text-indigo-500 rounded-md transition",

                    )}
                >
                    {minMaxSize ? (
                        <span className="flex items-center gap-3">
                            <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                            Jabatan
                        </span>
                    ) : (
                        <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                    )}
                    {minMaxSize && (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    )}
                </CollapsibleTrigger>
            </Collapsible>

            {minMaxSize && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Jabatan</div>
            )}
            <NavLink
                to="/jabatan"
                active={location.pathname.startsWith("/jabatan")}
                icon={BriefcaseBusiness}
                {...(minMaxSize && { title: "Master Jabatan" })}
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
        </nav>

    );
};


export default Sidebar