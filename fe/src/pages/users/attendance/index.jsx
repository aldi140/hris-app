import {
    CircleArrowDown,
    CircleArrowUp,
} from "lucide-react"

import { FiArrowLeft } from "react-icons/fi";
import { Card, CardContent } from "../../../Components/ui/card"

import { Button } from "../../../Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar"

import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { dataUser } from "../../../features/auth/authSlice";
import { differenceMinutes, formatDate, formatTime } from "../../../lib/utils";
import { useDepartmen } from "../../../modules/departmen/useDepartmen";
import { ImageURL } from "../../../api";
import { HiArrowDownCircle, HiArrowUpCircle } from "react-icons/hi2";
import karakterImage from "@/assets/img/karakter-1.png";
import { Badge } from "../../../Components/ui/badge";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useOffice } from "../../../modules/office/useOffice";
import { checkin, chekout, getDetailAttendance } from "../../../modules/attendance/AttendanceService";


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

const PageAttendance = ({ title }) => {
    usePageTitle(title)


    const user = useSelector(dataUser)
    const [status, setStatus] = useState("")
    // const [jamMasuk, setJamMasuk] = useState(null)
    // const [jamKeluar, setJamKeluar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState();
    const [jadwal, setJadwal] = useState();

    const { departmenList, handleGetDepartmen } = useDepartmen()
    const { officeList, handlegetOfficeAll } = useOffice()

    const getDataAttendance = async () => {
        const res = await getDetailAttendance()
        setData(res.data.data)
        setJadwal(res.data.jadwal)

    }
    // console.log('data', data)
    // console.log('jadwal', jadwal)
    const time_diff = data
        ? differenceMinutes(data.schedule_in_time, data.check_in_time)
        : null;
    // console.log('time_diff', time_diff)

    useEffect(() => {
        getDataAttendance()
    }, [])

    useEffect(() => {
        handleGetDepartmen()
    }, []);

    useEffect(() => {
        handlegetOfficeAll()
    }, []);


    const getDepartmentName = (id_departemen) => departmenList.find(item => item.id === id_departemen)?.nama
    const getOfficeName = (id_kantor) => officeList.find(item => item.kedudukan === id_kantor)?.kantor


    // const kantor = {
    //     latitude: -6.230547443036223,
    //     longitude: 106.92474987227146,
    //     radiusMeter: 10
    // }

    const kantor = {
        latitude: -6.1328914999999835,
        longitude: 106.90501922883593,
        // radiusMeter: 10
    }

    const hitungJarak = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3
        const toRad = (x) => (x * Math.PI) / 180
        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    const handleAbsensi = (tipe) => {
        setLoading(true)
        if (!navigator.geolocation) {
            setStatus("Browser tidak mendukung geolocation")
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords
                const jarak = Math.floor(hitungJarak(
                    latitude,
                    longitude,
                    kantor.latitude,
                    kantor.longitude
                ))

                // console.log('lat current', latitude);
                // console.log('lng current', longitude);
                // console.log('lat kantor', kantor.latitude);
                // console.log('long kantor', kantor.longitude);
                // console.log('jarak', jarak)
                // if (jarak > kantor.radiusMeter) {
                //     toast.error("Kamu di luar area kantor!");
                //     // setStatus("Kamu di luar area kantor!")
                // } else {
                //     const waktu = new Date().toLocaleTimeString()
                //     let payload = {}

                //     if (tipe === "checkin") {
                //         payload = {
                //             id_karyawan: user.id_karyawan,
                //             check_in_latitude: latitude,
                //             check_in_longitude: longitude,
                //         }
                //         setJamMasuk(waktu)
                //         try {
                //             const response = await checkin({
                //                 id_karyawan: user.id_karyawan,
                //                 check_in_latitude: latitude,
                //                 check_in_longitude: longitude
                //             })
                //             console.log(response)
                //             // setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)
                //             toast.success(response.data.message)
                //         } catch (error) {
                //             console.log(error)
                //             toast.error(response.data.message)
                //         }
                //     } else {
                //         setJamKeluar(waktu)
                //         setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)

                //     }
                // }
                const waktu = new Date().toLocaleTimeString()
                let payload = {}

                if (tipe === "checkin") {
                    // setJamMasuk(formatTime(waktu))
                    try {
                        const response = await checkin({
                            id_karyawan: user.id_karyawan,
                            check_in_latitude: latitude,
                            check_in_longitude: longitude
                        })
                        // console.log(response)
                        // setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)
                        if (response.data.status === true) {
                            toast.success(response.data.message)
                        } else {
                            toast.error(response.data.message)
                        }
                    } catch (error) {
                        // console.log(error)
                        toast.error(response.data.message)
                    }
                } else {
                    // setJamKeluar(formatTime(waktu))
                    try {
                        const response = await chekout({
                            id_karyawan: user.id_karyawan,
                            check_in_latitude: latitude,
                            check_in_longitude: longitude
                        })
                        // console.log(response)
                        // setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)
                        if (response.data.status === true) {
                            toast.success(response.data.message)
                        } else {
                            toast.error(response.data.message)
                        }
                    } catch (error) {
                        // console.log(error)
                        toast.error(response.data.message)
                    }
                    // setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)

                }



                setLoading(false)
            },
            (err) => {
                setStatus("❗ Gagal mengambil lokasi. Aktifkan GPS.")
                setLoading(false)
            }
        )
    }

    return (

        <div className="w-full lg:max-w-2xl mx-auto relative">
            <div className="absolute w-full lg:min-w-xl top-1/5 lg:top-1/4 left-1/2 transform z-20 -translate-x-1/2 px-6">
                <Card className=" shadow-2xl py-3 bg-white/40 backdrop-blur-lg border border-white/30 ">
                    <CardContent className="space-y-4">
                        <div className="flex felx-row justify-between">
                            <span className="text-xs font-extralight text-white">Jam Kerja</span>
                            <span className="text-xs font-extralight text-white">{formatDate(jadwal?.schedule_date)}</span>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-center gap-3">
                                    <p className="text-emerald-900 font-bold text-2xl">
                                        {formatTime(jadwal ? jadwal.shift?.start_time : "--:--")} - {formatTime(jadwal ? jadwal.shift?.end_time : "--:--")}
                                    </p>


                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-2 w-full justify-center">
                                {data?.check_in_time
                                    ?
                                    <Button variant="outlineRed" onClick={() => handleAbsensi("checkout")} disabled={loading}>
                                        <CircleArrowUp /> Check out
                                    </Button>
                                    :
                                    <Button className="bg-linear-to-r/srgb from-green-700 to-teal-500 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-400 transition ease-in-out duration-300" onClick={() => handleAbsensi("checkin")} disabled={loading}>
                                        <CircleArrowDown /> Check in
                                    </Button>
                                }


                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Toaster position="top-center" richColors />

            <div className="flex flex-col w-full gap-16 ">

                {/* Header */}
                <div className="bg-linear-to-r from-green-900 to-teal-700 relative pt-4 pb-16 lg:pb-24 px-6 rounded-b-xl mb-4 overflow-hidden">
                    <div className="flex flex-col items-start justify-between mb-4 gap-y-4 lg:flex-row lg:items-center ">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col gap-3 ">
                                {/* <Icon className="size-6" /> */}
                                <div className="flex flex-row gap-x-2 justify-between w-full">
                                    <div className="flex flex-row gap-x-2 items-center">

                                        <p className="text-md text-emerald-100 font-bold">Absensi</p>

                                    </div>
                                    <RealtimeClock />

                                </div>
                                <div className="flex flex-col w-full mb-3">

                                    <p className="text-xs font-medium text-emerald-100">Jangan lupa catat kehadiranmu hari ini.</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="absolute bg-green-100/20 w-52 h-48 rounded-full -top-22 transform -right-20  animate-scaleFade z-20"></div>

                    {/* <div className="relative">

                    </div> */}
                </div>


                {/* Tabel */}
                <div className="flex flex-col gap-4 lg:pt-12  px-4">
                    <p className="text-sm font-semibold text-neutral-700">Histori absensi hari ini</p>
                    <Card className="w-full">
                        <CardContent >
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="p-4 bg-emerald-50 rounded-2xl">
                                        <HiArrowDownCircle className="text-2xl text-green-800" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-neutral-700">Check In</p>
                                        <p className="text-xs  text-neutral-400">{formatDate(data?.tgl_absensi)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-end">
                                    <p className="text-sm font-semibold text-neutral-700">{data?.check_in_time ? formatTime(data?.check_in_time) : "--:--"}</p>
                                    <div className="flex flex-row gap-2">
                                        {data?.check_in_time ? (
                                            <Badge variant="secondary">Masuk</Badge>
                                        ) :
                                            <Badge variant="yellow">Belum Check In</Badge>}
                                        {time_diff !== null ? (
                                            time_diff > 0 ? (
                                                <Badge variant="redSecondary">Terlambat</Badge>
                                            ) : time_diff < 0 ? (
                                                <Badge variant="blueSecondary">Lebih Awal</Badge>
                                            ) : (
                                                <Badge variant="greenSecondary">Tepat Waktu</Badge>
                                            )
                                        ) : null}

                                    </div>

                                </div>
                            </div>

                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardContent >
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="p-4 bg-red-50 rounded-2xl">
                                        <HiArrowUpCircle className="text-2xl text-red-800" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-neutral-800">Check Out</p>
                                        <p className="text-xs  text-neutral-400">{formatDate(data?.tgl_absensi)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-center">
                                    <p className="text-sm font-semibold text-neutral-800">{data?.check_out_time ? formatTime(data?.check_out_time) : "--:--"}</p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                </div>

            </div>
        </div>
    )
}

export default PageAttendance
