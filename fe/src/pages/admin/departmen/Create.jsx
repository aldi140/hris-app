import { Building, MoveLeft } from "lucide-react"
import HeaderTitle from "../../../Components/commons/atoms/HeaderTitle"
import { Button } from "../../../Components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../../Components/ui/card"
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { useFormik } from "formik"

import * as yup from 'yup'
import { useDepartmen } from "../../../hooks/useDepartmen"
import { toast } from "sonner"

const DepartmenCreate = () => {
    const navigate = useNavigate()
    const { handleAddDepartmen } = useDepartmen()
    const formik = useFormik({
        initialValues: {
            nama: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const res = await handleAddDepartmen(values)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/departmen')
                }, 1500)
            } catch (error) {
                toast({ title: "Error", description: "Gagal menambahkan" })
            } finally {
                actions.setSubmitting(false) // <== PENTING agar formik tahu submit selesai
                actions.resetForm()
            }
        },
       
        validationSchema: yup.object().shape({
            nama: yup.string().required('Departmen name is required'),
        })
    })

    const handleForm = (e) => {
        const { target } = e;
        formik.setFieldValue(target.name, target.value)
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title="Add Departmen" subtitle="reate a new department here, then click 'Save' when you're done." icon={Building} />
                <Button variant="secondary" size="lg" asChild>
                    <Link to="/departmen"><MoveLeft className="size-5" />Back</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="nama" type="text" placeholder="Input departmen name..." onChange={handleForm} />
                            {formik.errors.nama && <span className="text-sm text-destructive">{formik.errors.nama}</span>}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button variant="outline" type="button" size="lg"  onClick={() => formik.resetForm()}>Reset</Button>
                            <Button variant="blue" type="submit" size="lg" disabled={formik.isSubmitting}>Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DepartmenCreate