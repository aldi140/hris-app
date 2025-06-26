import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

import Sidebar from "./partials/Sidebar";
import SidebarResponsive from "./partials/SidebarResponsive";
import { useDispatch, useSelector } from "react-redux";
import { dataUser } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
    const { handleLogout } = useAuth()
    const user = useSelector(dataUser)
    const location = useLocation()

    return (
        <>

            <Toaster position="top-center" richColors />
            <div className="flex flex-row w-full min-h-screen">
                <div className="hidden w-1/5 border-r lg:block">
                    <div className="flex flex-col h-full min-h-screen gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 font-bold">
                            <div className="flex flex-col">
                                <div className="logo">
                                    <span className="text-indigo-600">HRIS</span> <span className="text-gray-600">APP</span>
                                </div>
                                <p className="text-xs text-gray-500 font-normal">Smarter HR, Simplified.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            {/* sidebar */}
                            <Sidebar location={location} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-full lg:w-4/5">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6 lg:justify-end">
                        {/* sidebar responsive */}
                        <SidebarResponsive location={location} />
                        {/* dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex gap-x-2">
                                    <span>Hi, {user.name}</span>
                                    <Avatar>
                                        <AvatarFallback>B</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <button onClick={handleLogout} className="w-full text-left">
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="w-full">
                        <div className="gap-4 p-4 lg:gap-6">
                            <Outlet />
                        </div>
                    </main>

                </div>
            </div>
            {/* <Outlet /> */}
        </>
    )
};

export default MainLayout;