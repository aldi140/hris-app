import { Link } from "react-router-dom"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table"
import { BriefcaseBusiness, ChevronDownIcon, LucideCamera, LucideChevronLeft, LucideChevronRight, LucideFileChartLine, LucideMapPinCheck, LucideMapPinHouse, LucideMapPinned, LucideSend, LucideTimer, LucideUser, LucideUserRound, LucideWallet, MapPinCheck, Plus, SearchIcon } from "lucide-react"
import { cn, formatDate, formatNominal, getDateOfWeek, getDayOfWeek, hitungJarak, locationMapUrl } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group"
import { Field, FieldContent } from "../../../Components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select"
import { useDepartmen } from "../../../hooks/useDepartmen"
import { useEffect, useState } from "react"
import { useOffice } from "../../../hooks/useOffice"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { useSurveyKunjungan } from "../../../hooks/useSurveyKunjungan"
import { startOfWeek, endOfWeek, format } from "date-fns";
import Paginations from "../../../Components/commons/moleculs/Pagination"
import MapSurvey from "../../../Components/commons/organisms/Map"
import { useRuteInfo } from "../../../hooks/useRouteInfo"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../Components/ui/collapsible"
import { Label } from "../../../Components/ui/label"
import { Separator } from "../../../Components/ui/separator"
import { ImageURLKoplink } from "../../../api"
import ImagePreview from "../../../Components/commons/atoms/ImagePreview"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css";


