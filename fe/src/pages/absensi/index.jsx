import {
    Building,
    CheckCircle,
    CircleArrowDown,
    CircleArrowUp,
    ClockArrowDown,
    ClockArrowUp,
    Pencil
} from "lucide-react"

import HeaderTitle from "../../Components/commons/atoms/HeaderTitle"
import { Card, CardContent, CardHeader } from "../../Components/ui/card"
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

import { useState } from "react"

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
        <div className="flex flex-col w-full ">
            {/* Header */}
            <div className="bg-gradient-to-l from-indigo-400 via-indigo-600 to-indigo-500  relative pt-6 pb-16 px-6 rounded-3xl mb-4">
                <div className="flex flex-col items-start justify-between mb-4 gap-y-4 lg:flex-row lg:items-center ">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-x-1">
                            {/* <Icon className="size-6" /> */}
                            <h1 className="text-2xl font-bold text-white">Absensi</h1>
                        </div>
                        <p className="text-sm font-medium text-white/80">Manage your workforce smarter</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:absolute  lg:left-1/2 transform lg:-translate-x-1/2 w-full lg:px-4">
                    {/* Informasi Jam Masuk, Keluar, dan Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm text-muted-foreground">Jam Masuk</span>
                                    <span className="text-xl font-semibold text-foreground">{jamMasuk}</span>
                                </div>
                                <ClockArrowDown className="size-6 text-green-500" />
                            </CardHeader>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm text-muted-foreground">Jam Keluar</span>
                                    <span className="text-xl font-semibold text-foreground">{jamKeluar}</span>
                                </div>
                                <ClockArrowUp className="size-6 text-red-500" />
                            </CardHeader>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span className="text-xl font-semibold text-foreground">Terlambat</span>
                                </div>
                                <CheckCircle className="size-6 text-yellow-500" />
                            </CardHeader>
                        </Card>
                    </div>


                </div>
            </div>


            {/* Tabel + Kartu Pegawai */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:pt-12">
                <Card className="w-full lg:w-3/4">
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

                <Card className="w-full lg:w-1/3">
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="text-center">
                                <h3 className="font-semibold text-lg">Andi Saputra</h3>
                                <p className="text-sm text-muted-foreground">Frontend Developer - IT</p>
                            </div>

                            <div className="text-center space-y-1">
                                <span className="text-sm text-muted-foreground font-semibold">Jam Kerja</span>
                                <div className="flex justify-center gap-3 text-xl font-semibold text-foreground">
                                    <span>07:30</span>
                                    <span>-</span>
                                    <span>17:00</span>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-2 w-full justify-center">
                                <Button variant="outline" onClick={() => handleAbsensi("checkin")} disabled={loading}>
                                    <CircleArrowDown className="mr-2" /> Check in
                                </Button>
                                <Button variant="outline" onClick={() => handleAbsensi("checkout")} disabled={loading}>
                                    <CircleArrowUp className="mr-2" /> Check out
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
    )
}

export default PageAbsensi
