import MainLayout from "../Components/layouts/main.layout";
import Home from "../pages";
import PageAbsensi from "../pages/absensi";
import PageLogin from "../pages/auth/login";
import PageRegister from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import DepartmenCreate from "../pages/departmen/Create";
import DepartmenList from "../pages/departmen/Index";
import ListJabatan from "../pages/jabatan";
import CreateJabatan from "../pages/jabatan/Create";
import PageKaryawan from "../pages/karyawan";
import CreateKaryawan from "../pages/karyawan/Create";
import { PrivateRoute } from "./privateRoute";

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
      { path: '/departmen', element: <DepartmenList title={"Departemen"} /> },
      { path: '/departmen/create', element: <DepartmenCreate title={"Tambah Departemen"} /> },
      // { path: '/departmen/edit/:id', element: <Departmen title={"Departmen"} /> },

      // Jabatan
      { path: '/jabatan', element: <ListJabatan title={"Jabatan"} /> },
      { path: '/jabatan/create', element: <CreateJabatan title={"Tambah Jabatan"} /> },

      // Karyawan
      { path: '/karyawan', element: <PageKaryawan title={"Karyawan"} /> },
      { path: '/karyawan/create', element: <CreateKaryawan title={"Tambah Karyawan"} /> },

      // absensi
      { path: '/absensi', element: <PageAbsensi title={"Absensi"} /> },
    ]
  }
]