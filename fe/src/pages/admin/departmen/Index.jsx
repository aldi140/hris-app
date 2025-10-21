import { useEffect, useRef, useState } from "react";
import { useDepartmen } from "../../../hooks/useDepartmen";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Building, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { formatDate } from "../../../lib/utils";
import { toast } from "sonner";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import { departmen, detailDepertmen, updateDepertmen } from "../../../service/departmenService";
import * as yup from 'yup'
import { useFormik } from "formik";


const DepartmenList = ({ title }) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [data, setData] = useState([]);
    const [departmenById, setDepartmenById] = useState({});
    const { getDepartmen, handleDeleteDepartmen } = useDepartmen();
    useEffect(() => {

        const fetchDepartmen = async () => {
            const response = await getDepartmen();
            setData(response.data.data);
            console.log(response.data.data);
        }
        fetchDepartmen();
    }, [])

    const getDepartmenById = async (id) => {
        try {
            const response = await detailDepertmen({ id });
            setDepartmenById(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nama: departmenById?.nama || '',
        },
        onSubmit: async (values, actions) => {
            // console.log({data:{...values}});
            try {
                const response = await updateDepertmen({
                    id: departmenById.id,
                    ...values
                })

                toast.success(response.data.message);
                console.log(response);

                // update data lokal
                setData(prev => prev.map(item => item.id === departmenById.id ? { ...item, ...values } : item));

                setTimeout(() => {
                    closeDialogRef.current?.click()
                },1000)
            } catch (error) {
                console.log(error);
            }

        },
        validationSchema: yup.object().shape({
            nama: yup.string().required('Nama Departemen wajib diisi'),
        })
    })

    const handleForm = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);

    }

    const onDelete = async (id) => {
        try {
            const response = await handleDeleteDepartmen({ id }); // pastikan ini pakai await
            setData(prev => prev.filter(item => item.id !== id));
            console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            console.error(error);
        }

    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Departmen" subtitle="Menampilkan semua data departmen yang tersedia pada platform ini" icon={Building} />


                <Button variant="blue" size="lg" asChild>
                    <Link to="/departmen/create"><Plus className="size-5" />Tambah Departmen</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Dibuat pada</TableHead>
                                <TableHead>User at</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{formatDate(item.created_at)}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger asChild >
                                                <Button variant="yellow" size="sm" onClick={() => getDepartmenById(item.id)}>
                                                    {/* <Link to={`/departmen/${item.id}`}> </Link> */}
                                                    <Pencil className="size-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <form onSubmit={formik.handleSubmit}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Departmen</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Departmen disini, klik save untuk menyimpan.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 mt-3">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="nama">Nama Departmen</Label>
                                                            <Input id="nama" name="nama" value={formik.values.nama} onChange={handleForm} />
                                                            {formik.errors.nama && (
                                                                <span className="text-sm text-destructive">{formik.errors.nama}</span>
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

export default DepartmenList