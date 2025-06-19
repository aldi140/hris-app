import { Building, CalendarArrowUp, History, LayoutDashboard, PanelsLeftBottom } from "lucide-react";
import { Button } from "../../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"

import * as VisuallHidden from '@radix-ui/react-visually-hidden'
import NavLinkResponsive from "../../commons/atoms/NavLinkResponsive"
const SidebarResponsive = ({ location }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='shrink-0 md:hidden'>
                    <PanelsLeftBottom className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col max-h-screen overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        <VisuallHidden.Root>Sidebar Responsive</VisuallHidden.Root>
                    </SheetTitle>
                    <SheetDescription>
                        <VisuallHidden.Root>Sidebar Responsive</VisuallHidden.Root>
                    </SheetDescription>
                </SheetHeader>

                {/* menu sidebar responsive */}
                <nav className="grid gap-6 text-lg font-medium">
                    <div className="px-3 font-semibold text-foreground">
                        <span className="text-indigo-600">HRIS</span><span className="text-gray-600">APP</span>
                        <p className="text-xs text-gray-500 font-normal">Smarter HR, Simplified.</p>
                    </div>
                    <nav className="gird items-start px-3 text-sm font-semibold lg:px-4">
                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                        <NavLinkResponsive to="/" active={location.pathname === "/"} title="Dashboard" icon={LayoutDashboard} />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Absensi & Kehadiran</div>
                        <NavLinkResponsive to="#" title="Absensi" icon={CalendarArrowUp} />
                        <NavLinkResponsive to="#" title="Riwayat Kehadiran" icon={History} />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Cuti & Izin</div>
                        <NavLinkResponsive to="#" title="Pengajuan Cuti/Izin" icon={LayoutDashboard} />
                        <NavLinkResponsive to="#" title="Riwayat Pengajuan" icon={LayoutDashboard} />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Departmen</div>
                        <NavLinkResponsive to="/departmen" active={location.pathname === "/departmen"} title="Departmen" icon={Building} />
                    </nav>
                </nav>


            </SheetContent>
        </Sheet>
    )
}

export default SidebarResponsive