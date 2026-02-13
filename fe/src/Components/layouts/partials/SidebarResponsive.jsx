import { BriefcaseBusiness, Building, CalendarArrowUp, CalendarOff, ChevronRight, Database, Dot, History, LayoutDashboard, MapPinCheck, PanelsLeftBottom, Users } from "lucide-react";
import { Button } from "../../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"

import * as VisuallHidden from '@radix-ui/react-visually-hidden'
import NavLinkResponsive from "../../commons/atoms/NavLinkResponsive"
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { cn } from "../../../lib/utils";
const SidebarResponsive = ({ location }) => {
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
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='shrink-0 md:hidden'>
                    <PanelsLeftBottom className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col max-h-screen overflow-y-auto">
                <SheetHeader className="flex-row border-b">
                    <SheetTitle>
                        <VisuallHidden.Root>Sidebar Responsive</VisuallHidden.Root>
                    </SheetTitle>
                    <SheetDescription>
                        <VisuallHidden.Root>Sidebar Responsive</VisuallHidden.Root>
                    </SheetDescription>
                    <div className=" font-semibold text-foreground">
                        <span className="text-indigo-600">HRIS</span><span className="text-gray-600">APP</span>
                        <p className="text-xs text-gray-500 font-normal">Smarter HR, Simplified.</p>
                    </div>
                </SheetHeader>

                {/* menu sidebar responsive */}
                <nav className="grid gap-6 text-lg font-medium">

                    <nav className="grid items-start px-3 text-sm lg:px-4 gap-2">
                        {/* Dashboard */}
                        <NavLinkResponsive to="/" isMasterActive={location.pathname === "/"} title="Dashboard" icon={LayoutDashboard} />
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

                                <span className="flex items-center gap-3">
                                    <CalendarArrowUp className="h-4 w-4 shrink-0" />
                                    Absensi & Kehadiran
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                            </CollapsibleTrigger>

                            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                                    {/* <NavLinkResponsive
                                        to="attendance/list-presence"
                                        icon={Dot}
                                        title="Riwayat Kehadiran"
                                        active={location.pathname.startsWith("/attendance/list-presence")}
                                    /> */}
                                    <NavLinkResponsive
                                        to="attendance/list-attendance"
                                        icon={Dot}
                                        active={location.pathname.startsWith("/attendance/list-attendance")}
                                        title="Riwayat Absensi"
                                    />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        {/* Cuti */}
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
                                <span className="flex items-center gap-3">
                                    <CalendarOff className="h-4 w-4 shrink-0" />
                                    Cuti & Izin
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />

                            </CollapsibleTrigger>

                            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                                    <NavLinkResponsive to="/cuti" icon={Dot} title="Pengajuan Cuti/Izin" />
                                    <NavLinkResponsive to="/riwayat-cuti" icon={Dot} title="Riwayat Pengajuan" />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

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

                                <span className="flex items-center gap-3">
                                    <Database className="h-4 w-4 shrink-0" />
                                    Master Data
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                            </CollapsibleTrigger>

                            <CollapsibleContent className="max-h-[170px] overflow-y-auto scrollbar-thin data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                <div className="ml-4 border-l-2 border-muted pl-4 flex flex-col gap-1 py-2">
                                    <NavLinkResponsive
                                        to="karyawan"
                                        active={location.pathname.startsWith("/karyawan")}
                                        icon={Dot}
                                        title="Karyawan"
                                    />
                                    <NavLinkResponsive
                                        to="jabatan"
                                        active={location.pathname.startsWith("/jabatan")}
                                        icon={Dot}
                                        title="Jabatan"
                                    />
                                    <NavLinkResponsive
                                        to="departmen"
                                        active={location.pathname.startsWith("/departmen")}
                                        icon={Dot}
                                        title="Departmen"
                                    />
                                    <NavLinkResponsive
                                        to="shift"
                                        active={location.pathname.startsWith("/shift")}
                                        icon={Dot}
                                        title="Shift"
                                    />
                                    {/* <NavLinkResponsive
                                        to="tunjangan"
                                        active={location.pathname.startsWith("/tunjangan")}
                                        icon={Dot}
                                        title="Tunjangan"
                                    />
                                    <NavLinkResponsive
                                        to="potongan"
                                        active={location.pathname.startsWith("/potongan")}
                                        icon={Dot}
                                        title="Potongan"
                                    />
                                    <NavLinkResponsive
                                        to="jadwal-kerja"
                                        active={location.pathname.startsWith("/jadwal-kerja")}
                                        icon={Dot}
                                        title="Jadwal Kerja"
                                    /> */}
                                    <NavLinkResponsive
                                        to="office"
                                        active={location.pathname.startsWith("/office")}
                                        icon={Dot}
                                        title="Kantor"
                                    />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    </nav>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default SidebarResponsive