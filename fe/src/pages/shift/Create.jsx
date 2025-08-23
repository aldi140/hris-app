import { BriefcaseBusiness, Building, MoveLeft } from "lucide-react"
import HeaderTitle from "../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../Components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../Components/ui/card"
import { Label } from "../../Components/ui/label"
import { Input } from "../../Components/ui/input"
import { useFormik } from "formik"

import * as yup from 'yup'
import { toast } from "sonner"
import { useShift } from "../../hooks/useShift"
import { usePageTitle } from "../../hooks/usePageTitle"

const CreateShift = ({title}) => {
    usePageTitle(title)
    const { handleAddShift } = useShift()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            nama: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const res = await handleAddShift(values)
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
        })
    })

    const handleForm = (e) => {
        const { target } = e;
        formik.setFieldValue(target.name, target.value)
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title="Tambah Shift"
                    subtitle="Buat shift baru di sini, lalu klik 'Simpan' setelah selesai."
                    icon={BriefcaseBusiness }
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
                            <Label htmlFor="name">Jam Masuk</Label>
                            <Input
        type="time"
        name="start_time"
        step="1"
        defaultValue="10:30:00"
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
                            {formik.errors.start_time && <span className="text-sm text-destructive">{formik.errors.start_time}</span>}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button variant="outline" type="button" size="lg" onClick={() => formik.resetForm()}>Reset</Button>
                            <Button variant="blue" type="submit" size="lg" disabled={formik.isSubmitting}>Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateShift