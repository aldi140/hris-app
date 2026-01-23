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
import { useJabatan } from "../../../hooks/useJabatan"
import { usePageTitle } from "../../../hooks/usePageTitle"

const CreateJabatan = ({ title }) => {
    usePageTitle(title)
    const { handleAddJabatan } = useJabatan()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            nama: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const res = await handleAddJabatan(values)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/jabatan')
                }, 1500)
            } catch (error) {
                toast({ title: "Error", description: "Gagal menambahkan" })
            } finally {
                actions.setSubmitting(false)
                actions.resetForm()
            }
        },

        validationSchema: yup.object().shape({
            nama: yup.string().required('Jabatan wajib diisi'),
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
                    title="Tambah Jabatan"
                    subtitle="Buat jabatan baru di sini, lalu klik 'Simpan' setelah selesai."
                    icon={BriefcaseBusiness}
                />

                <Button variant="secondary" size="lg" asChild>
                    <Link to="/jabatan"><MoveLeft className="size-5" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" name="nama" type="text" placeholder="Masukkan Nama Jabatan..." onChange={handleForm} />
                            {formik.errors.nama && <span className="text-sm text-destructive">{formik.errors.nama}</span>}
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

export default CreateJabatan