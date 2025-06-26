import { useEffect, useState } from "react";
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
const ListJabatan = ({title}) => {
    usePageTitle(title);
    const [data, setData] = useState([]);
    const { hanldeGetJabatan, handleDeleteJabatan } = useJabatan();
    useEffect(() => {
        fetchDepartmen();
    }, []);
    const fetchDepartmen = async () => {
        const response = await hanldeGetJabatan();
        setData(response.data.data);
        console.log(response.data.data);
    };

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
                                        <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button>
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