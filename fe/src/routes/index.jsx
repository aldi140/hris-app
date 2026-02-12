import MainLayout from "../Components/layouts/main.layout";
import Home from "../pages";
import PageAbsensi from "../pages/absensi";
import PageLogin from "../pages/auth/login";
import PageRegister from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import DepartmenCreate from "../pages/admin/departmen/Create";
import DepartmenList from "../pages/admin/departmen/Index";
import ListJabatan from "../pages/admin/jabatan";
import CreateJabatan from "../pages/admin/jabatan/Create";
import CreateKaryawan from "../pages/admin/karyawan/Create";
import { PrivateRoute } from "./privateRoute";
import PageKaryawan from "../pages/admin/karyawan/Index";
import ListShift from "../pages/admin/shift/Index";
import CreateShift from "../pages/admin/shift/Create";

import ListGapok from "../pages/admin/gapok/Index";
import ListJadwalKerja from "../pages/admin/jadwal-kerja/Index";
import ListAttendance from "../pages/admin/attendance/ListAttendance";
import FieldVisit from "../pages/admin/survey-kunjungan/Index";
import ListOffice from "../pages/admin/office/Index";

export const routes = [
  {
    path: "/login",
    element: <PageLogin title={"Login"} />,
  },
  {
    path: "/register",
    element: <PageRegister title={"Absensi"} />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/absensi",
        element: <PageAbsensi title="Absensi" />,
      },
    ],
  },

  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    )
    ,
    children: [
      { path: '/', element: <Dashboard title={"Dashboard"} /> },

      // Departemen
      { path: 'departmen', element: <DepartmenList title={"Departemen"} /> },
      { path: 'departmen/create', element: <DepartmenCreate title={"Tambah Departemen"} /> },
      // { path: '/departmen/edit/:id', element: <Departmen title={"Departmen"} /> },

      // Jabatan
      { path: 'jabatan', element: <ListJabatan title={"Jabatan"} /> },
      { path: 'jabatan/create', element: <CreateJabatan title={"Tambah Jabatan"} /> },

      // Karyawan
      { path: 'karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: 'karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Gapok
      { path: 'gapok', element: <ListGapok title={"Karyawan"} /> },
      { path: 'karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Shift
      { path: 'karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: 'karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Karyawan
      { path: 'shift', element: <ListShift title={"Shift"} /> },
      { path: 'shift/create', element: <CreateShift title={"Tambah Shift"} /> },

      // Jadwal Kerja
      { path: 'jadwal-kerja', element: <ListJadwalKerja title={"Jadwal Kerja"} /> },
      // { path: '/admin/jadwal-kerja/create', element: <CreateJadwalKerja title={"Tambah Jadwal Kerja"} /> },

      // Absensi
      { path: 'attendance/list-attendance', element: <ListAttendance title={"List Absensi"} /> },
      // { path: '/admin/attendance/list-presence', element: <List title={"List Kehadiran"} /> },

      // Survey-kunjungan
      { path: 'field-visit', element: <FieldVisit title={"List Survey & Kunjungan"} /> },


      // Kantor
      { path: 'office', element: <ListOffice title={"List Kantor"} /> },

      // // Tunjangan
      // { path: '/tunjangan', element: <PageKaryawan title={"Karyawan"} /> },
      // { path: '/admin/karyawan/create', element: <CreateShift title={"Tambah Shift"} /> },

      // // Potongan
      // { path: '/karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      // { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

    ]
  }
]