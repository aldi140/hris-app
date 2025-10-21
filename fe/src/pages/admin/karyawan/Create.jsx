import { BriefcaseBusiness, Building, CalendarIcon, MoveLeft, User, Users } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardTitle } from "../../../Components/ui/card"
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { useFormik } from "formik"

import * as yup from 'yup'
import { toast } from "sonner"
import { useJabatan } from "../../../hooks/useJabatan"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover"
import { Calendar } from "../../../Components/ui/calendar"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useDepartmen } from "../../../hooks/useDepartmen"
import { Textarea } from "../../../Components/ui/textarea"
import { addKaryawan } from "../../../service/karyawanService"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../../Components/ui/button"

const CreateKaryawan = ({ title }) => {
    usePageTitle(title)
    const [jabatan, setJabatan] = useState([])
    const [departmen, setDepartmen] = useState([])
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
        initialValues: {
            nama: '',
            ktp: '',
            bpjs_kesehatan: '',
            bpjs_ketenagakerjaan: '',
            npwp: '',
            ijazah: '',
            jenis_kelamin: '',
            tempat_lahir: '',
            tgl_lahir: '',
            alamat: '',
            alamat_domisili: '',
            status_kawin: '',
            status_karyawan: '',
            id_jabatan: null,
            id_departemen: null,
            tgl_masuk: '',
            file_foto: '',
            file_ktp: '',
            file_bpjs_kesehatan: '',
            file_bpjs_ketenagakerjaan: '',
            file_ijazah: '',
            file_npwp: '',
            file_sertifikat: ''
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
                const res = await addKaryawan(formData)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/karyawan')
                }, 1500)
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

    const onReset = () => {
        formik.resetForm()
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title="Tambah Karyawan"
                    subtitle="Buat karyawan baru di sini, lalu klik 'Simpan' setelah selesai."
                    icon={Users}
                />

                <Button variant="secondary" size="lg" asChild>
                    <Link to="/karyawan"><MoveLeft className="size-5" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <CardTitle className="pb-4 text-center text-xl">Data Karyawan</CardTitle>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <Card>
                            <CardContent >
                                <CardTitle className="pb-4">Informasi Karyawan</CardTitle>
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
                                    </div>
                                </div>

                            </CardContent>
                        </Card>


                        <div className="flex justify-end gap-x-2">
                            <Button variant="outline" type="button" size="lg" onClick={onReset}>Reset</Button>
                            <Button variant="blue" type="submit" size="lg" disabled={formik.isSubmitting}>Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};

export default CreateKaryawan