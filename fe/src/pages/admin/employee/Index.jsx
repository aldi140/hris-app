import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Clock, LucideListFilter, LucideX, Pencil, Plus, SearchIcon, Trash, Users } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { toast } from "sonner";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useDepartmen } from "../../../modules/departmen/useDepartmen";
import { useJabatan } from "../../../modules/jabatan/useJabatan";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";

import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { HiArrowsUpDown } from "react-icons/hi2";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group";
import { Field, FieldContent, FieldGroup } from "../../../Components/ui/field";
import Paginations from "../../../Components/commons/moleculs/Pagination";
import { useOffice } from "../../../modules/office/useOffice";
import { Skeleton } from "../../../Components/ui/skeleton";
import { useFilters } from "../../../hooks/useFilters";
import { FILTER_CONFIG } from "../../../constants/filterConfig";
import noDataImg from "@/assets/img/no_data.svg";
import { EditForm } from "./EditForm";
import MyCalendar from "../../../Components/commons/organisms/Calendar";
import { useShift } from "../../../modules/shift/useShift.js";
import { useApiError } from "../../../hooks/useApiError";
import { Spinner } from "../../../Components/ui/spinner";
import { useEmployee } from "../../../modules/employee/useEmploye";
import { useWorkSchedule } from "../../../modules/workSchedule/useWorkSchedule.js";


