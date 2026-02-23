import { useSelector } from "react-redux";
import { dataUser } from "../../../features/auth/authSlice";
import { useDepartmen } from "../../../modules/departmen/useDepartmen";
import { useOffice } from "../../../modules/office/useOffice";
import QrCodeImg from "@/assets/img/qr-code.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar";
import { ImageURL } from "../../../api";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../Components/ui/button";
import { LucideCalendarArrowUp, LucideCircleAlert, LucideClock, LucideCloudSun, LucideScanQrCode, LucideWallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useApiError } from "../../../hooks/useApiError";
import { getDetailAttendance } from "../../../modules/attendance/AttendanceService";

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

    return <p className="text-md font-medium text-white">{time}</p>;
}
const PageHome = () => {
    const user = useSelector(dataUser)
    const handleApiError = useApiError();
    const { departmenList, handleGetDepartmen } = useDepartmen()
    const [data, setData] = useState();
    const [jadwal, setJadwal] = useState();
    const { officeList, handlegetOfficeAll } = useOffice()

    const getDataAttendance = async () => {
        const res = await getDetailAttendance()
        setData(res.data.data)
        setJadwal(res.data.jadwal)
    }

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([
                    getDataAttendance(),
                    handleGetDepartmen(),
                    handlegetOfficeAll(),
                ]);
            } catch (err) {
                handleApiError(err);
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

    // console.log('data', data)

    return (
        <div className="w-full lg:max-w-2xl mx-auto relative">
            <div className="flex flex-col w-full gap-4">

                {/* Header */}
                <div className="bg-linear-to-r from-green-900 to-teal-700 relative p-4 rounded-b-4xl  overflow-hidden">
                    <div className="flex flex-col gap-3 ">
                        {/* <Icon className="size-6" /> */}
                        <div className="flex flex-row gap-x-2 justify-between w-full">
                            <div className="flex flex-row items-center gap-4 ">
                                {user?.file_foto
                                    ?
                                    <Avatar className="w-8 h-8 ">
                                        <AvatarImage src={`${ImageURL}${user?.file_foto}`} alt={user?.name} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    :
                                    <div className="p-4 bg-linear-to-r from-emerald-200 to-green-200 rounded-2xl">
                                        <p className="text-green-800 text-sm font-bold">{user?.name?.substring(0, 2).toUpperCase()}</p>
                                    </div>

                                }

                                <div className="flex flex-col gap-1">
                                    <h3 className="text-md font-bold text-white">
                                        Halo,  {user?.name
                                            ?.toLowerCase()
                                            .replace(/\b\w/g, (char) => char.toUpperCase())}

                                    </h3>

                                    <div className="flex gap-2">
                                        <div className=" border-white rounded-xl text-center">
                                            <p className="text-xs font-medium text-neutral-300">{getDepartmenName(user?.id_departemen)}</p>
                                        </div>
                                        <div className=" border-white rounded-xl text-center">
                                            <p className="text-xs font-medium text-neutral-300">{getOfficeName(user?.id_kantor)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <RealtimeClock />
                        </div>

                    </div>

                    <div className="absolute bg-green-100/20 w-45 h-43 rounded-full -top-22 transform -right-20  animate-scaleFade z-20"></div>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white">
                    <div className="flex flex-row gap-3 items-center">
                        <div className={`p-2 rounded-full ${!jadwal?.schedule_date
                            ? 'bg-indigo-100 text-indigo-600'
                            : !data?.check_in_time
                                ? 'bg-amber-100 text-amber-600'
                                : 'bg-emerald-100 text-emerald-600'
                            }`}>
                            <LucideCircleAlert size={18} />
                        </div>
                        <p className="text-sm text-neutral-700 font-bold">
                            {
                                !jadwal?.schedule_date
                                    ? 'Tidak ada jadwal hari ini!'
                                    : !data?.check_in_time
                                        ? 'Kamu belum melakukan absen hari ini'
                                        : 'Jangan lupa checkout hari ini!'
                            }
                        </p>
                    </div>
                    <div className={`p-4 ${!jadwal?.schedule_date ? 'bg-indigo-100' : !data?.check_in_time ? 'bg-amber-100' : 'bg-emerald-50'} rounded-md`}>
                        <div className="flex items-center gap-4">
                            {
                                !jadwal?.schedule_date
                                    ? null
                                    : <LucideScanQrCode className={`size-14 ${!data?.check_in_time ? 'text-amber-600' : 'text-emerald-600'}`} />
                            }
                            <p className="text-sm text-neutral-700">
                                {
                                    !jadwal?.schedule_date
                                        ? 'Tidak ada jadwal hari ini, selamat beristirahat!'
                                        : !data?.check_in_time
                                            ? 'Check in untuk memulai absen hari ini'
                                            : 'Check out untuk menyelesaikan absen hari ini'
                                }
                            </p>
                            {
                                !jadwal?.schedule_date
                                    ? null
                                    : !data?.check_in_time
                                        ? <Button size="md" className="p-4 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700">
                                            <Link to="/attendance">Check In</Link>
                                        </Button>
                                        : <Button size="md" className="p-4 rounded-md bg-red-600 hover:bg-red-500 active:bg-red-700">
                                            <Link to="/attendance">Check Out</Link>
                                        </Button>
                            }

                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <p className="text-sm text-neutral-700 font-bold mb-4">Sedang Cari Apa ?</p>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2 text-center">
                            <div className="p-4 mx-auto bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-xl text-white">
                                <LucideCalendarArrowUp />
                            </div>
                            <p className="text-sm text-neutral-600 font-bold">Absensi</p>
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <div className="p-4 mx-auto bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-xl text-white">
                                <LucideCloudSun />
                            </div>
                            <p className="text-sm text-neutral-600 font-bold">Cuti</p>
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <div className="p-4 mx-auto bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-xl text-white">
                                <LucideClock />
                            </div>
                            <p className="text-sm text-neutral-600 font-bold">Izin</p>
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <div className="p-4 mx-auto bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-xl text-white">
                                <LucideWallet />
                            </div>
                            <p className="text-sm text-neutral-600 font-bold">Slip Gaji</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHome