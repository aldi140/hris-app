import { useSelector } from "react-redux";
import { dataUser } from "../../../features/auth/authSlice";
import { useDepartmen } from "../../../modules/departmen/useDepartmen";
import { useOffice } from "../../../modules/office/useOffice";
import karakterImage from "@/assets/img/karakter-1.png";
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar";
import { ImageURL } from "../../../api";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../Components/ui/button";
import { LucideCalendarArrowUp, LucideClock, LucideScanQrCode, LucideWallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useApiError } from "../../../hooks/useApiError";
import { getDetailAttendance } from "../../../modules/attendance/AttendanceService";
import { toTitleCase } from "../../../lib/utils";
import { IoNotifications } from "react-icons/io5";

const RealtimeClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted =
                String(now.getHours()).padStart(2, "0") +
                ":" +
                String(now.getMinutes()).padStart(2, "0");

            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <p className="font-clock text-2xl font-bold text-white z-10">{time}</p>;
}
const PageHome = () => {
    const user = useSelector(dataUser)
    const handleApiError = useApiError();
    const { departmenList, handleGetDepartmen } = useDepartmen()
    const [data, setData] = useState();
    const [jadwal, setJadwal] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { officeList, handlegetOfficeAll } = useOffice()

    const getDataAttendance = async () => {
        const res = await getDetailAttendance()
        setData(res.data.data)
        setJadwal(res.data.jadwal)
    }

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    getDataAttendance(),
                    handleGetDepartmen(),
                    handlegetOfficeAll(),
                ]);
            } catch (err) {
                handleApiError(err);
            } finally {
                setIsLoading(false)
            }
        }
        loadInitialData()
    }, [])

    const departmenMap = useMemo(() => {
        const data = {};
        departmenList.forEach((item) => {
            data[item.id] = item.nama
        })
        return data
    }, [departmenList])

    const officeMap = useMemo(() => {
        const data = {};
        officeList.forEach((item) => {
            data[item.kedudukan] = item.kantor
        })
        return data
    }, [officeList])

    const getDepartmenName = (id) => departmenMap[id]
    const getOfficeName = (id_kantor) => officeMap[id_kantor]
    const notifCount = 10

    // console.log('data', data)

    return (
        <div className="flex flex-col w-full gap-4">

            {/* Header */}
            <div className="bg-linear-to-r from-emerald-900 to-emerald-700 relative p-4 overflow-hidden">
                <div className="flex flex-col gap-6 ">
                    {/* <Icon className="size-6" /> */}
                    <div className="flex flex-row gap-x-2 justify-between w-full">
                        <div className="flex flex-row items-center gap-4 ">
                            {user?.file_foto
                                ?
                                <Avatar className="w-14 h-14 ">
                                    <AvatarImage src={`${ImageURL}${user?.file_foto}`} alt={user?.name} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                :
                                <div className="p-4 bg-linear-to-r from-emerald-200 to-green-200 rounded-2xl">
                                    <p className="text-green-800 text-sm font-bold">{user?.name?.substring(0, 2).toUpperCase()}</p>
                                </div>

                            }

                            <div className="flex flex-col ">
                                <div className="flex flex-row gap-x-1 items-center">
                                    <span className="text-sm text-emerald-50/70">Selamat Datang </span>
                                    <img src={karakterImage} className="size-7" />
                                </div>

                                <p className="text-xl font-semibold text-white">
                                    {user?.name
                                        ?.toLowerCase()
                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                </p>

                                {/* <div className="flex gap-2">
                                    <div className=" border-white rounded-xl text-center">
                                        <p className="text-xs font-medium text-neutral-300">{getDepartmenName(user?.id_departemen)}</p>
                                    </div>
                                    <div className=" border-white rounded-xl text-center">
                                        <p className="text-xs font-medium text-neutral-300">{getOfficeName(user?.id_kantor)}</p>
                                    </div>
                                </div> */}
                            </div>


                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative z-10">
                                <IoNotifications className="size-5 shrink-0 text-white" />
                                {notifCount > 0 && (
                                    <div className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] text-white font-bold leading-none">
                                            {notifCount > 99 ? '99+' : notifCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <RealtimeClock />
                        </div>
                    </div>
                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl px-6 py-2 z-10">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-white/50">Senin</span>
                                <p className="text-lg font-bold text-white">25 Januari 2025</p>
                            </div>
                            <div className="flex flex-col items-end justify-end">
                                <div className="flex items-center gap-2">

                                    <p className="text-xs  text-white/70">{toTitleCase(getOfficeName(user?.id_kantor))}</p>
                                </div>
                                <p className="text-lg font-semibold text-white">{getDepartmenName(user?.id_departemen)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bg-white/10 w-45 h-45 rounded-full -top-24 transform -right-16 backdrop-blur-sm"></div>
                <div className="absolute bg-white/15 w-25 h-25 rounded-full -top-12 transform -right-8 backdrop-blur-sm"></div>
                <div className="absolute bg-white/5 w-45 h-45 rounded-full -bottom-22 transform -left-11 backdrop-blur-xs"></div>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white">
                <div className="flex flex-row gap-3 items-center">
                    <div className={` w-2 h-2 rounded-full animate-pulse ${!jadwal?.schedule_date
                        ? 'bg-indigo-800 '
                        : !data?.check_in_time
                            ? 'bg-amber-600 '
                            : 'bg-emerald-600'
                        }`}>
                        <div className=" rounde-full"></div>
                    </div>
                    <p className="text-sm text-neutral-700 font-bold">
                        {
                            !jadwal?.schedule_date
                                ? 'Tidak ada jadwal hari ini!'
                                : !data?.check_in_time
                                    ? 'Kamu belum melakukan absen hari ini'
                                    : 'Sudah melakukan absen hari ini'
                        }
                    </p>
                </div>
                <div className={`p-4 ${!jadwal?.schedule_date ? 'bg-indigo-100' : !data?.check_in_time ? 'bg-amber-100' : 'bg-emerald-50'} rounded-md`}>
                    <div className="flex items-center gap-4">
                        {
                            !jadwal?.schedule_date
                                ? null
                                : <LucideScanQrCode className={`size-10 shrink-0 ${!data?.check_in_time ? 'text-amber-600' : 'text-emerald-600'}`} />
                        }
                        <p className="text-sm text-neutral-600">
                            {
                                !jadwal?.schedule_date
                                    ? 'Tidak ada jadwal hari ini, selamat beristirahat!'
                                    : !data?.check_in_time
                                        ? 'Check in untuk memulai absen hari ini'
                                        : 'Jangan lupa check out untuk menyelesaikan absen hari ini'
                            }
                        </p>
                        {
                            !jadwal?.schedule_date
                                ? null
                                : !data?.check_in_time
                                    ? <Button size="md" className="p-4 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700">
                                        <Link to="/attendance">Check In</Link>
                                    </Button>
                                    : <Button size="md" className="p-4 rounded-md bg-red-500 hover:bg-red-500 active:bg-red-700">
                                        <Link to="/attendance">Check Out</Link>
                                    </Button>
                        }

                    </div>
                </div>
            </div>
            <div className="p-4 bg-white">
                <p className="text-sm text-gray-800 font-bold mb-4">Menu</p>
                <div className="grid grid-cols-4 gap-4">
                    <Link to="/attendance" className="flex flex-col gap-2 text-center">
                        <div className="p-3 mx-auto bg-indigo-50 rounded-xl text-indigo-600">
                            <LucideCalendarArrowUp />
                        </div>
                        <p className="text-xs text-gray-600 ">Absensi</p>
                    </Link>
                    {/* <Link to="/leave" className="flex flex-col gap-2 text-center">
                        <div className="p-3 mx-auto bg-purple-50 rounded-xl text-purple-600">
                            <LucideCloudSun />
                        </div>
                        <p className="text-xs text-gray-600 ">Cuti</p>
                    </Link> */}
                    <Link to="/permission" className="flex flex-col gap-2 text-center">
                        <div className="p-3 mx-auto bg-orange-50 rounded-xl text-orange-600">
                            <LucideClock />
                        </div>
                        <p className="text-xs text-gray-600 ">Pengajuan Izin</p>
                    </Link>
                    <Link to="/salary" className="flex flex-col gap-2 text-center">
                        <div className="p-3 mx-auto bg-rose-50 rounded-xl text-rose-600">
                            <LucideWallet />
                        </div>
                        <p className="text-xs text-gray-600 ">Slip Gaji</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default PageHome