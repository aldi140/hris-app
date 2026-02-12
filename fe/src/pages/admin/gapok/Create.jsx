import { BriefcaseBusiness, Building, CalendarIcon, MoveLeft } from "lucide-react"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../../Components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../../Components/ui/card"
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { useFormik } from "formik"
import { addGapok } from "../../../service/gapokService"

import * as yup from 'yup'
import { toast } from "sonner"
import { useGapok } from "../../../hooks/useGapok"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover"
import { Calendar } from "../../../Components/ui/calendar"
import { format } from "date-fns"
import { Checkbox } from "../../../Components/ui/checkbox"

const CreateGapok = ({ title }) => {
    usePageTitle(title)
    const { handleAddGapok } = useGapok()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            golongan: '',
            gapok: '',
            tgl_aktif: '',
            status: '',
        },
        onSubmit: async (values, actions) => {
            const formData = new FormData();

            for (const key in values) {
                const value = values[key];
                if (value !== undefined && value !== null) {
                    if (value instanceof Date && !isNaN(value)) {
                        const formattedDate = format(value, "yyyy-MM-dd");
                        formData.append(key, formattedDate);
                        // console.log(`${key}:`, formattedDate); 
                    } else {
                        formData.append(key, value);
                        // console.log(`${key}:`, value);
                    }
                }
            }
            try {
                const res = await addGapok(formData)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/gapok')
                }, 1500)
            } catch (error) {
                toast({ title: "Error", description: "Gagal menambahkan" })
            } finally {
                actions.setSubmitting(false)
                actions.resetForm()
            }
        },

        validationSchema: yup.object().shape({
            golongan: yup.string().required('Golongan wajib diisi'),
            gapok: yup.number().required('Gaji Pokok wajib diisi'),
        })
    })

    const handleForm = (e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            formik.setFieldValue(name, files[0]);

        } else {
            formik.setFieldValue(name, value);
        }
    }

    const onReset = () => {
        formik.resetForm()
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title="Tambah Gaji Pokok"
                    subtitle="Buat Gaji Pokok baru di sini, lalu klik 'Simpan' setelah selesai."
                    icon={BriefcaseBusiness}
                />

                <Button variant="secondary" size="lg" asChild>
                    <Link to="/gapok"><MoveLeft className="size-5" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Golongan</Label>
                            <Input id="name" name="golongan" type="text" placeholder="Masukkan Golongan..." onChange={handleForm} />
                            {formik.errors.golongan && <span className="text-sm text-destructive">{formik.errors.golongan}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="gapok">Gapok</Label>
                            <Input type="number" name="gapok" step="1" defaultValue="0" className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" onChange={handleForm} />
                            {formik.errors.gapok && <span className="text-sm text-destructive">{formik.errors.gapok}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="tgl_aktif">Tgl. Aktif</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-between text-left font-normal ${!formik.values.tgl_aktif && "text-muted-foreground"
                                            }`}
                                    >
                                        {formik.values.tgl_aktif
                                            ? format(formik.values.tgl_aktif, "dd MMM yyyy")
                                            : "Pilih tanggal"}
                                        <CalendarIcon className="mr-2 h-4 w-4" />

                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formik.values.tgl_aktif}
                                        onSelect={(date) => formik.setFieldValue("tgl_aktif", date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="status"
                                name="status"
                                defaultChecked
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                onChange={handleForm}
                            />
                            <Label htmlFor="status">Aktif/Tidak Aktif</Label>
                            {formik.errors.status && <span className="text-sm text-destructive">{formik.errors.status}</span>}
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <Button variant="outline" type="button" size="lg" onClick={onReset}>Reset</Button>
                            <Button variant="blue" type="submit" size="lg" disabled={formik.isSubmitting}>Save</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateGapok