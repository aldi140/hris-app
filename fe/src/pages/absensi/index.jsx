import {
    Building,
    CheckCircle,
    CircleArrowDown,
    CircleArrowUp,
    ClockArrowDown,
    ClockArrowUp,
    Link,
    Pencil
} from "lucide-react"

import HeaderTitle from "../../Components/commons/atoms/HeaderTitle"
import { FiArrowLeft } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardHeader } from "../../Components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../Components/ui/table"
import { Button } from "../../Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"

import { useEffect, useState } from "react"


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

    return <p className="text-md font-medium text-white/80">{time}</p>;
}

const PageAbsensi = () => {
    const [status, setStatus] = useState("")
    const [jamMasuk, setJamMasuk] = useState("-")
    const [jamKeluar, setJamKeluar] = useState("-")
    const [loading, setLoading] = useState(false)

    const kantor = {
        latitude: -6.1374464,
        longitude: 106.8990464,
        radiusMeter: 10
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
            (pos) => {
                const { latitude, longitude } = pos.coords
                const jarak = Math.floor(hitungJarak(
                    latitude,
                    longitude,
                    kantor.latitude,
                    kantor.longitude
                ))

                console.log('lat current', latitude);
                console.log('lng current', longitude);
                console.log('lat kantor', kantor.latitude);
                console.log('long kantor', kantor.longitude);
                console.log('jarak', jarak)
                if (jarak > kantor.radiusMeter) {
                    setStatus("🚫 Kamu di luar area kantor!")
                } else {
                    const waktu = new Date().toLocaleTimeString()
                    if (tipe === "checkin") {
                        setJamMasuk(waktu)
                    } else {
                        setJamKeluar(waktu)
                    }
                    setStatus(`✅ ${tipe === "checkin" ? "Check-in" : "Check-out"} berhasil pukul ${waktu}`)
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
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col w-full gap-16">

                {/* Header */}
                <div className="bg-gradient-to-l from-green-800 via-green-900 to-green-800 relative pt-6 pb-24 lg:pb-34 px-6 rounded-b-4xl mb-4">
                    <div className="flex flex-col items-start justify-between mb-4 gap-y-4 lg:flex-row lg:items-center ">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col gap-3 ">
                                {/* <Icon className="size-6" /> */}
                                <div className="flex flex-row gap-x-2 justify-between w-full">
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <a href="/" className="text-emerald-200"><FiArrowLeft className="size-5" /></a>
                                        <p className="text-md font-normal text-emerald-100"> Kembali</p>

                                    </div>
                                    <RealtimeClock />

                                </div>
                                <div className="flex flex-row gap-x-2  w-full">
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <p className="text-xl font-medium text-emerald-100"> Selamat Datang</p>
                                        <img src="/assets/img/karakter-1.png" className="size-12" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 justify-between w-full items-center">
                                    <div className="flex flex-col gap-x-1">
                                        <h3 className="text-2xl font-bold text-white">John Doe</h3>
                                        <p className="text-sm font-medium text-emerald-200">Frontend Developer - IT</p>
                                    </div>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:absolute  lg:left-1/2 transform lg:-translate-x-1/2 w-full lg:px-4 mb-4">
                        {/* Informasi Jam Masuk, Keluar, dan Status */}
                        <div className="grid grid-cols-1 gap-4">

                            {/* keterangan */}
                            <div className="grid grid-cols-3 gap-3">
                                <Card className="bg-white/10 shadow-sm py-2 px-3 gap-2">
                                    <CardHeader className="flex flex-row justify-between items-center px-0">
                                        <span className="text-[12px] text-white/70">
                                            Jam Masuk</span>
                                    </CardHeader>
                                    <CardDescription>
                                        <span className="text-md font-semibold text-white">10:00</span>
                                    </CardDescription>

                                </Card>
                                <Card className="bg-white/10 shadow-sm py-2 px-3 gap-2">
                                    <CardHeader className="flex flex-row justify-between items-center px-0">
                                        <span className="text-[12px] text-white/70">

                                            Jam Keluar</span>


                                    </CardHeader>
                                    <CardDescription>
                                        <span className="text-md font-semibold text-white">17:00</span>
                                    </CardDescription>

                                </Card>
                                <Card className="bg-white/10 shadow-sm py-2 px-3 gap-2">
                                    <CardHeader className="flex flex-row justify-between items-center px-0">
                                        <span className="text-[12px] text-white/70">

                                            Status</span>


                                    </CardHeader>
                                    <CardDescription>
                                        <span className="text-md font-semibold text-white">10:00</span>
                                    </CardDescription>

                                </Card>

                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Card className="w-full shadow-2xl py-3 bg-white/40 backdrop-blur-lg border border-white/30  rounded-2xl absolute left-1/2 transform -translate-x-1/2 -bottom-44 lg:-bottom-54">
                            <CardContent className="space-y-4">
                                <div className="flex felx-row justify-between">
                                    <span className="text-xs font-extralight text-white/70">Jam Kerja</span>
                                    <span className="text-xs font-extralight text-white/70">Kamis, 28 Jan 2023</span>
                                </div>
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-center gap-3">
                                            <p className="text-white font-bold text-2xl">
                                                07:30 - 17:00
                                            </p>


                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-2 w-full justify-center">
                                        <Button variant="outlineGreen" onClick={() => handleAbsensi("checkin")} disabled={loading}>
                                            <CircleArrowDown /> Check in
                                        </Button>
                                        <Button variant="red" onClick={() => handleAbsensi("checkout")} disabled={loading}>
                                            <CircleArrowUp /> Check out
                                        </Button>
                                    </div>

                                    {status && (
                                        <p className="text-sm text-muted-foreground text-center">{status}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>


                {/* Tabel */}
                <div className="flex flex-col  gap-4 lg:pt-12 p-4">
                    <p className="text-xl font-semibold text-black/80">History</p>
                    <Card className="w-full ">
                        <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead className="text-center">Jam Masuk</TableHead>
                                        <TableHead className="text-center">Jam Keluar</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell className="text-center">09:00</TableCell>
                                        <TableCell className="text-center">17:00</TableCell>
                                        <TableCell className="text-center">Hadir</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default PageAbsensi
