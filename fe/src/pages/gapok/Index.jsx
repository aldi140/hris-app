import { use, useActionState, useEffect, useRef, useState } from "react";
import { useDepartmen } from "../../hooks/useDepartmen";
import HeaderTitle from "../../Components/commons/atoms/HeaderTitle";
import { BriefcaseBusiness, Building, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../Components/ui/alert-dialog";
import { formatDate } from "../../lib/utils";
import { toast } from "sonner";
import { useJabatan } from "../../hooks/useJabatan";
import { usePageTitle } from "../../hooks/usePageTitle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../Components/ui/dialog";
import { Label } from "../../Components/ui/label";
import { Input } from "../../Components/ui/input";
import { detailJabatan, getJabatan, updateJabatan } from "../../service/jabatanService";
import * as yup from 'yup'
import { Formik, useFormik } from "formik";

const ListJabatan = ({title}) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [data, setData] = useState([]);
    const [jabatanById, setJabatanById] = useState({});
    const { hanldeGetJabatan, handleDeleteJabatan } = useJabatan();
    useEffect(() => {
        
        const fetchDepartmen = async () => {
            const response = await getJabatan();
            setData(response.data.data);
        }
        fetchDepartmen();
    }, []);

    const getJabatanById = async (id) => {
        try {
            const response = await detailJabatan({id});
            setJabatanById(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nama : jabatanById?.nama || '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await updateJabatan({
                    id: jabatanById.id,
                    ...values
                })

                toast.success(response.data.message);
                console.log(response);

                setTimeout(() => {
                    closeDialogRef.current?.click()
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required('Nama Jabatan wajib diisi'),
        })
    })

    const handleForm = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);

    }

    const onDelete = async (id) => {
        try {
            const response = await handleDeleteJabatan({ id }); 
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
                <HeaderTitle title="Jabatan" subtitle="Menampilkan semua data departmen yang tersedia pada platform ini" icon={BriefcaseBusiness } />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/jabatan/create"><Plus className="size-5" />Tambah Jabatan</Link>
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
                                            <DialogTrigger asChild>
                                                <Button variant="yellow" size="sm" onClick={() => getJabatanById(item.id)}>
                                                    <Pencil className="size-4"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <form onSubmit={formik.handleSubmit}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Jabatan</DialogTitle>
                                                        <DialogDescription>
                                                            Edit Jabatan disini, klik save untuk menyimpan.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="nama">Nama Jabatan</Label>
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

export default ListJabatan