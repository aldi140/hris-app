import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Building, CalendarIcon, Pencil, Plus, Trash, Users } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { toast } from "sonner";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { deleteKaryawan, detailKaryawan, getKaryawan, updateKaryawan } from "../../../service/karyawanService";
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

const PageKaryawan = ({ title }) => {
    usePageTitle(title);

    const { getDepartmenName } = useDepartmen();
    const { getJabatanName } = useJabatan();
    const closeDialogRef = useRef(null);

    // console.log(getJabatanName(1));

    const [data, setData] = useState([]);
    const [jabatan, setJabatan] = useState([])
    const [departmen, setDepartmen] = useState([])
    const [karyawanById, setKaryawanById] = useState([])
    const { hanldeGetJabatan } = useJabatan()
    const { getDepartmen } = useDepartmen()

    useEffect(() => {
        const getJabatan = async () => {
            const res = await hanldeGetJabatan()
            setJabatan(res.data.data)
        }
        getJabatan()
    }, [])

    useEffect(() => {
        const handleGetDepartmen = async () => {
            const res = await getDepartmen()
            setDepartmen(res.data.data)
        }
        handleGetDepartmen()
    }, [])
    const navigate = useNavigate()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nik: karyawanById?.nik || '',
            nama: karyawanById?.nama || '',
            ktp: karyawanById?.ktp || '',
            bpjs_kesehatan: karyawanById?.bpjs_kesehatan || '',
            bpjs_ketenagakerjaan: karyawanById?.bpjs_ketenagakerjaan || '',
            npwp: karyawanById?.npwp || '',
            ijazah: karyawanById?.ijazah || '',
            jenis_kelamin: karyawanById?.jenis_kelamin || '',
            tempat_lahir: karyawanById?.tempat_lahir || '',
            tgl_lahir: karyawanById?.tgl_lahir || '',
            alamat: karyawanById?.alamat || '',
            alamat_domisili: karyawanById?.alamat_domisili || '',
            status_kawin: karyawanById?.status_kawin || '',
            status_karyawan: karyawanById?.status_karyawan || '',
            id_jabatan: karyawanById?.id_jabatan || null,
            id_departemen: karyawanById?.id_departemen || null,
            tgl_masuk: karyawanById?.tgl_masuk || '',
            file_foto: karyawanById?.file_foto || '',
            file_ktp: karyawanById?.file_ktp || '',
            file_bpjs_kesehatan: karyawanById?.file_bpjs_kesehatan || '',
            file_bpjs_ketenagakerjaan: karyawanById?.file_bpjs_ketenagakerjaan || '',
            file_ijazah: karyawanById?.file_ijazah || '',
            file_npwp: karyawanById?.file_npwp || '',
            file_sertifikat: karyawanById?.file_sertifikat || '',
        },
        onSubmit: async (values, actions) => {
            console.log(values);
            const formData = new FormData();

            for (const key in values) {
                const value = values[key];
                if (value !== undefined && value !== null) {
                    if (value instanceof Date && !isNaN(value)) {
                        const formattedDate = format(value, "yyyy-MM-dd");
                        formData.append(key, formattedDate);
                        // console.log(`${key}:`, formattedDate); 
                    } else {
                        formData.append(key, value);
                        // console.log(`${key}:`, value);
                    }
                }
            }

            // console.log(formData);
            try {
                const res = await updateKaryawan({
                    id: karyawanById.id,
                    data: formData
                })
                console.log(res);
                toast.success(res.data.message)

                setData(prev => prev.map(item => item.id === karyawanById.id ? { ...item, ...values } : item))

                setTimeout(() => {
                    closeDialogRef.current?.click()
                }, 1000)
            } catch (error) {
                toast({ title: "Error", description: "Gagal menambahkan" })
            } finally {
                actions.setSubmitting(false)
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required('Jabatan wajib diisi'),
            ktp: yup.number().required('NIK wajib diisi'),
            jenis_kelamin: yup.string().required('Jenis kelamin wajib dipilih'),
        })
    })

    const handleForm = (e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            formik.setFieldValue(name, files[0]);

        } else {
            formik.setFieldValue(name, value);
        }
    }
    useEffect(() => {
        const fetchKaryawan = async () => {
            const response = await getKaryawan();
            setData(response.data.data);
            console.log(response.data.data);
        };
        fetchKaryawan();
    }, []);



    const onDelete = async (id) => {
        try {
            const response = await deleteKaryawan({ id });
            setData(prev => prev.filter(item => item.id !== id));
            // console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            console.error(error);
        }
    }

    const getKaryawanById = async (id) => {
        try {
            const response = await detailKaryawan({ id });
            setKaryawanById(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onReset = () => {
        formik.resetForm()
    }


    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Karyawan" subtitle="Menampilkan semua data karyawan yang tersedia pada platform ini" icon={Users} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/karyawan/create"><Plus className="size-5" />Tambah Karyawan</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIK</TableHead>
                                <TableHead>Jenis Kelamin</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Tgl Masuk</TableHead>
                                <TableHead>Departemen</TableHead>
                                <TableHead>Jabatan</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
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
                                                <form className="space-y-4 max-h-[450px] overflow-y-scroll" onSubmit={formik.handleSubmit}>

                                                    <Card>
                                                        <CardContent >
                                                            <CardTitle className="pb-4 flex lg:flex-row flex-col items-start lg:justify-between">
                                                                <h1 className="text-base font-semibold">Informasi Karyawan</h1>
                                                                <p className="text-sm text-muted-foreground">NIK: {karyawanById.nik}</p>
                                                            </CardTitle>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                                                                {/* Nama */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="name">Nama</Label>
                                                                        <Input id="name" name="nama" type="text" placeholder="Masukkan Nama Lengkap..." onChange={handleForm} value={formik.values.nama} />
                                                                    </div>
                                                                    {formik.errors.nama && (
                                                                        <span className="text-sm text-destructive">{formik.errors.nama}</span>
                                                                    )}
                                                                </div>

                                                                {/* NIK */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="ktp">KTP</Label>
                                                                        <Input id="ktp" name="ktp" type="number" placeholder="Masukkan ktp..." onChange={handleForm} value={formik.values.ktp} />
                                                                    </div>
                                                                    {formik.errors.ktp && (
                                                                        <span className="text-sm text-destructive">{formik.errors.ktp}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="bpjs_kesehatan">BPJS Kesehatan</Label>
                                                                        <Input id="bpjs_kesehatan" name="bpjs_kesehatan" type="number" placeholder="Masukkan no bpjs kesehatan..." onChange={handleForm} value={formik.values.bpjs_kesehatan} />
                                                                    </div>
                                                                    {formik.errors.bpjs_kesehatan && (
                                                                        <span className="text-sm text-destructive">{formik.errors.bpjs_kesehatan}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="bpjs_ketenagakerjaan">BPJS Ketengakerjaan</Label>
                                                                        <Input id="bpjs_ketenagakerjaan" name="bpjs_ketenagakerjaan" type="number" placeholder="Masukkan no bpjs kesehatan..." onChange={handleForm} value={formik.values.bpjs_ketenagakerjaan} />
                                                                    </div>
                                                                    {formik.errors.bpjs_ketenagakerjaan && (
                                                                        <span className="text-sm text-destructive">{formik.errors.bpjs_ketenagakerjaan}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="npwp">NPWP</Label>
                                                                        <Input id="npwp" name="npwp" type="number" placeholder="Masukkan NPWP..." onChange={handleForm} value={formik.values.npwp} />
                                                                    </div>
                                                                    {formik.errors.npwp && (
                                                                        <span className="text-sm text-destructive">{formik.errors.npwp}</span>
                                                                    )}
                                                                </div>


                                                                {/* Field Lain */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                                                        <Select
                                                                            name="jenis_kelamin"
                                                                            onValueChange={(value) => formik.setFieldValue("jenis_kelamin", value)}
                                                                            value={formik.values.jenis_kelamin}
                                                                        >
                                                                            <SelectTrigger className="w-full" id="jenis_kelamin">
                                                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="P">Perempuan</SelectItem>
                                                                                <SelectItem value="L">Laki-laki</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>

                                                                    </div>
                                                                    {formik.errors.jenis_kelamin && (
                                                                        <span className="text-sm text-destructive">{formik.errors.jenis_kelamin}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                                                        <Input id="tempat_lahir" name="tempat_lahir" type="text" placeholder="Masukkan Tempat Lahir..." onChange={handleForm} value={formik.values.tempat_lahir} />
                                                                    </div>
                                                                    {formik.errors.tempat_lahir && (
                                                                        <span className="text-sm text-destructive">{formik.errors.tempat_lahir}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant={"outline"}
                                                                                    className={`w-full justify-between text-left font-normal ${!formik.values.tgl_lahir && "text-muted-foreground"
                                                                                        }`}
                                                                                >
                                                                                    {formik.values.tgl_lahir
                                                                                        ? format(formik.values.tgl_lahir, "dd MMM yyyy")
                                                                                        : "Pilih tanggal"}
                                                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0">
                                                                                <Calendar
                                                                                    mode="single"
                                                                                    selected={formik.values.tgl_lahir}
                                                                                    onSelect={(date) => formik.setFieldValue("tgl_lahir", date)}
                                                                                    disabled={(date) =>
                                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                                    }
                                                                                    captionLayout="dropdown"
                                                                                />
                                                                            </PopoverContent>
                                                                        </Popover>



                                                                    </div>
                                                                    {formik.errors.tgl_lahir && (
                                                                        <span className="text-sm text-destructive">{formik.errors.tgl_lahir}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="status_kawin">Status Kawin</Label>
                                                                        <Select
                                                                            name="status_kawin"
                                                                            onValueChange={(value) => formik.setFieldValue("status_kawin", value)}
                                                                            value={formik.values.status_kawin}
                                                                        >
                                                                            <SelectTrigger className="w-full" id="status_kawin">
                                                                                <SelectValue placeholder="Pilih Status" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="L">Lajang</SelectItem>
                                                                                <SelectItem value="M">Menikah</SelectItem>
                                                                                <SelectItem value="C">Cerai</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>

                                                                    </div>
                                                                    {formik.errors.status_kawin && (
                                                                        <span className="text-sm text-destructive">{formik.errors.status_kawin}</span>
                                                                    )}
                                                                </div>
                                                                {/* <div className="flex flex-col gap-y-1.5">
                                        <div className="grid gap-y-3">
                                            <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={`w-full justify-between text-left font-normal ${!formik.values.tgl_lahir && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {formik.values.tgl_lahir
                                                            ? format(formik.values.tgl_lahir, "dd MMM yyyy")
                                                            : "Pilih tanggal"}
                                                        <CalendarIcon className="mr-2 h-4 w-4" />

                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                   
                                                    <Calendar
                                                        mode="single"
                                                        selected={formik.values.tgl_lahir}
                                                        onSelect={(date) => formik.setFieldValue("tgl_lahir", date)}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>



                                        </div>
                                        {formik.errors.tgl_lahir && (
                                            <span className="text-sm text-destructive">{formik.errors.tgl_lahir}</span>
                                        )}
                                    </div> */}
                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="alamat">Alamat</Label>
                                                                        <Textarea
                                                                            id="alamat"
                                                                            name="alamat"
                                                                            value={formik.values.alamat}
                                                                            onChange={formik.handleChange}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.alamat && (
                                                                        <span className="text-sm text-destructive">{formik.errors.alamat}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="alamat">Alamat Domisili</Label>
                                                                        <Textarea
                                                                            id="alamat_domisili"
                                                                            name="alamat_domisili"
                                                                            value={formik.values.alamat_domisili}
                                                                            onChange={formik.handleChange}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.alamat_domisili && (
                                                                        <span className="text-sm text-destructive">{formik.errors.alamat_domisili}</span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardContent >
                                                            <CardTitle className="pb-4">Informasi Pekerjaan</CardTitle>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                                {/* Nama */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="id_jabatan">Jabatan</Label>
                                                                        <Select
                                                                            name="id_jabatan"
                                                                            onValueChange={(value) => formik.setFieldValue("id_jabatan", parseInt(value))}
                                                                            value={formik.values.id_jabatan?.toString()}
                                                                        >
                                                                            <SelectTrigger className="w-full" id="id_jabatan">
                                                                                <SelectValue placeholder="Pilih Jabatan" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {jabatan.map((item) => (
                                                                                    <SelectItem key={item.id} value={String(item.id)}>{item.nama}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>

                                                                    </div>
                                                                    {formik.errors.id_jabatan && (
                                                                        <span className="text-sm text-destructive">{formik.errors.id_jabatan}</span>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="id_departemen">Departemen</Label>
                                                                        <Select
                                                                            name="id_departemen"
                                                                            onValueChange={(value) => formik.setFieldValue("id_departemen", parseInt(value))}
                                                                            value={formik.values.id_departemen?.toString()}
                                                                        >
                                                                            <SelectTrigger className="w-full" id="id_departemen">
                                                                                <SelectValue placeholder="Pilih Departemen" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {departmen.map((item) => (
                                                                                    <SelectItem key={item.id} value={String(item.id)}>{item.nama}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>

                                                                    </div>
                                                                    {formik.errors.id_departemen && (
                                                                        <span className="text-sm text-destructive">{formik.errors.id_departemen}</span>
                                                                    )}
                                                                </div>

                                                                {/* Field Lain */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="tgl_masuk">Tanggal Masuk</Label>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant={"outline"}
                                                                                    className={`w-full justify-between text-left font-normal ${!formik.values.tgl_masuk && "text-muted-foreground"
                                                                                        }`}
                                                                                >
                                                                                    {formik.values.tgl_masuk
                                                                                        ? format(formik.values.tgl_masuk, "dd MMM yyyy")
                                                                                        : "Pilih tanggal"}
                                                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0">
                                                                                {/* <Calendar
                                                                                    mode="single"
                                                                                    selected={formik.values.tgl_masuk}
                                                                                    onSelect={(date) => formik.setFieldValue("tgl_masuk", date)}
                                                                                    initialFocus
                                                                                /> */}
                                                                                <Calendar
                                                                                    mode="single"
                                                                                    selected={formik.values.tgl_masuk}
                                                                                    onSelect={(date) => formik.setFieldValue("tgl_masuk", date)}
                                                                                    disabled={(date) =>
                                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                                    }
                                                                                    captionLayout="dropdown"
                                                                                />
                                                                            </PopoverContent>
                                                                        </Popover>



                                                                    </div>
                                                                    {formik.errors.tgl_masuk && (
                                                                        <span className="text-sm text-destructive">{formik.errors.tgl_masuk}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardContent >
                                                            <CardTitle className="pb-4">Dokumen</CardTitle>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                                {/* KTP */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="file_ktp">KTP</Label>
                                                                        <Input
                                                                            id="file_ktp"
                                                                            name="file_ktp"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_ktp && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_ktp}</span>
                                                                    )}
                                                                    {karyawanById?.file_ktp &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_ktp}`} alt="" />
                                                                    }
                                                                </div>

                                                                {/* Foto Karyawan */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">

                                                                        <Label htmlFor="file_foto">Foto Karyawan</Label>
                                                                        <Input
                                                                            id="file_foto"
                                                                            name="file_foto"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_foto && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_foto}</span>
                                                                    )}
                                                                    {karyawanById?.file_foto &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_foto}`} alt="" />
                                                                    }
                                                                </div>

                                                                {/* NPWP */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="file_npwp">NPWP</Label>
                                                                        <Input
                                                                            id="file_npwp"
                                                                            name="file_npwp"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_npwp && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_npwp}</span>
                                                                    )}
                                                                    {karyawanById?.file_npwp &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_npwp}`} alt="" />
                                                                    }
                                                                </div>

                                                                {/* BPJS Kesehatan */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="file_bpjs_kesehatan">BPJS Kesehatan</Label>
                                                                        <Input
                                                                            id="file_bpjs_kesehatan"
                                                                            name="file_bpjs_kesehatan"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_bpjs_kesehatan && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_bpjs_kesehatan}</span>
                                                                    )}
                                                                    {karyawanById?.file_bpjs_kesehatan &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_bpjs_kesehatan}`} alt="foto bpjs kesehatan" />
                                                                    }
                                                                </div>

                                                                {/* BPJS Ketenagakerjaan */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="file_bpjs_ketenagakerjaan">BPJS Ketenagakerjaan</Label>
                                                                        <Input
                                                                            id="file_bpjs_ketenagakerjaan"
                                                                            name="file_bpjs_ketenagakerjaan"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_bpjs_ketenagakerjaan && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_bpjs_ketenagakerjaan}</span>
                                                                    )}
                                                                    {karyawanById?.file_bpjs_ketenagakerjaan &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_bpjs_ketenagakerjaan}`} alt="" />
                                                                    }
                                                                </div>

                                                                {/* Ijazah */}
                                                                <div className="flex flex-col gap-y-1.5">
                                                                    <div className="grid gap-y-3">
                                                                        <Label htmlFor="file_ijazah">Ijazah</Label>
                                                                        <Input
                                                                            id="file_ijazah"
                                                                            name="file_ijazah"
                                                                            type="file"
                                                                            onChange={handleForm}
                                                                        />
                                                                    </div>
                                                                    {formik.errors.file_ijazah && (
                                                                        <span className="text-sm text-destructive">{formik.errors.file_ijazah}</span>
                                                                    )}
                                                                    {karyawanById?.file_ijazah &&
                                                                        <img src={`${ImageURL}${karyawanById?.file_ijazah}`} alt="" />
                                                                    }
                                                                </div>
                                                            </div>

                                                        </CardContent>
                                                    </Card>


                                                    <div className="flex justify-end gap-x-2 mt-10">
                                                        <DialogClose asChild >
                                                            <Button variant="outline" ref={closeDialogRef}>Cancel</Button>
                                                        </DialogClose>
                                                        <Button variant="secondary" type="button" size="default" onClick={onReset}>Reset</Button>
                                                        <Button variant="blue" type="submit" size="default" disabled={formik.isSubmitting}>Save</Button>
                                                    </div>
                                                </form>
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
                </CardContent>
            </Card>
        </div>
    )
}

export default PageKaryawan