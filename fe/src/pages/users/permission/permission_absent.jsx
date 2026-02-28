import { CalendarIcon } from "lucide-react"
import PageHeader from "../../../Components/commons/moleculs/PageHeader"
import { Button } from "../../../Components/ui/button"
import { Field, FieldContent, FieldLabel } from "../../../Components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover"
import { Calendar } from "../../../Components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"
import { useFormik } from "formik"
import * as yup from 'yup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select"
import { Input } from "../../../Components/ui/input"
import { Textarea } from "../../../Components/ui/textarea"
import { Separator } from "../../../Components/ui/separator"

const PagePermissionAbsent = ({ title }) => {

    const formik = useFormik({
        initialValues: {
            tgl_mulai: '',
            tgl_akhir: '',
            jmlh_hari: '',
            keterangan: '',
        },
        onSubmit: async (values, actions) => {
            console.log(values);
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

            // console.log(formData);
            try {
                const res = await addEmployee(formData)
                console.log(res);
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate('/permission')
                }, 1500)
            } catch (error) {
                toast.error("Gagal menambahkan")
            } finally {
                actions.setSubmitting(false)
            }
        },
        validationSchema: yup.object().shape({
            jenis_cuti: yup.string().required('Jenis cuti wajib diisi'),
            tgl_mulai: yup.date().required('Tanggal mulai wajib diisi'),
            tgl_akhir: yup.date().required('Tanggal akhir wajib diisi'),
            jmlh_hari: yup.number().min(1, 'Jumlah hari minimal 1').required('Jumlah hari wajib diisi'),
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
        <section>
            <PageHeader title={title} backTo="/permission" />
            <div className="pt-18 px-4 flex flex-col gap-2 ">
                <div className="bg-white p-4 rounded-md border flex flex-col gap-4">
                    <h5 className="text-md text-neutral-800 font-semibold">Formulir Pengajuan</h5>
                    <Separator />
                    <form action={formik.handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <Field>
                                    <FieldLabel>Jumlah Hari</FieldLabel>
                                    <FieldContent>
                                        <Input id="jmlh_hari" name="jmlh_hari" type="number" placeholder="Masukkan jumlah hari cuti..." onChange={handleForm} value={formik.values.jmlh_hari} />
                                    </FieldContent>
                                    {formik.errors.jmlh_hari && (
                                        <span className="text-sm text-destructive">{formik.errors.jmlh_hari}</span>
                                    )}
                                </Field>
                            </div>
                            <div className="flex gap-4">
                                <Field>
                                    <FieldLabel>Tanggal Mulai</FieldLabel>
                                    <FieldContent>
                                        <Popover >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full justify-between text-left font-normal text-muted-foreground"

                                                >
                                                    {formik.values.tgl_mulai
                                                        ? format(formik.values.tgl_mulai, "dd MMM yyyy")
                                                        : "Tanggal Cuti"}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={formik.values.tgl_mulai}
                                                    onSelect={(date) => formik.setFieldValue("tgl_mulai", date)}
                                                    disabled={(tgl) =>
                                                        tgl > new Date() || tgl < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FieldContent>
                                    {formik.errors.tgl_mulai && (
                                        <span className="text-sm text-destructive">{formik.errors.tgl_mulai}</span>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel>Tanggal Akhir</FieldLabel>
                                    <FieldContent>
                                        <Popover >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full justify-between text-left font-normal text-muted-foreground"

                                                >
                                                    {formik.values.tgl_akhir
                                                        ? format(formik.values.tgl_akhir, "dd MMM yyyy")
                                                        : "Tanggal Cuti"}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={formik.values.tgl_akhir}
                                                    onSelect={(date) => formik.setFieldValue("tgl_akhir", date)}
                                                    disabled={(tgl) =>
                                                        tgl > new Date() || tgl < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FieldContent>
                                    {formik.errors.tgl_akhir && (
                                        <span className="text-sm text-destructive">{formik.errors.tgl_akhir}</span>
                                    )}
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                                    Keterangan
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        id="keterangan"
                                        name="keterangan"
                                        value={formik.values.keterangan}
                                        onChange={formik.handleChange}
                                    />
                                </FieldContent>
                                {formik.errors.keterangan && (
                                    <span className="text-sm text-destructive">{formik.errors.keterangan}</span>
                                )}
                            </Field>
                            <div className="flex justify-end gap-x-2">
                                <Button variant="outline" type="button" size="lg" onClick={onReset}>Reset</Button>
                                <Button variant="green" type="submit" size="lg" disabled={formik.isSubmitting}>Save</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default PagePermissionAbsent