import { LucideChevronRight } from "lucide-react"
import PageHeader from "../../../Components/commons/moleculs/PageHeader"
import { Button } from "../../../Components/ui/button"
import { Card, CardContent } from "../../../Components/ui/card"
import { FcLeave, FcPlanner, FcPlus, FcBriefcase, FcDislike, FcOvertime } from "react-icons/fc";
import { ImAidKit } from "react-icons/im";
import ComingSoon from "../../comingSoon"
import { Link } from "react-router-dom";


const PagePermission = ({ title }) => {
    return (
        <div>
            <PageHeader title={title} backTo="/home" />
            <div className="pt-18 px-4 flex flex-col gap-2 ">
                <h5 className="text-md text-neutral-800 font-semibold">Ingin mengajukan izin apa hari ini ?</h5>
                <Link to="/permission/sick">
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent>
                            <div className="flex gap-4 items-center">
                                <ImAidKit size={40} className="shrink-0 text-red-600" />
                                <div className="flex flex-col ">
                                    <h1 className="text-md text-neutral-700 font-bold">Izin Sakit</h1>
                                    <p className="text-sm text-neutral-600">Laporkan & ajukan izin sakit dengan cepat.</p>
                                </div>
                                <div
                                    className="bg-emerald-50 border border-emerald-100 text-emerald-600 
               rounded-md p-2 flex items-center justify-center"
                                >
                                    <LucideChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link to="/permission/absent">
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent>
                            <div className="flex gap-4 items-center">
                                <FcPlanner size={40} className="shrink-0" />
                                <div className="flex flex-col">
                                    <h1 className="text-md text-neutral-700 font-bold"> Izin Absen </h1>
                                    <p className="text-sm text-neutral-600">Ajukan izin tidak hadir dengan alasan yang jelas.</p>
                                </div>
                                <div
                                    className="bg-emerald-50 border border-emerald-100 text-emerald-600 
               rounded-md p-2 flex items-center justify-center"
                                >
                                    <LucideChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link to="/permission/leave">
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent>
                            <div className="flex gap-4 items-center">
                                <FcOvertime size={40} className="shrink-0" />
                                {/* <img src="" alt="p" className="w-14 h-14 shrink-0 object-contain animate-float" /> */}
                                <div className="flex flex-col">
                                    <h1 className="text-md text-neutral-700 font-bold"> Izin Cuti</h1>
                                    <p className="text-sm text-neutral-600">Ajukan & pantau sisa cuti tahunanmu</p>
                                </div>
                                <div
                                    className="bg-emerald-50 border border-emerald-100 text-emerald-600 
               rounded-md p-2 flex items-center justify-center"
                                >
                                    <LucideChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

            </div>
        </div>
    )
}

export default PagePermission