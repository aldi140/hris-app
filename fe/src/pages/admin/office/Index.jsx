import { useEffect, useRef, useState } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { BriefcaseBusiness, Building2Icon, LucideEllipsis, LucideSend, PencilIcon, Plus, TrashIcon } from "lucide-react";
import { useOffice } from "../../../hooks/useOffice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../Components/ui/dropdown-menu";
import Paginations from "../../../Components/commons/moleculs/Pagination";

const ListOffice = ({ title }) => {
    usePageTitle(title);
    const contentReff = useRef(null);
    const [search, setSearch] = useState('');
    // const closeDialogRef = useRef(null);
    const { officeList, page, setPage, lastPage, totalData, handleGetOffice } = useOffice();

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleGetOffice({ search, page });
        }, 500);
        return () => clearTimeout(debounce);
    }, [search, page]);
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
                                            <DropdownMenuItem>
                                                <PencilIcon />
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem variant="destructive">
                                                <TrashIcon />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-12">
                            <p className="text-xs text-neutral-800">{item.alamat}</p>

                        </CardContent>
                        <Button size="xs" variant="outline" className="absolute bottom-4 right-4"><LucideSend />Lihat Lokasi</Button>
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
        </div>
    )
}

export default ListOffice