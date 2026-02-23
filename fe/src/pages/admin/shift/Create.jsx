import { BriefcaseBusiness, Building, MoveLeft } from "lucide-react"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../../Components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../../Components/ui/card"
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { useFormik } from "formik"

import * as yup from 'yup'
import { toast } from "sonner"
import { useShift } from "../../../modules/shift/useShift"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { MyInputGroup } from "../../../Components/ui/myInputGroup"
import { addShift } from "../../../modules/shift/shiftService"

const CreateShift = ({ title }) => {
    usePageTitle(title)
    const { handleAddShift } = useShift()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            nama: '',
            start_time: '',
            end_time: '',
            jumlah_jam: '',
            break_minutes: '',
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
                const res = await addShift(formData)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/shift')
                }, 1500)
            } catch (error) {
                toast({ title: "Error", description: "Gagal menambahkan" })
            } finally {
                actions.setSubmitting(false)
                actions.resetForm()
            }
        },

        validationSchema: yup.object().shape({
            nama: yup.string().required('Shift wajib diisi'),
            start_time: yup.string().required('Jam Masuk wajib diisi'),
            end_time: yup.string().required('Jam Keluar wajib diisi'),
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
                    title="Tambah Shift"
                    subtitle="Buat shift baru di sini, lalu klik 'Simpan' setelah selesai."
                    icon={BriefcaseBusiness}
                />

                <Button variant="secondary" size="lg" asChild>
                    <Link to="/shift"><MoveLeft className="size-5" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" name="nama" type="text" placeholder="Masukkan Nama Shift..." onChange={handleForm} />
                            {formik.errors.nama && <span className="text-sm text-destructive">{formik.errors.nama}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="start_time">Jam Masuk</Label>
                            <Input type="time" name="start_time" step="1" defaultValue="00:00:00" className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" onChange={handleForm} />
                            {formik.errors.start_time && <span className="text-sm text-destructive">{formik.errors.start_time}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="end_time">Jam Keluar</Label>
                            <Input type="time" name="end_time" step="1" defaultValue="00:00:00" className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" onChange={handleForm} />
                            {formik.errors.end_time && <span className="text-sm text-destructive">{formik.errors.end_time}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="jumlah_jam">Jam Kerja</Label>
                            <MyInputGroup
                                type="number"
                                name="jumlah_jam"
                                value="0"
                                placeholder="0"
                                inputright={'Jam'}
                                onChange={handleForm}
                            />
                            {formik.errors.jumlah_jam && <span className="text-sm text-destructive">{formik.errors.jumlah_jam}</span>}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="break_minutes">Istirahat</Label>
                            <MyInputGroup
                                type="number"
                                name="break_minutes"
                                value="0"
                                placeholder="0"
                                inputright={'Menit'}
                                onChange={handleForm}
                            />
                            {formik.errors.break_minutes && <span className="text-sm text-destructive">{formik.errors.break_minutes}</span>}
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

export default CreateShift