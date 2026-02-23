import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { getMonthDate } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../../ui/dialog";
import { Field, FieldGroup } from "../../../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../ui/select";
import { Badge } from "../../../ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { ChevronLeft, ChevronRight, Trash, Trash2 } from "lucide-react";
import { set } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../ui/alert-dialog";

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function MyCalendar({
    events = [],
    dataShift = [],
    dataKaryawan = {},
    onSubmit,
    onMonthChange,
}) {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [currentMonth, setCurrentMonth] = useState(currentDate.format("M"));
    const [yearCurrent, setYearCurrent] = useState(currentDate.format("YYYY"));
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedShift, setSelectedShift] = useState("");
    const debounceRef = useRef(null);

    const weeks = getMonthDate(currentDate);

    console.log('weeks', weeks)


    console.log('events', events);

    const handleDayClick = (day, eventsForDay) => {
        setSelectedDate(day);

        if (eventsForDay.length > 0) {
            const event = eventsForDay[0];
            setSelectedEvent(event);
            setSelectedShift(event.shift_id);
        } else {
            setSelectedEvent(null);
            setSelectedShift("");
        }

        setOpen(true);
    };

    const handleSave = () => {
        if (!selectedShift || !selectedDate) return;

        const payload = {
            shift_id: selectedShift,
            schedule_date: selectedDate.format("YYYY-MM-DD"),
            id_karyawan: dataKaryawan.id
        };

        if (selectedEvent) {
            payload.id = selectedEvent.id;
        }
        console.log('payload', payload)
        onSubmit(payload, selectedEvent ? "edit" : "create", currentMonth, yearCurrent);
        setOpen(false);
    };


    const handleDelete = (id) => {
        console.log("id", id, "Month", currentMonth, "Year", yearCurrent);
        onSubmit(id, "delete", currentMonth, yearCurrent);
    };

    const handleNextMonth = () => {
        const newDate = currentDate.add(1, "month");
        // console.log('newDate', newDate)
        setCurrentDate(newDate);
        setCurrentMonth(newDate.format("M"));
        setYearCurrent(newDate.format("YYYY"));
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onMonthChange(newDate), 500);
    };

    const handlePrevMonth = () => {
        const newDate = currentDate.subtract(1, "month");
        setCurrentDate(newDate);
        setCurrentMonth(newDate.format("M"));
        setYearCurrent(newDate.format("YYYY"));
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onMonthChange(newDate), 500);
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2 text-sm">
                <InfoRow label="Nama" value={dataKaryawan?.nama} />
                <InfoRow label="NIK" value={dataKaryawan?.nik} />
                <InfoRow label="Departemen" value={dataKaryawan?.departemen?.nama} />
                <InfoRow label="Kantor" value={dataKaryawan?.kantor?.kantor} />
            </div>

            {/* Kalender */}
            <div>
                <div className="flex items-center justify-center mb-4 gap-4">
                    <Button size="sm" variant="outline" onClick={handlePrevMonth}>
                        <ChevronLeft />
                    </Button>

                    <div className="font-semibold">
                        {currentDate.format("MMMM YYYY")}
                    </div>

                    <Button size="sm" variant="outline" onClick={handleNextMonth}>
                        <ChevronRight />
                    </Button>
                </div>

                <Table className="w-full overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            {DAY_NAMES.map(day => {
                                const isSunday = day === "Min";
                                const isSaturday = day === "Sab";
                                return (
                                    <TableHead
                                        key={day}
                                        className={`${isSunday ? "bg-red-50 text-red-500" : isSaturday ? "bg-orange-50 text-orange-500" : ""} text-center border`}
                                    >
                                        {day}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {weeks.map((week, i) => (
                            <TableRow key={i}>
                                {week.map(day => {
                                    const isCurrentMonth = day.month() === currentDate.month();
                                    const dateKey = day.format("YYYY-MM-DD");
                                    const isSunday = day.day() === 0;
                                    const isSaturday = day.day() === 6;
                                    const eventsForDay = events
                                        .filter(e => e.schedule_date === dateKey)
                                        .map(e => ({
                                            ...e,
                                            shiftDetail: dataShift.find(s => s.id === e.shift_id)
                                        }));

                                    console.log('eventsForDay', eventsForDay)

                                    return (
                                        <TableCell
                                            key={dateKey}
                                            onClick={() => isCurrentMonth && handleDayClick(day, eventsForDay)}
                                            className={`align-top border cursor-pointer h-28 min-w-30 overflow-visible
                                               ${!isCurrentMonth
                                                    ? "bg-neutral-200 text-gray-400 cursor-not-allowed"
                                                    : isSunday
                                                        ? "bg-red-50 hover:bg-red-100 "
                                                        : isSaturday
                                                            ? "bg-orange-50 hover:bg-orange-100 "

                                                            : "hover:bg-neutral-100 cursor-pointer"
                                                }`}
                                        >
                                            <div className={`text-xs font-semibold 
                                                                ${isSunday && isCurrentMonth ? "text-red-500" : ""}
                                                            `}>
                                                {day.date()}
                                            </div>

                                            {eventsForDay.length > 0 ? (
                                                <div className="mt-1 p-2 bg-indigo-100 rounded-md flex flex-col gap-4 relative">
                                                    <Badge variant="blue">
                                                        {eventsForDay[0].shiftDetail?.nama}
                                                    </Badge>
                                                    <p className="text-xs">
                                                        {eventsForDay[0].shiftDetail?.start_time} - {eventsForDay[0].shiftDetail?.end_time}
                                                    </p>
                                                    <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                                                        <AlertDialog >
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="outline" size="xs"><Trash2 size={16} /></Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Anda akan menghapus jadwal kerja pada tanggal {day.format("DD MMMM YYYY")}
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(eventsForDay[0].id)}>Ya, Hapus</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-gray-400 mt-1">-</div>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDate?.format("DD MMMM YYYY")}
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Select value={selectedShift} onValueChange={setSelectedShift}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataShift.map(shift => (
                                        <SelectItem key={shift.id} value={shift.id}>
                                            {shift.nama} ({shift.start_time} - {shift.end_time})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-4 lg:col-span-2">{label}</div>
                <div className="col-span-1">:</div>
                <div className="col-span-7 lg:col-span-2">{value || "-"}</div>
            </div>
            <hr />
        </>
    );
}
