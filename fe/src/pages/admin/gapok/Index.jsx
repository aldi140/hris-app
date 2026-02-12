import { use, useActionState, useEffect, useRef, useState } from "react";
import { useDepartmen } from "../../../hooks/useDepartmen";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { BriefcaseBusiness, Building, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { formatDate } from "../../../lib/utils";
import { toast } from "sonner";
import { useGapok } from "../../../hooks/useGapok";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import { InputGroup } from "../../../Components/ui/inputGroup"
import { detailGapok, getGapok, updateGapok } from "../../../service/gapokService";
import * as yup from 'yup'
import { Formik, useFormik } from "formik";

const ListGapok = ({ title }) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [data, setData] = useState([]);
    const [gapokById, setGapokById] = useState({});
    const { hanldeGetGapok, handleDeleteGapok } = useGapok();
    useEffect(() => {

        const fetchDepartmen = async () => {
            const response = await getGapok();
            setData(response.data.data);
        }
        fetchDepartmen();
    }, []);

    const getGapokById = async (id) => {
        try {
            const response = await detailGapok({ id });
            setGapokById(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            golongan: gapokById?.golongan || '',
            gapok: gapokById?.gapok || '',
            tgl_aktif: gapokById?.tgl_aktif || '',
            status: gapokById?.status || '',
        },
        onSubmit: async (values, actions) => {
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

            try {
                const response = await updateGapok({
                    id: gapokById.id,
                    data: formData
                })

                toast.success(response.data.message);
                console.log(response);

                setData(prev => prev.map(item => item.id === gapokById.id ? { ...item, ...values } : item))

                setTimeout(() => {
                    closeDialogRef.current?.click()
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            gapok: yup.string().required('Gaji Pokok wajib diisi'),
        })
    })

    const handleForm = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);

    }


    const onDelete = async (id) => {
        try {
            const response = await handleDeleteGapok({ id });
            setData(prev => prev.filter(item => item.id !== id));
            // console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Gaji Pokok Karyawan" subtitle="Menampilkan semua data gaji pokok yang tersedia pada platform ini" icon={BriefcaseBusiness} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/gapok/create"><Plus className="size-5" />Tambah Gapok</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Golongan</TableHead>
                                <TableHead>Gaji Pokok</TableHead>
                                <TableHead>Tgl. Aktif</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>User at</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.golongan}</TableCell>
                                    <TableCell>{item.gapok}</TableCell>
                                    <TableCell>{item.tgl_aktif}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="yellow" size="sm" onClick={() => getGapokById(item.id)}>
                                                    <Pencil className="size-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <form onSubmit={formik.handleSubmit}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Gapok</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Gaji Pokok disini, klik save untuk menyimpan.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="nama">Nama</Label>
                                                            <Input id="nama" name="nama" value={formik.values.nama} onChange={handleForm} />
                                                            {formik.errors.nama && (
                                                                <span className="text-sm text-destructive">{formik.errors.nama}</span>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="start_time">Jam Masuk</Label>
                                                            <Input type="time" name="start_time" step="1" value={formik.values.start_time} className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" onChange={handleForm} />
                                                            {formik.errors.start_time && (
                                                                <span className="text-sm text-destructive">{formik.errors.start_time}</span>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="end_time">Jam Keluar</Label>
                                                            <Input type="time" name="end_time" step="1" value={formik.values.end_time} className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" onChange={handleForm} />
                                                            {formik.errors.end_time && (
                                                                <span className="text-sm text-destructive">{formik.errors.end_time}</span>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="jumlah_jam">Jam Kerja</Label>
                                                            <InputGroup
                                                                type="number"
                                                                name="jumlah_jam"
                                                                value={formik.values.jumlah_jam}
                                                                placeholder="0"
                                                                inputright={'Jam'}
                                                                onChange={handleForm}
                                                            />
                                                            {formik.errors.jumlah_jam && (
                                                                <span className="text-sm text-destructive">{formik.errors.jumlah_jam}</span>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="break_minutes">Istirahat</Label><InputGroup
                                                                type="number"
                                                                name="break_minutes"
                                                                value={formik.values.break_minutes}
                                                                placeholder="0"
                                                                inputright={'Jam'}
                                                                onChange={handleForm}
                                                            />
                                                            {formik.errors.break_minutes && (
                                                                <span className="text-sm text-destructive">{formik.errors.break_minutes}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <DialogFooter className='mt-4'>
                                                        <DialogClose asChild >
                                                            <Button variant="outline" ref={closeDialogRef}>Cancel</Button>
                                                        </DialogClose>
                                                        <Button type="submit">Save changes</Button>
                                                    </DialogFooter>
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

export default ListGapok