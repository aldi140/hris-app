import MainLayout from "../Components/layouts/main.layout";
import Home from "../pages";
import PageAbsensi from "../pages/absensi";
import PageLogin from "../pages/auth/login";
import PageRegister from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import DepartmenCreate from "../pages/admin/departmen/Create";
import DepartmenList from "../pages/admin/departmen/Index";
import ListJabatan from "../pages/jabatan";
import CreateJabatan from "../pages/jabatan/Create";
import CreateKaryawan from "../pages/admin/karyawan/Create";
import { PrivateRoute } from "./privateRoute";
import PageKaryawan from "../pages/admin/karyawan/Index";

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
      { path: '/admin/jabatan/create', element: <CreateJabatan title={"Tambah Jabatan"} /> },

      // Karyawan
      { path: '/admin/karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: '/admin/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // absensi
      { path: '/absensi', element: <PageAbsensi title={"Absensi"} /> },
    ]
  }
]