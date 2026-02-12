import { useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function MyCalendar({
    events = [],
    dataShift = [],
    dataKaryawan = {},
    onSubmit
}) {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedShift, setSelectedShift] = useState("");

    const weeks = getMonthDate(currentDate);

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
        onSubmit(payload, selectedEvent ? "edit" : "create");
        setOpen(false);
    };

    const handleDelete = () => {
        onSubmit(selectedEvent.id, "delete");
        setOpen(false);
    };

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
                    <Button size="sm" variant="outline" onClick={() => setCurrentDate(d => d.subtract(1, "month"))}>
                        <ChevronLeft />
                    </Button>

                    <div className="font-semibold">
                        {currentDate.format("MMMM YYYY")}
                    </div>

                    <Button size="sm" variant="outline" onClick={() => setCurrentDate(d => d.add(1, "month"))}>
                        <ChevronRight />
                    </Button>
                </div>

                <Table className="border-separate border-spacing-2 table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            {DAY_NAMES.map(day => (
                                <TableHead
                                    key={day}
                                    className="text-center text-sm border rounded-md bg-slate-700 text-white"
                                >
                                    {day}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {weeks.map((week, i) => (
                            <TableRow key={i}>
                                {week.map(day => {
                                    const isCurrentMonth = day.month() === currentDate.month();
                                    const dateKey = day.format("YYYY-MM-DD");

                                    const eventsForDay = events
                                        .filter(e => e.schedule_date === dateKey)
                                        .map(e => ({
                                            ...e,
                                            shiftDetail: dataShift.find(s => s.id === e.shift_id)
                                        }));

                                    return (
                                        <TableCell
                                            key={dateKey}
                                            onClick={() => isCurrentMonth && handleDayClick(day, eventsForDay)}
                                            className={`align-top border rounded-md cursor-pointer h-28
                                                ${isCurrentMonth ? "hover:bg-neutral-100" : "bg-neutral-200 text-gray-400"}
                                            `}
                                        >
                                            <div className="text-xs font-semibold">{day.date()}</div>

                                            {eventsForDay.length > 0 ? (
                                                <div className="mt-1 p-2 bg-indigo-100 rounded-md">
                                                    <Badge variant="blue">
                                                        {eventsForDay[0].shiftDetail?.nama}
                                                    </Badge>
                                                    <p className="text-xs">
                                                        {eventsForDay[0].shiftDetail?.start_time} - {eventsForDay[0].shiftDetail?.end_time}
                                                    </p>
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
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>
                            {selectedEvent ? "Update" : "Simpan"}
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
