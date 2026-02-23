import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";

import Sidebar from "./partials/Sidebar";
import SidebarResponsive from "./partials/SidebarResponsive";
import { useSelector } from "react-redux";
import { dataUser } from "../../../features/auth/authSlice";
import { useAuth } from "../../../hooks/useAuth";
import { ArrowLeftToLine, Bell } from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
    const { handleLogout } = useAuth()
    const user = useSelector(dataUser)
    const location = useLocation()
    const [minMaxSize, setMinMaxSize] = useState(true)
    const hasNotification = true;
    return (
        <>

            <Toaster position="top-center" richColors />
            <div className="flex flex-row w-full min-h-screen">
                <div className={`hidden ${minMaxSize ? "w-1/5" : "w-16"} border-r lg:block transition-all ease-in-out duration-500 overflow-hidden`}>
                    <div className="flex flex-col h-full min-h-screen gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 font-bold relative">
                            <div
                                className={`absolute transition-all duration-1000 ease-in-out flex flex-col transform
                                                ${minMaxSize ? 'opacity-100 visible translate-x-0 delay-100' : 'opacity-0 invisible translate-x-32 w-full overflow-hidden'} 
                                            `}
                            >
                                <div className="logo w-full">
                                    <span className="text-indigo-600">HRIS</span>{' '}
                                    <span className="text-gray-600">APP</span>
                                </div>
                                <p className="text-xs text-gray-500 font-normal">
                                    Smarter HR, Simplified.
                                </p>
                            </div>


                            {/* Short Logo - H */}
                            <div
                                className={`absolute transition-all duration-1000 ease-in-out logo text-indigo-600 text-lg transform
                                    ${minMaxSize ? 'opacity-0 invisible -translate-x-5' : 'opacity-100 visible translate-x-0'}
                                `}
                            >
                                H
                            </div>

                        </div>



                        <div className="flex-1">
                            {/* sidebar */}
                            <Sidebar location={location} minMaxSize={minMaxSize} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-full lg:w-4/5">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6 lg:justify-between">
                        {/* sidebar responsive */}
                        <SidebarResponsive location={location} />
                        <div className="w-full flex items-center justify-end lg:justify-between">
                            <Button variant="ghost" className="hidden lg:block" onClick={() => setMinMaxSize((prev) => !prev)}><ArrowLeftToLine /></Button>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative flex gap-x-2">
                                            <Bell />
                                            {hasNotification && (
                                                <span className="absolute top-2 right-3 h-2 w-2 rounded-full bg-red-500" />
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link to="/notifications" className="w-full text-left">
                                                View all
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                            </div>
                        </div>
                        {/* dropdown */}

                    </header>
                    <main className="w-full min-h-screen bg-slate-100 p-4 lg:p-8 ">
                        <div className="gap-4 lg:gap-6 ">
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