const PageEmployee = ({ title }) => {
    usePageTitle(title);
    const tableRef = useRef(null);
    const closeDialogRef = useRef(null);
    const handleApiError = useApiError();
    const [karyawanById, setKaryawanById] = useState([])
    const [activeDate, setActiveDate] = useState(new Date());
    const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
    const initialFilterUI = {
        id_jabatan: "",
        id_departmen: "",
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


    // hooks
    const { jabatanList, handleGetJabatan } = useJabatan();
    const { departmenList, handleGetDepartmen } = useDepartmen()
    const { officeList, handlegetOfficeAll } = useOffice();
    const { shiftList, hanldeGetShift } = useShift();
    // console.log('filters:', filters)
    const { scheduleEmployee, handleGetScheduleByEmployee, handleAddSchedule, handleUpdateScheduleEmployee, handleDeleteSchedule } = useWorkSchedule();
    const { employeeList, page, setPage, error, lastPage, isLoading, handleGetEmployee, handleDetailEmployee, handleDeleteEmployee, handleUpdateEmploye } = useEmployee();

    const departmenMap = useMemo(() => {
        return new Map(departmenList.map(d => [d.id, d.nama]));
    }, [departmenList]);

    const jabatanMap = useMemo(() => {
        return new Map(jabatanList.map(j => [j.id, j.nama]));
    }, [jabatanList]);

    const officeMap = useMemo(() => {
        return new Map(officeList.map(o => [o.kedudukan, o.kantor]));
    }, [officeList]);

    const getDepartmenName = useCallback((id) =>
        departmenMap.get(id) || null
        , [departmenMap]);

    const getJabatanName = useCallback((id) =>
        jabatanMap.get(id) || null
        , [jabatanMap]);

    const getOfficeName = useCallback((id) =>
        officeMap.get(id) || null
        , [officeMap]);

    const helpers = useMemo(() => ({
        getDepartmenName,
        getOfficeName,
        getJabatanName
    }), [getDepartmenName, getOfficeName, getJabatanName]); // 


    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetEmployee({ search, filter: serializedFilters, page });
        }, 500);
        return () => clearTimeout(delay);
    }, [search, serializedFilters, page]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([
                    handleGetDepartmen(),
                    handleGetJabatan(),
                    handlegetOfficeAll(),
                    // handleGetJadwalKerja(),
                    hanldeGetShift(),
                ]);
            } catch (err) {
                handleApiError(err);
            }
        };
        loadInitialData();
    }, []);

    const onDelete = async (id) => {
        try {
            const response = await handleDeleteEmployee({ id });
            // setData(prev => prev.filters(item => item.id !== id));
            // console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            // console.error(error);
        }
    }

    const getKaryawanById = async (id) => {
        const data = await handleDetailEmployee(id);
        setKaryawanById(data);
    }

    const getJamKerja = useCallback(async (id) => {
        // 1. Gunakan new Date() langsung, bukan state
        const today = new Date();
        const bulan = today.getMonth() + 1;
        const tahun = today.getFullYear();

        try {
            // 2. Find karyawan dulu (lebih cepat, tidak perlu await)
            const karyawan = employeeList.find((item) => item.id === id);
            setKaryawanById(karyawan);

            // 3. Set activeDate untuk calendar
            setActiveDate(today);

            // 4. Fetch jadwal
            await handleGetScheduleByEmployee({
                id_karyawan: id,
                bulan,
                tahun,
            });
        } catch (error) {
            console.error('Failed to load schedule:', error);
        }
    }, [employeeList, handleGetScheduleByEmployee]);

    const handleMonthChange = async (newDate) => {
        const bulan = newDate.month() + 1;
        const tahun = newDate.year();
        await handleGetScheduleByEmployee({
            id_karyawan: karyawanById.id,
            bulan,
            tahun,
        });
    };

    const handleCalendarSubmit = async (payload, mode, monthCurrent, yearCurrent) => {
        try {
            // Eksekusi operasi sesuai mode
            if (mode === "create") {
                await handleAddSchedule(payload);
            } else if (mode === "edit") {
                await handleUpdateScheduleEmployee(payload);
            } else if (mode === "delete") {
                await handleDeleteSchedule(payload);
            }

            // Refresh data setelah operasi berhasil
            if (karyawanById?.id) {
                await handleGetScheduleByEmployee({
                    id_karyawan: karyawanById.id,
                    bulan: monthCurrent,
                    tahun: yearCurrent,
                });
            }
        } catch (error) {
            console.error('GAGAL:', error);
        }
    };


    return (
        <div className="flex flex-col w-full pb-32 gap-4">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Karyawan" subtitle="Menampilkan semua data karyawan yang tersedia pada platform ini" icon={Users} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/karyawan/create"><Plus className="size-5" />Tambah Karyawan</Link>
                </Button>
            </div>
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-4">
                <InputGroup className="col-span-6 lg:col-span-4 bg-white">
                    <InputGroupInput placeholder="Search..." onChange={handleSearch} value={search} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>

                {/* <div className="col-span-4 lg:col-span-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${selectedDate ? "text-muted-foreground" : "text-muted-foreground"}`}
                            ><HiCalendar className="h-4 w-4" />
                                {selectedDate ? format(selectedDate, "dd MMM yyyy") : <span>Pilih tanggal </span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleSelectDate}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                </div> */}
                <div className="col-span-2 lg:col-span-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="text-neutral-500 bg-neutral-50">
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
                                <Field orientation="vertical">
                                    <FieldContent>
                                        <Label htmlFor="id_jabatan" className="text-muted-foreground ">Jabatan</Label>
                                        <Select
                                            value={filterUI.id_jabatan}
                                            onValueChange={(v) => setFilter("id_jabatan", v)}
                                        >
                                            <SelectTrigger className="w-full" id="id_jabatan">
                                                <SelectValue placeholder="Pilih Jabatan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jabatanList.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>{item.nama}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldContent>
                                </Field>
                                <hr />

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
                                            <SelectTrigger className="w-full">
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
                </div>
                {/* {Object.entries(appliedFilter).map(([key, value]) => (
                    <FilterChip
                        key={key}
                        label={`${key}: ${value}`}
                        onRemove={() => removeFilter(key)}
                    />
                ))} */}

            </div>
            {Object.keys(appliedFilter).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-3 py-1 border rounded-md bg-neutral-50">
                        <p className="text-sm font-semibold">Filter:</p>
                        <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center">
                            <p className="text-xs">
                                {Object.keys(appliedFilter).length}
                            </p>
                        </div>
                    </div>

                    {/* Filter chips */}
                    {Object.entries(appliedFilter).map(([key, value]) => {
                        const config = FILTER_CONFIG[key];
                        const label = config?.label ?? key
                        const format = config.format ? config.format(value, helpers) : value

                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 px-3 py-1 border rounded-md bg-neutral-50"
                            >
                                <p className="text-sm font-semibold">
                                    {label}:
                                </p>
                                <p className="text-sm font-medium">
                                    {format}
                                </p>


                                {/* <span>
                                    {config?.format ? config.format(value) : value}
                                </span> */}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFilter(key)}
                                >
                                    <LucideX className="w-4 h-4" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="overflow-hidden rounded-md border bg-white [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:whitespace-nowrap [&_th]:px-6 " ref={tableRef}>
                <Table className="w-full">
                    <TableHeader className="bg-slate-200">
                        <TableRow>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Nama
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    NIK
                                    {/* <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button> */}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Jenis Kelamin
                                    {/* <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button> */}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Alamat
                                    {/* <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button> */}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Tanggal Masuk
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Departemen
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Jabatan
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                        <span className="flex-none rounded text-muted-foreground">
                                            <HiArrowsUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </div>
                            </TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? Array.from({ length: 10 }, (_, index) => (
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
                            typeof error === "string" ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center p-10">
                                        <img src={noDataImg} alt="No Data" className="mx-auto w-20" />
                                        <p className="mt-4 text-sm text-muted-foreground">{error}</p>
                                    </TableCell>
                                </TableRow>
                            ) :
                                employeeList.map((item, index) => (
                                    <TableRow key={item.id}>

                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>{item.nik}</TableCell>
                                        <TableCell>{item.jenis_kelamin}</TableCell>
                                        <TableCell>{item.alamat}</TableCell>
                                        <TableCell>{item.tgl_masuk}</TableCell>
                                        <TableCell>{getDepartmenName(item.id_departemen)}</TableCell>
                                        <TableCell>{getJabatanName(item.id_jabatan)}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild >
                                                    {/* <Tooltip>
                                                        <TooltipTrigger asChild>

                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Set Jam Kerja</p>
                                                        </TooltipContent>
                                                    </Tooltip> */}
                                                    <Button variant="outlineYellow" size="sm"
                                                        onClick={() => {
                                                            getJamKerja(item.id);
                                                        }}>
                                                        {/* <Link to={`/departmen/${item.id}`}> </Link> */}
                                                        {isLoadingCalendar ? (
                                                            <Spinner />
                                                        ) : (
                                                            <Clock className="size-4" />
                                                        )}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-5xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Set Jam Kerja</DialogTitle>

                                                    </DialogHeader>
                                                    <div className="no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4">
                                                        <MyCalendar
                                                            events={scheduleEmployee}
                                                            dataShift={shiftList}
                                                            dataKaryawan={karyawanById}
                                                            onMonthChange={handleMonthChange}
                                                            onSubmit={handleCalendarSubmit}
                                                        />

                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild >
                                                    <Button variant="outline" size="sm" onClick={() => getKaryawanById(item.id)}>
                                                        {/* <Link to={`/departmen/${item.id}`}> </Link> */}
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-5xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Karyawan</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Karyawan disini, klik save untuk menyimpan.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <EditForm data={karyawanById} jabatanList={jabatanList} departmenList={departmenList} onSubmit={handleUpdateEmploye} onClose={closeDialogRef} />
                                                </DialogContent>
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outlineRed" size="sm">
                                                        <Trash className="size-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Anda yakin ingin melanjutkan?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Data akan dihapus secara permanen dari sistem kami.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => onDelete(item.id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
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
    )
}

export default PageEmployee