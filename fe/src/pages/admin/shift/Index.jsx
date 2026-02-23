import { useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { BriefcaseBusiness, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { toast } from "sonner";
import { useShift } from "../../../modules/shift/useShift";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import * as yup from 'yup'
import { Formik, useFormik } from "formik";
import { MyInputGroup } from "../../../Components/ui/myInputGroup";

const ListShift = ({ title }) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [shiftById, setShiftById] = useState({});
    const { shiftList, loading, error, hanldeGetShift, handleDetailShift, handleDeleteShift } = useShift();

    useEffect(() => {
        hanldeGetShift();
    }, []);


    const getShiftById = async (id) => {
        try {
            const response = await handleDetailShift({ id });
            setShiftById(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nama: shiftById?.nama || '',
            start_time: shiftById?.start_time || '',
            end_time: shiftById?.end_time || '',
            break_minutes: shiftById?.break_minutes || '',
            jumlah_jam: shiftById?.jumlah_jam || '',
            is_active: 1,
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
                const response = await updateShift({
                    id: shiftById.id,
                    data: formData
                })

                toast.success(response.data.message);
                console.log(response);

                setData(prev => prev.map(item => item.id === shiftById.id ? { ...item, ...values } : item))

                setTimeout(() => {
                    closeDialogRef.current?.click()
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required('Nama Shift wajib diisi'),
        })
    })

    const handleForm = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);

    }


    const onDelete = async (id) => {
        try {
            const response = await handleDeleteShift({ id });
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
                <HeaderTitle title="Shift Karyawan" subtitle="Menampilkan semua data shift yang tersedia pada platform ini" icon={BriefcaseBusiness} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/shift/create"><Plus className="size-5" />Tambah Shift</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-md border bg-white [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:whitespace-nowrap [&_th]:px-6">
                <Table className="w-full">

                    <TableHeader className="bg-slate-200 ">
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jam Masuk</TableHead>
                            <TableHead>Jam Keluar</TableHead>
                            <TableHead>Jam Kerja</TableHead>
                            <TableHead>Istirahat</TableHead>
                            <TableHead>User at</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center p-10">
                                    <img src={noDataImg} alt="No Data" className="mx-auto w-20" />
                                    <p className="mt-4 text-sm text-muted-foreground">{error}</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            shiftList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{item.start_time}</TableCell>
                                    <TableCell>{item.end_time}</TableCell>
                                    <TableCell>{item.jumlah_jam}</TableCell>
                                    <TableCell>{item.break_minutes}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="yellow" size="sm" onClick={() => getShiftById(item.id)}>
                                                    <Pencil className="size-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <form onSubmit={formik.handleSubmit}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Shift</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Shift disini, klik save untuk menyimpan.
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
                                                            <MyInputGroup
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
                                                            <Label htmlFor="break_minutes">Istirahat</Label><MyInputGroup
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ListShift