const FieldVisit = ({ title }) => {
    usePageTitle(title)

    const [activeDate, setActiveDate] = useState(new Date());


    // const { departmenList, handleGetDepartmen } = useDepartmen()
    const { officeList, handlegetOfficeAll } = useOffice();
    const { departmenList, handleGetDepartmen } = useDepartmen()
    const { surveyKunjunganList, handleGetSurveyKunjungan, handleGetDetailSurvey, detailSurvey, detailKunjungan, handleGetDetailKunjungan, setPage, page, lastPage, loadingDetail, isLoading, error } = useSurveyKunjungan()
    const { ruteInfo: ruteInfoSurvey, loadingRute: loadingRuteSurvey, errorRute: errorRuteSurvey } = useRuteInfo(detailSurvey)

    // Untuk detail kunjungan
    const { ruteInfo: ruteInfoKunjungan, loadingRute: loadingRuteKunjungan, errorRute: errorRuteKunjungan } = useRuteInfo(detailKunjungan)
    // console.log('ruteInfoSurvey', ruteInfoSurvey)
    const [search, setSearch] = useState('');
    const [idKantor, setIdKantor] = useState('');
    const [startDate, setStartDate] = useState(() =>
        format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
    );
    const dataLongLatKunjungan = detailKunjungan?.map((item) => ({
        lat: item.latitude,
        lng: item.long_rumah,
    }))

    const dataLongLatSurvey = detailSurvey?.map((item) => ({
        lat: item.lat_rumah,
        lng: item.long_rumah,
    }))
    // console.log(dataLongLatSurvey, 'dataLongLatSurvey')
    const [endDate, setEndDate] = useState(() =>
        format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
    );

    // console.log('detailSurvey', detailSurvey)

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }
    useEffect(() => {
        handlegetOfficeAll();
    }, []);
    useEffect(() => {
        handleGetDepartmen();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetSurveyKunjungan({
                search, start_date: startDate, end_date: endDate, id_kantor: idKantor, page
            });
        }, 500);
        return () => clearTimeout(delay);
    }, [search, startDate, endDate, idKantor, page]);

    const getDepartmenName = (id) => {
        const departmen = departmenList.find((departmen) => departmen.id === id);
        return departmen ? departmen.nama : null;
    };

    // const data = [
    //     {
    //         id: 1,
    //         id_karyawan: 1,
    //         name: "John Doe",
    //         id_kantor: 'AA',
    //         id_departemen: 1,
    //         depatmen: 'Surveyor',
    //         data_kunjungan: [
    //             {
    //                 date: "2026-02-02",
    //                 total_trx: 1
    //             },
    //             {
    //                 date: "2026-02-03",
    //                 total_trx: 3
    //             },
    //             {
    //                 date: "2026-02-04",
    //                 total_trx: 2
    //             },
    //             {
    //                 date: "2026-02-05",
    //                 total_trx: 4
    //             },
    //         ],
    //         data_survey: [
    //             {
    //                 date: "2026-02-02",
    //                 total_trx: 1
    //             },
    //             {
    //                 date: "2026-02-03",
    //                 total_trx: 2
    //             },
    //             {
    //                 date: "2026-02-04",
    //                 total_trx: 3
    //             },
    //             {
    //                 date: "2026-02-05",
    //                 total_trx: 2
    //             },
    //         ],

    //     },
    // ]
    // console.log('data', data)

    // ambil tanggal perminggu dalam bulan

    const { dateWeeks, dayWeeks, currDate } = getDateOfWeek(activeDate);

    const handleNextWeek = () => {
        const next = new Date(startDate);
        next.setDate(next.getDate() + 7);
        // console.log('next', next)
        setActiveDate(next);
        setStartDate(format(next, "yyyy-MM-dd"));
        setEndDate(format(endOfWeek(next, { weekStartsOn: 1 }), "yyyy-MM-dd"));
    };


    const handlePrevWeek = () => {
        const prev = new Date(startDate);
        prev.setDate(prev.getDate() - 7);
        setActiveDate(prev);
        setStartDate(format(prev, "yyyy-MM-dd"));
        setEndDate(format(endOfWeek(prev, { weekStartsOn: 1 }), "yyyy-MM-dd"));
    };
    // console.log(startDate)



    // console.log('date week', dateWeeks)
    // console.log('currdate', currDate)
    // console.log('week of month', weekOfMonth)
    // dateRangeOfWeek.dayWeeks.map((day, index) => {
    //     console.log('day', getDayOfWeek(day))
    //     console.log('day', day)
    // })

    // console.log('dateWeek', dateWeeks)
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Survey & Kunjungan" subtitle="Menampilkan semua data kunjungan & survey yang tersedia pada platform ini" icon={MapPinCheck} />
                {/* <Button variant="blue" size="lg" asChild>
                    <Link to="/admin/shift/create"><Plus className="size-5" />Tambah Kunjungan</Link>
                </Button> */}
            </div>
            <div className="border border-neutral-300 rounded-md relative overflow-x-auto scrollbar-thin">
                <div className="grid grid-cols-6 lg:grid-cols-10 gap-2 items-start p-4">
                    <InputGroup className="col-span-3 lg:col-span-4 bg-white">
                        <InputGroupInput placeholder="Search..." onChange={handleSearch} value={search} />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <div className="col-span-3 lg:col-span-2 ">
                        <Field orientation="vertical" >
                            <FieldContent >
                                <Select
                                    value={idKantor}
                                    onValueChange={(e) => setIdKantor(e)}
                                >
                                    <SelectTrigger className="w-full bg-white" id="id_kantor" >
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
                    </div>
                    <div className="col-span-6 lg:col-span-4 ">

                        <div className="flex flex-row items-center">
                            <Button variant="outline" size="md" onClick={handlePrevWeek}>
                                <LucideChevronLeft />
                            </Button>
                            <div className="w-full text-center">
                                <p className="text-xs lg:text-sm font-bold text-slate-800">{formatDate(dateWeeks[0])} - {formatDate(dateWeeks[6])}</p>
                            </div>
                            <Button variant="outline" size="md" onClick={handleNextWeek}>
                                <LucideChevronRight />
                            </Button>
                        </div>
                    </div>

                </div>
                <div className="">
                    <Table className="w-full bg-white [&_td]:whitespace-nowrap ">
                        <TableHeader className="bg-slate-200 ">
                            <TableRow>
                                <TableHead className="min-w-48 sticky left-0 z-10 bg-slate-200 drop-shadow-[1px_0_rgba(0,0,0,0.1)]  text-slate-800 px-6">Nama</TableHead>
                                {dateWeeks.map((date, index) => (
                                    <TableHead className=" border-r border-neutral-300 text-center py-2" key={index}>

                                        <div className={`flex flex-col p-2 ${date === currDate ? "bg-slate-600 rounded-md" : ""}`}>
                                            <p className={`text-xs  font-semibold ${date === currDate ? "text-slate-100" : "text-slate-800"}`}>{getDayOfWeek(dayWeeks[index])}</p>
                                            <p className={`text-xs ${date === currDate ? "text-slate-100" : "text-slate-600"}`}>{formatDate(date)}</p>
                                        </div>
                                    </TableHead>

                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {surveyKunjunganList.map((item, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <TableCell className="font-medium sticky z-20 left-0 bg-white drop-shadow-[1px_0_rgba(0,0,0,0.1)] px-4">
                                        <div className="flex flex-row items-center gap-4">
                                            <Avatar className="size-12">
                                                <AvatarImage src="https://github.com/shadcsn.png" alt="shadcn" />
                                                <AvatarFallback className="text-muted-foreground font-semibold">{item.nama.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="text-md text-neutral-700 font-semibold">{item.nama}</p>
                                                <div className="flex flex-row gap-2">
                                                    <p className="text-neutral-600">{getDepartmenName(item.id_departemen)} - {item.id_kantor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>


                                    {dateWeeks.map((date, colIndex) => {

                                        const data_detail = item.detail?.[date];
                                        const survey = data_detail?.survei_count > 0 ? data_detail?.survei_count : null;
                                        const kunjungan = data_detail?.kunjungan_count > 0 ? data_detail?.kunjungan_count : null;
                                        // console.log('data', data)
                                        return (
                                            <TableCell key={colIndex} className="text-center border-r border-neutral-300 relative overflow-hidden h-24">
                                                <div className="flex flex-col gap-2 items-center">
                                                    {/* KUNJUNGAN */}
                                                    {kunjungan && (
                                                        <>

                                                            <Dialog>
                                                                <DialogTrigger
                                                                    asChild
                                                                    onClick={() =>
                                                                        handleGetDetailSurvey({
                                                                            id_karyawan: item.id_karyawan,
                                                                            tanggal: item.tanggal,
                                                                            id_kantor: item.id_kantor,
                                                                        })}>
                                                                    <Button className="w-full bg-red-100 text-red-600 hover:bg-red-100/60 font-semibold" > {kunjungan}</Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-sm lg:max-w-4xl">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Scrollable Content</DialogTitle>
                                                                        <DialogDescription>
                                                                            This is a dialog with scrollable content.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="w-full scrollbar-thin -mx-4  max-h-[80vh] overflow-y-auto px-4 flex flex-col gap-3">
                                                                        {Array.from({ length: kunjungan.total_trx }).map((_, index) => (
                                                                            <Card>
                                                                                <CardHeader>
                                                                                    <CardTitle>Card Title</CardTitle>
                                                                                    <CardDescription>
                                                                                        Card Description
                                                                                    </CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                                                    </p>
                                                                                </CardContent>
                                                                            </Card>
                                                                        ))}
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </>

                                                    )}

                                                    {/* SURVEY */}
                                                    {survey && (
                                                        <>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button className="w-full bg-orange-100 text-orange-600 hover:bg-orange-100/60 font-semibold" onClick={() =>
                                                                        handleGetDetailSurvey({
                                                                            id_karyawan: item.id_karyawan,
                                                                            tanggal: date,
                                                                            id_kantor: item.id_kantor,
                                                                        })}>
                                                                        {survey}
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-sm lg:max-w-4xl">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Detail Survey</DialogTitle>
                                                                        <DialogDescription>

                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4 flex flex-col gap-4">

                                                                        <div className="rounded-md overflow-hidden">
                                                                            <MapSurvey data={detailSurvey} jenis="Survey" typeFile="rumah" />
                                                                        </div>
                                                                        <div className="flex flex-col gap-2">
                                                                            <p className="text-md font-semibold text-muted-foreground">Informasi Survey</p>
                                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                                                {detailSurvey && detailSurvey.map((item, index) => {
                                                                                    let divRoute = null;
                                                                                    // Cek apakah ada data rute dari index sebelumnya
                                                                                    const prevRouteInfo = index > 0 ? ruteInfoSurvey[index - 1] : null;
                                                                                    const images = item.foto_rumah.split(",");
                                                                                    // Tampilkan divRoute di card saat ini jika bukan card pertama
                                                                                    if (index > 0 && prevRouteInfo) {
                                                                                        divRoute = (
                                                                                            <div className="w-full flex flex-row lg:justify-between gap-2">
                                                                                                <div className="w-full flex gap-2">
                                                                                                    {loadingRuteSurvey ? (
                                                                                                        <>
                                                                                                            <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                Jarak Tempuh
                                                                                                            </Label>
                                                                                                            <p className="mt-1 text-center text-xs text-neutral-400">Menghitung...</p>
                                                                                                        </>

                                                                                                    ) : (
                                                                                                        // <>
                                                                                                        //     <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                        //         Jarak Tempuh
                                                                                                        //     </Label>
                                                                                                        //     <p className="text-sm font-medium text-muted-foreground break-all">
                                                                                                        //         {prevRouteInfo.jarakKm} km
                                                                                                        //     </p>
                                                                                                        // </>
                                                                                                        <>
                                                                                                            <LucideMapPinned size={17} className="text-muted-foreground" />
                                                                                                            <div className="w-full">
                                                                                                                <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                    Jarak Tempuh
                                                                                                                </Label>
                                                                                                                <p className="text-sm font-medium text-muted-foreground break-all">{prevRouteInfo.jarakKm}</p>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                                <div className="w-full flex gap-2">

                                                                                                    <LucideTimer size={17} className="text-muted-foreground" />
                                                                                                    <div className="w-full">
                                                                                                        <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                            Total Waktu
                                                                                                        </Label>
                                                                                                        <p className="text-sm font-medium text-muted-foreground break-all">
                                                                                                            {prevRouteInfo.waktuMenit ? `${Math.floor(prevRouteInfo.waktuMenit / 60)} jam ${prevRouteInfo.waktuMenit % 60} menit` : '-'}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    }

                                                                                    return (
                                                                                        <div div className="w-full" key={index} >
                                                                                            <Collapsible className="data-[state=open]:bg-white border rounded-md w-full col-span-6">
                                                                                                <CollapsibleTrigger asChild>
                                                                                                    <Button variant="ghost" className="group w-full text-wrap">
                                                                                                        <LucideMapPinCheck />
                                                                                                        <p className="text-sm font-bold text-slate-700"> Survey {index + 1} ({item.no_transaksi})</p>
                                                                                                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                                                                                    </Button>
                                                                                                </CollapsibleTrigger>
                                                                                                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                                                                                                    <Separator />
                                                                                                    <div className="w-full flex flex-col gap-4">
                                                                                                        <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-2">
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideUserRound size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Nasabah
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.nama}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="w-full flex gap-2 items-start">
                                                                                                                <LucideWallet size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Nominal Pinjaman
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{formatNominal(item.nominal)}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <Separator />
                                                                                                        <div className="w-full flex gap-2 ">
                                                                                                            <LucideMapPinHouse size={17} className="text-muted-foreground" />
                                                                                                            <div className="w-full">
                                                                                                                <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                    Alamat
                                                                                                                </Label>
                                                                                                                <p className="text-sm font-medium text-muted-foreground break-all">{item.alamat}</p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <Separator />
                                                                                                        <div className="w-full flex gap-2">

                                                                                                            <LucideCamera size={17} className="text-muted-foreground" />
                                                                                                            <div className="w-full">
                                                                                                                <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                    Foto Rumah
                                                                                                                </Label>
                                                                                                                <div className="w-full flex flex-row gap-2 justify-between">
                                                                                                                    {images.map((image, index) => (
                                                                                                                        <ImagePreview src={`${ImageURLKoplink}rumah/${image}`} alt="Foto Rumah" className="w-50 h-30 object-cover rounded-md" />
                                                                                                                    ))}

                                                                                                                    {/* <img className="w-50 h-30 object-cover rounded-md" src={`${ImageURLKoplink}rumah/${image1[0]}`} alt="Foto Rumah" /> */}
                                                                                                                    {/* <img className="w-50 h-30 object-cover rounded-md" src={`${ImageURLKoplink}rumah/${image1[1]}`} alt="Foto Rumah" /> */}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <Separator />
                                                                                                        <div className="w-full flex flex-row lg:justify-between gap-2">
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Capacity
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_capacity}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Capital
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_capital}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="w-full flex flex-row lg:justify-between gap-2">
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Character
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_character}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Collateral
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_collateral}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="w-full flex flex-row lg:justify-between gap-2">
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Condition
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_condition}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="w-full flex gap-2">
                                                                                                                <LucideFileChartLine size={17} className="text-muted-foreground" />
                                                                                                                <div className="w-full">
                                                                                                                    <Label className="text-sm font-semibold text-muted-foreground">
                                                                                                                        Skor Purpose
                                                                                                                    </Label>
                                                                                                                    <p className="text-sm font-medium text-muted-foreground break-all">{item.skor_purpose}</p>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                        <Separator />
                                                                                                        {index > 0 && (
                                                                                                            <>
                                                                                                                {divRoute}
                                                                                                                <Separator />
                                                                                                            </>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    <a
                                                                                                        href={locationMapUrl(item.long_rumah, item.lat_rumah)}
                                                                                                        target="_blank"
                                                                                                        rel="noopener noreferrer"
                                                                                                        className="place-self-end mt-4"
                                                                                                    >
                                                                                                        <Button size="xs" variant="blue" > <LucideSend className="mr-2" /> Lihat Lokasi</Button>
                                                                                                    </a>

                                                                                                </CollapsibleContent>
                                                                                            </Collapsible>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>


                                                                    </div>

                                                                    <div className="w-full scrollbar-thin -mx-4  max-h-[80vh] overflow-y-auto px-4 flex flex-col gap-3">
                                                                        {/* {Array.from({ length: survey.total_trx }).map((_, index) => (
                                                                        <Card>
                                                                            <CardHeader>
                                                                                <CardTitle>Card Title</CardTitle>
                                                                                <CardDescription>
                                                                                    Card Description
                                                                                </CardDescription>
                                                                            </CardHeader>
                                                                            <CardContent>
                                                                                <p>
                                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                                                </p>
                                                                            </CardContent>
                                                                        </Card>
                                                                    ))} */}
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>

                                                        </>

                                                    )}

                                                    {/* kosong */}
                                                    {!kunjungan && !survey && (
                                                        <>
                                                            <div className="absolute w-[1000px] -bottom-5  border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] -bottom-1  border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] bottom-3  border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] bottom-7  border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] top-7 border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] top-3 border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] -top-1 border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] -top-5 border border-r-slate-200 rotate-[36deg]"></div>
                                                            <div className="absolute w-[1000px] border border-r-slate-200 rotate-[36deg]"></div>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>
                </div>
                <div className="p-4 flex flex-row gap-2 justify-center w-full">
                    <div className="flex flex-row items-center gap-x-2">
                        <div className="w-4 h-4 bg-red-200 rounded-xs"></div>
                        <p className="text-xs font-medium text-slate-700">Kunjungan</p>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <div className="w-4 h-4 bg-orange-200 rounded-xs"></div>
                        <p className="text-xs font-medium text-slate-700">Survey</p>
                    </div>

                </div>
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

        </div >
    )
}

export default FieldVisit