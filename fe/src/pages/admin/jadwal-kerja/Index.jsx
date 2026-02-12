import { useEffect, useState } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { Dialog, DialogTrigger } from "../../../Components/ui/dialog";
import { BriefcaseBusiness, Pencil, Plus } from "lucide-react";
import { getJadwalKerja } from "../../../service/JadwalKerjaService";
import { useJadwalKerja } from "../../../hooks/useJadwalKerja";



const ListJadwalKerja = ({ title }) => {
    usePageTitle(title);

    const { jadwalKerja, loading, error, handleGetJadwalKerja } = useJadwalKerja();

    useEffect(() => {
        handleGetJadwalKerja();
    }, []);

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Jadwal Kerja" subtitle="Menampilkan semua data jadwal kerja yang tersedia pada platform ini" icon={BriefcaseBusiness} />
                <Button variant="blue" size="lg" asChild>
                    <Link to="/admin/jadwal-kerja/create"><Plus className="size-5" />Tambah Jadwal</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Jam Kerja</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jadwalKerja.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.karyawan.nama}</TableCell>
                                    <TableCell>{item.schedule_date}</TableCell>
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
                                            {/* <DialogContent className="sm:max-w-[425px]">
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
                                            </DialogContent> */}
                                        </Dialog>
                                        {/* <AlertDialog>
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
                                        </AlertDialog> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default ListJadwalKerja