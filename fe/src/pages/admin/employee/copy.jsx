import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarIcon, ChevronDown, LucideListFilter, LucideX, Pencil, Plus, SearchIcon, Trash, Users } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { toast } from "sonner";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { deleteKaryawan, detailKaryawan, updateKaryawan } from "../../../service/karyawanService";
import { useDepartmen } from "../../../hooks/useDepartmen";
import { useJabatan } from "../../../hooks/useJabatan";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import { Calendar } from "../../../Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";
import { Textarea } from "../../../Components/ui/textarea";
import { useFormik } from "formik";

import * as yup from 'yup'
import { format } from "date-fns";
import { ImageURL } from "../../../api";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { HiArrowsUpDown } from "react-icons/hi2";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group";
import { Field, FieldContent, FieldGroup } from "../../../Components/ui/field";
import { useEmploye } from "../../../hooks/useEmploye";
import Paginations from "../../../Components/commons/moleculs/Pagination";
import { useOffice } from "../../../hooks/useOffice";
import { Skeleton } from "../../../Components/ui/skeleton";
import { useFilters } from "../../../hooks/useFilters";
import { FILTER_CONFIG } from "../../../constants/filterConfig";
import noDataImg from "@/assets/img/no_data.svg";
import { FormEmployee } from "./FormEmployee";


