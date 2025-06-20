import { useEffect, useState } from "react";
import { useDepartmen } from "../../hooks/useDepartmen";
import HeaderTitle from "../../Components/commons/atoms/HeaderTitle";
import { Building, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../Components/ui/alert-dialog";

const Departmen = () => {
    const [data, setData] = useState([]);
    const { getDepartmen } = useDepartmen();
    useEffect(() => {
        const fetchDepartmen = async () => {
            const response = await getDepartmen();
            console.log(response.data.data);
            setData(response.data.data);
        }
        fetchDepartmen();
    }, [])
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
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>{item.user_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="yellow" size="sm" asChild>
                                            <Link to={`/departmen/${item.id}`}> <Pencil /></Link>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    <Trash className="size-4"/> 
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        account and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => console.log('hapus departmen')}>Continue</AlertDialogAction>
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

export default Departmen