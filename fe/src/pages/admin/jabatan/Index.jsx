import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { BriefcaseBusiness, Pencil, Plus, SearchIcon, Trash } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
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
import * as yup from 'yup'
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group";
import noDataImg from "@/assets/img/no_data.svg";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useApiError } from "../../../hooks/useApiError";
import { useJabatan } from "../../../modules/jabatan/useJabatan";

const ListJabatan = ({ title }) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [search, setSearch] = useState("");
    const handleApiError = useApiError();

    const [jabatanById, setJabatanById] = useState({});
    const { jabatanList, setJabatanList, isLoading, error, getJabatanById, handleGetJabatan, handleDeleteJabatan, handleUpdateJabatan } = useJabatan();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetJabatan({ search });
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        if (error) {
            handleApiError(error);
        }
    }, [error]);



    const handleGetJabatanById = (id) => {
        const data = getJabatanById(id);
        // console.log(data)
        setJabatanById(data);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nama: jabatanById?.nama || '',
        },
        onSubmit: async (values, actions) => {
            console.log('🔵 [SUBMIT START]', {
                timestamp: new Date().toISOString(),
                jabatanId: jabatanById.id,
                oldNama: jabatanById.nama,
                newNama: values.nama
            });

            try {
                console.log('🟡 [CALLING API]', { id: jabatanById.id, nama: values.nama });

                const response = await handleUpdateJabatan({
                    id: jabatanById.id,
                    ...values
                });

                console.log('🟢 [API SUCCESS]', response);

                if (!response || !response.data) {
                    throw new Error('Update gagal');
                }

                toast.success(response.data.message);

                setTimeout(() => {
                    console.log('🔵 [CLOSING DIALOG]');
                    closeDialogRef.current?.click();
                }, 1000);

            } catch (err) {
                console.error('🔴 [API ERROR]', {
                    error: err,
                    type: err.type,
                    message: err.message,
                    timestamp: new Date().toISOString()
                });
                handleApiError(err);
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required('Nama Jabatan wajib diisi'),
        })
    });

    const handleForm = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);

    }

    const onDelete = async (id) => {
        try {
            const response = await handleDeleteJabatan({ id });
            // setData(prev => prev.filter(item => item.id !== id));
            // console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col w-full pb-32 gap-4">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Jabatan" subtitle="Menampilkan semua data departmen yang tersedia pada platform ini" icon={BriefcaseBusiness} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/jabatan/create"><Plus className="size-5" />Tambah Jabatan</Link>
                </Button>
            </div>
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-4">
                <InputGroup className="col-span-6 lg:col-span-2 bg-white">
                    <InputGroupInput placeholder="Search..." onChange={handleSearch} value={search} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div className="overflow-hidden rounded-md border bg-white [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:whitespace-nowrap [&_th]:px-6 ">
                <Table className="w-full">
                    <TableHeader className="bg-slate-200">
                        <TableRow>

                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Nama

                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Dibuat Pada

                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Pembuat

                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex flex-row items-center gap-2">
                                    Aksi
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        size="sm"
                                        onClick={() => onSortable('id')}
                                    >
                                    </Button>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>


                        {typeof error === 'string' ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center p-10">
                                    <img src={noDataImg} alt="No Data" className="mx-auto w-20" />
                                    <p className="mt-4 text-sm text-muted-foreground">{error}</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            jabatanList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{formatDate(item.created_at)}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="yellow" size="sm" onClick={() => handleGetJabatanById(item.id)}>
                                                    <Pencil className="size-4" />
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
                                                            <Button variant="outline" ref={closeDialogRef}>Kembali</Button>
                                                        </DialogClose>
                                                        <Button type="submit" disabled={formik.isSubmitting}>
                                                            {formik.isSubmitting ? "Loading..." : "Simpan"}
                                                        </Button>
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

export default ListJabatan