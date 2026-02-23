import { useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Building, Pencil, Plus, SearchIcon, Trash } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";
import { formatDate } from "../../../lib/utils";
import { toast } from "sonner";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import * as yup from 'yup'
import { useFormik } from "formik";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../Components/ui/input-group";
import noDataImg from "@/assets/img/no_data.svg";
import { useApiError } from "../../../hooks/useApiError";
import { useDepartmen } from "../../../modules/departmen/useDepartmen";



const DepartmenList = ({ title }) => {
    usePageTitle(title);
    const closeDialogRef = useRef(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const handleApiError = useApiError();
    const [departmenById, setDepartmenById] = useState({});
    const { departmenList, isLoading, error, handleGetDepartmen, handleUpdateDepartmen, getDepartmenById, handleDeleteDepartmen } = useDepartmen();
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            handleGetDepartmen({ search });
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        if (error) {
            console.log(error)
            handleApiError(error);
        }
    }, [error]);

    const handleGetDepartmenById = (id) => {
        const data = getDepartmenById(id);
        // console.log(data)
        setDepartmenById(data);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nama: departmenById?.nama || '',
        },
        onSubmit: async (values, actions) => {
            // console.log({data:{...values}});
            try {
                const response = await handleUpdateDepartmen({
                    id: departmenById.id,
                    ...values
                })

                toast.success(response.data.message);

                setTimeout(() => {
                    closeDialogRef.current?.click()
                }, 1000)
            } catch (error) {
                console.log(error)
                handleApiError(error);
            } finally {
                actions.setSubmitting(false);
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
            // console.error(error); 
        }

    }
    return (
        <div className="flex flex-col w-full pb-32 gap-4">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Departmen" subtitle="Menampilkan semua data departmen yang tersedia pada platform ini" icon={Building} />


                <Button variant="blue" size="lg" asChild>
                    <Link to="/departmen/create"><Plus className="size-5" />Tambah Departmen</Link>
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
            <div className="overflow-hidden rounded-md border bg-white [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:whitespace-nowrap [&_th]:px-6">
                <Table className="w-full">
                    <TableHeader className="bg-slate-200 ">
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
                            departmenList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{formatDate(item.created_at)}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger asChild >
                                                <Button variant="yellow" size="sm" onClick={() => handleGetDepartmenById(item.id)}>
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
                                                            <Button variant="outline" ref={closeDialogRef}>Batal</Button>
                                                        </DialogClose>
                                                        <Button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? 'Loading...' : 'Simpan'}</Button>
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

export default DepartmenList