const PageKaryawan = ({ title }) => {
    usePageTitle(title);
    const tableRef = useRef(null);

    const closeDialogRef = useRef(null);
    const [data, setData] = useState([]);
    const [karyawanById, setKaryawanById] = useState({})

    // const [selectedDate, setSelectedDate] = useState();
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
    const { employeeList, setEmployeeList, page, setPage, error, lastPage, isLoading, handleGetEmploye, handleUpdateEmploye } = useEmploye();

    // console.log('kantor:', officeList)

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetEmploye({ search, filter: serializedFilters, page });
        }, 500);
        return () => clearTimeout(delay);
    }, [search, serializedFilters, page]);

    useEffect(() => {
        handleGetDepartmen();
    }, []);

    useEffect(() => {
        handleGetJabatan();
    }, []);

    useEffect(() => {
        handlegetOfficeAll();
    }, []);


    // console.log('departmenList', departmenList)
    const getJabatanName = (id) => {
        const jabatan = jabatanList.find((jabatan) => jabatan.id === id);
        return jabatan ? jabatan.nama : null;
    };

    const getDepartmenName = (id) => {
        const departmen = departmenList.find((departmen) => departmen.id === id);
        return departmen ? departmen.nama : null;
    };

    const getOfficeName = (id) => {
        const office = officeList.find((office) => office.kedudukan === id);
        return office ? office.kantor : null;
    }

    const helpers = useMemo(() => ({
        getDepartmenName,
        getOfficeName,
        getJabatanName
    }), [departmenList, officeList, jabatanList]);
    // const navigate = useNavigate()
    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         nik: karyawanById?.nik || '',
    //         nama: karyawanById?.nama || '',
    //         ktp: karyawanById?.ktp || '',
    //         bpjs_kesehatan: karyawanById?.bpjs_kesehatan || '',
    //         bpjs_ketenagakerjaan: karyawanById?.bpjs_ketenagakerjaan || '',
    //         npwp: karyawanById?.npwp || '',
    //         ijazah: karyawanById?.ijazah || '',
    //         jenis_kelamin: karyawanById?.jenis_kelamin || '',
    //         tempat_lahir: karyawanById?.tempat_lahir || '',
    //         tgl_lahir: karyawanById?.tgl_lahir || '',
    //         alamat: karyawanById?.alamat || '',
    //         alamat_domisili: karyawanById?.alamat_domisili || '',
    //         status_kawin: karyawanById?.status_kawin || '',
    //         status_karyawan: karyawanById?.status_karyawan || '',
    //         id_jabatan: karyawanById?.id_jabatan || null,
    //         id_departemen: karyawanById?.id_departemen || null,
    //         tgl_masuk: karyawanById?.tgl_masuk || '',
    //         file_foto: karyawanById?.file_foto || '',
    //         file_ktp: karyawanById?.file_ktp || '',
    //         file_bpjs_kesehatan: karyawanById?.file_bpjs_kesehatan || '',
    //         file_bpjs_ketenagakerjaan: karyawanById?.file_bpjs_ketenagakerjaan || '',
    //         file_ijazah: karyawanById?.file_ijazah || '',
    //         file_npwp: karyawanById?.file_npwp || '',
    //         file_sertifikat: karyawanById?.file_sertifikat || '',
    //     },
    //     onSubmit: async (values, actions) => {
    //         console.log(values);
    //         const formData = new FormData();

    //         for (const key in values) {
    //             const value = values[key];
    //             if (value !== undefined && value !== null) {
    //                 if (value instanceof Date && !isNaN(value)) {
    //                     const formattedDate = format(value, "yyyy-MM-dd");
    //                     formData.append(key, formattedDate);
    //                     // console.log(`${key}:`, formattedDate); 
    //                 } else {
    //                     formData.append(key, value);
    //                     // console.log(`${key}:`, value);
    //                 }
    //             }
    //         }

    //         // console.log(formData);
    //         try {
    //             const res = await handleUpdateEmploye(
    //                 karyawanById.id,
    //                 formData
    //             )
    //             console.log(res);
    //             toast.success(res.data.message)

    //             setData(prev => prev.map(item => item.id === karyawanById.id ? { ...item, ...values } : item))

    //             setTimeout(() => {
    //                 closeDialogRef.current?.click()
    //             }, 1000)
    //         } catch (error) {
    //             toast({ title: "Error", description: "Gagal menambahkan" })
    //         } finally {
    //             actions.setSubmitting(false)
    //         }
    //     },
    //     validationSchema: yup.object().shape({
    //         nama: yup.string().required('Jabatan wajib diisi'),
    //         ktp: yup.number().required('NIK wajib diisi'),
    //         jenis_kelamin: yup.string().required('Jenis kelamin wajib dipilih'),
    //     })
    // })

    // const handleForm = (e) => {
    //     const { name, type, value, files } = e.target;
    //     if (type === "file") {
    //         formik.setFieldValue(name, files[0]);

    //     } else {
    //         formik.setFieldValue(name, value);
    //     }
    // }


    // console.log('filters:', filters)


    const onDelete = async (id) => {
        try {
            const response = await deleteKaryawan({ id });
            setData(prev => prev.filters(item => item.id !== id));
            // console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            // console.error(error);
        }
    }

    const getKaryawanById = async (id) => {
        try {
            const response = await detailKaryawan({ id });
            setKaryawanById(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSuccessUpdate = (updatedEmployee) => {
        console.log('updatedEmployee', updatedEmployee)
        // setEmployeeList(prev =>
        //     prev.map(item =>
        //         item.id === updatedEmployee.id
        //             ? updatedEmployee
        //             : item
        //     )
        // )
    }

    // const onReset = () => {
    //     formik.resetForm()
    // }


    return (
        <div className="flex flex-col w-full pb-32 gap-4">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Karyawan" subtitle="Menampilkan semua data karyawan yang tersedia pada platform ini" icon={Users} />

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
                            error ? (
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
                                                    <Button variant="yellow" size="sm" onClick={() => getKaryawanById(item.id)}>
                                                        {/* <Link to={`/departmen/${item.id}`}> </Link> */}
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className=" sm:max-w-[1024px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Karyawan</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Karyawan disini, klik save untuk menyimpan.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <FormEmployee
                                                        data={karyawanById}
                                                        onSuccess={handleSuccessUpdate}
                                                        onSubmit={handleUpdateEmploye}
                                                        onClose={closeDialogRef}
                                                        jabatanList={jabatanList}
                                                        departmenList={departmenList} />
                                                </DialogContent>
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
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

export default PageKaryawan