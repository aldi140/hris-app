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

export const routes = [
  {
    path: "/login",
    element: <PageLogin title={"Login"} />,
  },
  {
    path: "/register",
    element: <PageRegister title={"Register"} />,
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
      { path: '/admin/departmen', element: <DepartmenList title={"Departemen"} /> },
      { path: '/admin/departmen/create', element: <DepartmenCreate title={"Tambah Departemen"} /> },
      // { path: '/departmen/edit/:id', element: <Departmen title={"Departmen"} /> },

      // Jabatan
      { path: '/admin/jabatan', element: <ListJabatan title={"Jabatan"} /> },
      { path: '/jabatan/create', element: <CreateJabatan title={"Tambah Jabatan"} /> },

      // Karyawan
      { path: '/admin/karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Gapok
      { path: 'admin/gapok', element: <ListGapok title={"Karyawan"} /> },
      { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Shift
      { path: '/admin/aryawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // Karyawan
      { path: '/admin/shift', element: <ListShift title={"Shift"} /> },
      { path: '/admin/shift/create', element: <CreateShift title={"Tambah Shift"} /> },

      // // Tunjangan
      // { path: '/tunjangan', element: <PageKaryawan title={"Karyawan"} /> },
      // { path: '/admin/karyawan/create', element: <CreateShift title={"Tambah Shift"} /> },

      // // Potongan
      // { path: '/karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      // { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

    ]
  }
]