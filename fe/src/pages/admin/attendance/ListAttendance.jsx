import { useEffect, useMemo, useState } from "react";
import { useAttendance } from "../../../hooks/useAttendance";
import { usePageTitle } from "../../../hooks/usePageTitle"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { HiOutlineDocumentReport } from "react-icons/hi";

import { differenceMinutes, formatDate, formatTime, locationMapUrl } from "../../../lib/utils";
import { Badge } from "../../../Components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group";
import { CalendarIcon, ChevronDown, LucideListFilter, LucideMapPin, LucideX, SearchIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover";
import { Button } from "../../../Components/ui/button";
import { useFormik } from "formik";
import * as yup from 'yup'
import { Field, FieldContent, FieldGroup } from "../../../Components/ui/field";
import { Label } from "../../../Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";
import { useDepartmen } from "../../../hooks/useDepartmen";
import { useOffice } from "../../../hooks/useOffice";
import Paginations from "../../../Components/commons/moleculs/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar";
import { HiOutlineChartBar, HiOutlineUsers } from "react-icons/hi2";
import { Skeleton } from "../../../Components/ui/skeleton";
import noDataImg from "@/assets/img/no_data.svg";
import { useFilters } from "../../../hooks/useFilters";
import { FILTER_CONFIG } from "../../../constants/filterConfig";
import { Calendar } from "../../../Components/ui/calendar";
import { ImageURL } from "../../../api";
import { format } from "date-fns"



const ListAttendance = ({ title }) => {
    usePageTitle(title)

    const initialFilterUI = {
        id_departemen: "",
        id_kantor: "",
    };
    const {
        filterUI,
        appliedFilter,
        setFilter,
        applyFilters,
        resetFilters,
        removeFilter,
        serializedFilters,
    } = useFilters(initialFilterUI);
    const [search, setSearch] = useState('');
    const [tglAbsen, setTglAbsen] = useState(new Date());

    const { departmenList, handleGetDepartmen } = useDepartmen()
    const { officeList, handlegetOfficeAll } = useOffice();

    const { listAttendances, isLoading, error, page, setPage, lastPage, totalData, handleGetAttendance } = useAttendance();

    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetAttendance({
                search, filter: serializedFilters, tgl_absen: tglAbsen
                    ? format(tglAbsen, "yyyy-MM-dd")
                    : null, page
            });
        }, 500);
        return () => clearTimeout(delay);
    }, [search, serializedFilters, tglAbsen, page]);

    useEffect(() => {
        handleGetDepartmen();
    }, []);

    useEffect(() => {
        handlegetOfficeAll();
    }, []);


    const getDepartmenName = (id) => {
        const departmen = departmenList.find((departmen) => departmen.id === id);
        return departmen ? departmen.nama : null;
    };

    const getOfficeName = (id) => {
        const office = officeList.find((office) => office.kedudukan === id);
        return office ? office.kantor : null;
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const helpers = useMemo(() => ({
        getDepartmenName,
        getOfficeName,
    }), [departmenList, officeList]);



    // console.log('filter ui,', filterUI)

    return (
        <div className="flex flex-col w-full pb-32 gap-4">
            <HeaderTitle title="Absensi" subtitle="Menampilkan semua data absensi yang tersedia pada platform ini" />
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
                <Card className="lg:col-span-3 py-4">
                    <CardHeader className="flex flex-row items-center gap-x-2">
                        <HiOutlineDocumentReport size={16} color="#2563EB" />
                        <CardTitle className="text-neutral-700 text-sm font-semibold">Laporan Hari ini.</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center justify-between gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Tepat Waktu</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Terlambat</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Lebih Awal</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-4 py-4">
                    <CardHeader className="flex flex-row items-center gap-x-2">
                        <HiOutlineUsers size={16} color="#2563EB" />
                        <CardTitle className="text-neutral-700 text-sm font-semibold">Kehadiran.</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center justify-between gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Hadir</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Izin</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Sakit</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Alpha</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 py-4">
                    <CardHeader className="flex flex-row items-center gap-x-2">
                        <HiOutlineChartBar size={16} color="#2563EB" />
                        <CardTitle className="text-neutral-700 text-sm font-semibold">Performa Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center justify-between gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Tepat Waktu</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                            <div className="border-r border-neutral-200 self-stretch"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-neutral-500 font-medium">Terlambat</p>
                                <p className="text-xl text-neutral-700 font-semibold">120</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-6 lg:grid-cols-10 gap-2 items-start">
                <InputGroup className="col-span-6 lg:col-span-3 bg-white">
                    <InputGroupInput placeholder="Search..." onChange={handleSearch} value={search} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
                <div className="col-span-4 lg:col-span-2">
                    <Popover >
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="w-full justify-between text-left font-normal text-muted-foreground"

                            >
                                {tglAbsen
                                    ? format(tglAbsen, "dd MMM yyyy")
                                    : "Tanggal Absensi"}
                                <CalendarIcon className="mr-2 h-4 w-4" />

                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={tglAbsen}
                                onSelect={(tgl) => {
                                    if (tgl) setTglAbsen(tgl)
                                }}
                                disabled={(tgl) =>
                                    tgl > new Date() || tgl < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="col-span-2 lg:col-span-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="text-neutral-500 bg-neutral-50 ">
                                <LucideListFilter />  Filter <ChevronDown />
                            </Button>
                        </PopoverTrigger>
                        {/* title filters */}
                        <PopoverContent align="start" className="w-64 flex flex-col gap-2">
                            <div className="flex flex-col ">
                                <p className="text-sm font-semibold">Filter</p>
                                <p className="text-sm text-muted-foreground">Pilih jenis filters</p>
                            </div>
                            <hr />
                            <FieldGroup className="max-w-sm gap-2">
                                {/* <RadioGroup defaultValue="comfortable" className="w-fit">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="default" id="r1" />
                                        <Label htmlFor="r1">Laki-Laki</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="comfortable" id="r2" />
                                        <Label htmlFor="r2">Perempuan</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact" id="r3" />
                                        <Label htmlFor="r3">Semua</Label>
                                    </div>
                                </RadioGroup>
                                <hr /> */}


                                <Field orientation="vertical">
                                    <FieldContent>
                                        <Label htmlFor="id_departemen" className="text-muted-foreground ">Departmen</Label>
                                        <Select
                                            value={filterUI.id_departemen}
                                            onValueChange={(v) => setFilter("id_departemen", v)}
                                        >
                                            <SelectTrigger className="w-full" id="id_departemen">
                                                <SelectValue placeholder="Pilih Departmen" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departmenList.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>{item.nama}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldContent>
                                </Field>
                                <hr />

                                <Field orientation="vertical">
                                    <FieldContent>
                                        <Label htmlFor="id_kantor" className="text-muted-foreground ">Cabang/Unit</Label>
                                        <Select
                                            value={filterUI.id_kantor}
                                            onValueChange={(v) => setFilter("id_kantor", v)}
                                        >
                                            <SelectTrigger className="w-full" id="id_kantor">
                                                <SelectValue placeholder="Pilih Kantor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {officeList.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.kedudukan)}>{item.kantor}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldContent>
                                </Field>
                                <hr />

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        size="sm"
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        className="flex-1"
                                        variant="blue"
                                        size="sm"
                                        onClick={applyFilters}
                                    >
                                        Terapkan
                                    </Button>
                                </div>


                            </FieldGroup>
                        </PopoverContent>
                    </Popover>
                    {/* jika ada filter */}

                </div>
            </div>
            {Object.keys(appliedFilter).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center gap-2 px-3 py-1 border rounded-md bg-neutral-50">
                        <p className="text-sm font-semibold">Filter:</p>
                        <div className="w-4 h-4 rounded-full bg-red-500 text-white text-center"><p className="text-xs">{Object.keys(appliedFilter).length}</p></div>
                    </div>
                    {Object.entries(appliedFilter).map(([key, value]) => {
                        const config = FILTER_CONFIG[key]
                        const label = config?.label || key
                        const format = config.format ? config.format(value, helpers) : value
                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 px-3 py-1 border rounded-md bg-neutral-50"
                            >
                                <p className="text-sm font-semibold">{label}:</p>
                                <p className="text-sm">{format}</p>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFilter(key)}
                                >
                                    <LucideX className="w-4 h-4" />
                                </Button>
                            </div>
                        )
                    })}
                </div>
            )}


            <Table className="w-full overflow-hidden border rounded-md bg-white [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                <TableHeader className="bg-slate-200 ">
                    <TableRow>
                        <TableHead className="min-w-40 border-r border-neutral-300">Nama</TableHead>
                        <TableHead className="min-w-60 border-r border-neutral-300">Check-In & Out</TableHead>
                        <TableHead className="border-r border-neutral-300">Tgl Absensi</TableHead>
                        <TableHead className="border-r border-neutral-300">Lokasi Check-In</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-6" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" />
                            </TableCell>


                        </TableRow>
                    )) :
                        error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center p-10">
                                    <img src={noDataImg} alt="No Data" className="mx-auto w-20" />
                                    <p className="mt-4 text-sm text-muted-foreground">{error}</p>
                                </TableCell>
                            </TableRow>
                        )
                            :
                            listAttendances.map((item, index) => {

                                const time_diff = differenceMinutes(item.schedule_in_time, item.check_in_time);

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="border-r border-neutral-200">
                                            <div className="flex flex-row items-center gap-x-4">
                                                <Avatar>
                                                    <AvatarImage src={`${ImageURL}${item.karyawan?.file_foto}`} alt="shadcn" />
                                                    <AvatarFallback className="text-muted-foreground">{item.karyawan.nama.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <p className="text-md text-neutral-700 font-semibold">{item.karyawan.nama}</p>
                                                    <div className="flex flex-row gap-2">
                                                        <p className="text-neutral-600">{getDepartmenName(item.karyawan.id_departemen)} - {item.karyawan.nik}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-r border-neutral-200">
                                            <div className="w-full flex flex-row gap-x-4 items-baseline-last justify-between">
                                                <p className="text-md text-neutral-700 font-semibold">{item.check_in_time ? formatTime(item.check_in_time) : "-"}</p>

                                                <div className="w-full flex flex-col">
                                                    <div className="w-full text-center">
                                                        <p className="text-muted-foreground "> {formatTime(item.schedule_in_time)} - {formatTime(item.schedule_out_time)}</p>
                                                    </div>
                                                    <div className="w-full flex flex-row items-center ">
                                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                        <div className="w-full h-0.5 rounded-full bg-gray-200"></div>
                                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                    </div>
                                                </div>
                                                <p className="text-md text-neutral-700 font-semibold">{item.check_out_time ? formatTime(item.check_out_time) : "-"}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-r border-neutral-200 text-neutral-600">{formatDate(item.created_at)}</TableCell>
                                        <TableCell className="border-r border-neutral-200">
                                            {item.check_in_longitude ? (
                                                <a
                                                    href={locationMapUrl(item.check_in_longitude, item.check_in_latitude)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"


                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="xs"
                                                        className="text-sm text-muted-foreground">
                                                        <LucideMapPin />
                                                        Lihat Lokasi
                                                    </Button>
                                                </a>
                                            ) : "-"}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-row gap-x-2">
                                                {item.check_in_time ? (
                                                    <Badge variant="secondary">Masuk</Badge>
                                                ) :
                                                    <Badge variant="destructive">Tidak Masuk</Badge>}
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
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                </TableBody>
            </Table>
            <Paginations
                lastPage={lastPage}
                page={page}
                onPageChange={(p) => {
                    setPage(p);
                    tableRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }}
            />
        </div>
    )
}

export default ListAttendance