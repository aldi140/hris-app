import { useCallback, useEffect, useRef, useState } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { Building2Icon, Eye, LucideEllipsis, LucideSend, PencilIcon, Plus, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../Components/ui/dropdown-menu";
import Paginations from "../../../Components/commons/moleculs/Pagination";
import { useOffice } from "../../../modules/office/useOffice";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../Components/ui/dialog";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import { Textarea } from "../../../Components/ui/textarea";
import { useFormik } from "formik";
import * as yup from 'yup'
import ImagePreview from "../../../Components/commons/atoms/ImagePreview";
import { Separator } from "../../../Components/ui/separator";
import { toast } from "sonner";
import { locationMapUrl, locationMapUrlOffice } from "../../../lib/utils";

const ListOffice = ({ title }) => {
    usePageTitle(title);
    const contentReff = useRef(null);
    const [search, setSearch] = useState('');
    const [officeById, setOfficeById] = useState({});
    const closeDialogRef = useRef(null);
    const { officeList, page, setPage, lastPage, totalData, getOfficeById, handleGetOffice, handleUpdateOffice } = useOffice();
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [detailOpen, setDetailOpen] = useState(false)

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleGetOffice({ search, page });
        }, 500);
        return () => clearTimeout(debounce);
    }, [search, page]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            company: officeById?.company || '',
            kedudukan: officeById?.kedudukan || '',
            alias: officeById?.alias || '',
            kantor: officeById?.kantor || '',
            alamat: officeById?.alamat || '',
            tel: officeById?.tel || '',
            longitude: officeById?.longitude || '',
            latitude: officeById?.latitude || '',
        },
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: async (values, actions) => {

            const formData = new FormData();

            for (const key in values) {
                const value = values[key];
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            }

            console.log('values', values)
            console.log('formData', formData)

            try {

                const response = await handleUpdateOffice(
                    officeById.id,
                    formData,
                    values
                );

                console.log('🟢 [API SUCCESS]', response);

                toast.success(response.data.message);

                setTimeout(() => {
                    // console.log('🔵 [CLOSING DIALOG]');
                    closeDialogRef.current?.click();
                }, 1000);

            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    'Terjadi kesalahan';

                toast.error(message); // ✅ aman
            } finally {
                actions.setSubmitting(false);
            }
        },
        validationSchema: yup.object().shape({
            kantor: yup.string().required('Nama kantor wajib diisi'),
        })
    });

    const handleForm = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "tel") {
            formik.setFieldValue("tel", value.replace(/[^0-9]/g, ""), false)
        } else {
            formik.setFieldValue(name, value);
        }
    }, [])


    const handleGetOfficeById = (id) => {
        console.log(id)
        const data = getOfficeById(id);
        console.log(data)
        setOfficeById(data);
    };
    return (
        <div className="flex flex-col w-full pb-32 gap-4" ref={contentReff}>
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Kantor" subtitle="Menampilkan semua data kantor yang tersedia pada platform ini" icon={Building2Icon} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="#"><Plus className="size-5" />Tambah Kantor</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-2">
                {officeList.map((item, index) => (
                    <Card className="gap-4 relative flex flex-col" key={index}>
                        <CardHeader>
                            <div className="flex flex-row items-top justify-between gap-4">
                                <div className="flex flex-row items-start gap-4">
                                    <div className="p-3  bg-amber-100 text-amber-700 rounded-md">
                                        <Building2Icon className="size-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold">{item.kantor}</p>
                                        <p className="text-xs font-medium text-muted-foreground">{item.kota} - {item.tel}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="xs" variant="outline">
                                            <LucideEllipsis className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onSelect={() => {
                                                setDetailOpen(true)
                                                handleGetOfficeById(item.id)
                                            }}>
                                                <Eye />
                                                Detail
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onSelect={() => {
                                                handleGetOfficeById(item.id)
                                                setEditOpen(true)
                                            }}>
                                                <PencilIcon />
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        {/* 
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
                                                <TrashIcon />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup> */}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-12">
                            <p className="text-xs text-neutral-800">{item.alamat}</p>

                        </CardContent>
                        <a
                            href={locationMapUrl(item.latitude, item.longitude)}
                            target="_blank"
                            rel="noopener noreferrer"

                        >
                            <Button size="sm" variant="outline" className="absolute bottom-4 right-4 text-xs"><LucideSend />Lihat Lokasi</Button>
                        </a>

                    </Card>
                ))}
            </div>
            <Paginations
                lastPage={lastPage}
                page={page}
                onPageChange={(p) => {
                    setPage(p);
                    contentReff.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }}
            />

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-xl">
                    <form onSubmit={formik.handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edit Kantor</DialogTitle>
                            <DialogDescription>
                                Edit kantor disini, klik save untuk menyimpan.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col gap-3">
                                    <Label htmlFor="kantor">Nama Kantor</Label>
                                    <Input id="kantor" name="kantor" value={formik.values.kantor} onChange={handleForm} placeholder="Cabang Kisaran" />
                                    {/* {formik.errors.kantor && (
                                        <span className="text-sm text-destructive">{formik.errors.kantor}</span>
                                    )} */}
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <Label htmlFor="tel">No. Telepon</Label>
                                    <Input id="tel" name="tel" value={formik.values.tel} onChange={handleForm} type="tel" placeholder="08xxxxxxxxxx" />
                                    {/* {formik.errors.tel && (
                                        <span className="text-sm text-destructive">{formik.errors.tel}</span>
                                    )} */}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col gap-3">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input id="longitude" name="longitude" value={formik.values.longitude} onChange={handleForm} placeholder="99.0765" />
                                    {/* {formik.errors.longitude && (
                                        <span className="text-sm text-destructive">{formik.errors.longitude}</span>
                                    )} */}
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input id="latitude" name="latitude" value={formik.values.latitude} onChange={handleForm} placeholder="-2.9761" />
                                    {formik.errors.latitude && (
                                        <span className="text-sm text-destructive">{formik.errors.latitude}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col gap-3">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Textarea
                                        id="alamat"
                                        name="alamat"
                                        value={formik.values.alamat}
                                        onChange={handleForm}
                                        placeholder="Jl. Raya Kisaran No. 1, Kisaran, Kec. Kisaran, Kabupaten Asahan, Provinsi Sumatera Utara, Indonesia"
                                    />
                                    {/* {formik.errors.alamat && (
                                        <span className="text-sm text-destructive">{formik.errors.alamat}</span>
                                    )} */}
                                </div>
                            </div>
                        </div>


                        <DialogFooter className='mt-4'>
                            <DialogClose asChild >
                                <Button variant="outline" ref={closeDialogRef}>Kembali</Button>
                            </DialogClose>
                            <Button type="submit" disabled={formik.isSubmitting} >
                                {/* Simpan */}
                                {formik.isSubmitting ? "Loading..." : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail Kantor</DialogTitle>
                        <DialogDescription>
                            Informasi kantor yang ada di platoform ini
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col w-full text-center gap-1">
                            <div className="flex items-center justify-center w-full ">
                                <div className=" p-4 bg-amber-100 text-amber-700 rounded-md">
                                    <Building2Icon className="size-6" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">{officeById?.kantor}</h3>
                            <p className="text-sm">{officeById?.kedudukan} - {officeById?.tel}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="kantor">Provinsi</Label>
                                <p className="text-sm">{officeById?.provinsi}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="tel">Kabupaten</Label>
                                <p className="text-sm">{officeById?.kabupaten}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="kantor">Kecamatan</Label>
                                <p className="text-sm">{officeById?.kecamatan}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="tel">Kota</Label>
                                <p className="text-sm">{officeById?.kota}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <p className="text-sm">{officeById.longitude ? officeById.longitude : "-"}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="latitude">Latitude</Label>
                                <p className="text-sm">{officeById.latitude ? officeById.latitude : "-"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="latitude">Alamat</Label>
                                <p className="text-sm">{officeById?.alamat}</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className='mt-4'>
                        <DialogClose asChild >
                            <Button variant="outline" className="absolute bottom-4 right-4 text-xs"><LucideSend />Lihat Lokasi</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your office and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    )
}

export default ListOffice