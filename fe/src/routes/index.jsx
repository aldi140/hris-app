import Home from "../pages";
import MainLayout from "../Components/layouts/admin/main.layout";
import PageLogin from "../pages/auth/login";
import PageRegister from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import DepartmenCreate from "../pages/admin/departmen/Create";
import DepartmenList from "../pages/admin/departmen/Index";
import ListJabatan from "../pages/admin/jabatan/Index";
import CreateJabatan from "../pages/admin/jabatan/Create";
import { PrivateRoute } from "./privateRoute";
import ListShift from "../pages/admin/shift/Index";
import CreateShift from "../pages/admin/shift/Create";
import ListGapok from "../pages/admin/gapok/Index";
import ListAttendance from "../pages/admin/attendance/ListAttendance";
import FieldVisit from "../pages/admin/survey-visit/Index";
import ListOffice from "../pages/admin/office/Index";
import PageEmployee from "../pages/admin/employee/Index";
import CreateEmployee from "../pages/admin/employee/Create";
import ScheduleList from "../pages/admin/schedule-work/Index";
import PageAttendance from "../pages/users/attendance/index";
import MainLayoutUser from "../Components/layouts/users/main.layout";
import PageHome from "../pages/users/home";
import PageNotification from "../pages/users/notif";
import PageProfile from "../pages/users/profile";
import PageLeave from "../pages/users/leave";
import PagePermission from "../pages/users/permission";
import PageSalary from "../pages/users/salary";
import PagePermissionLeave from "../pages/users/permission/permission_leave";
import PagePermissionSick from "../pages/users/permission/permission_sick";
import PagePermissionAbsent from "../pages/users/permission/permission_absent";

export const routes = [
  {
    path: "/login",
    element: <PageLogin title={"Login"} />,
  },
  {
    path: "/register",
    element: <PageRegister title={"Register"} />,
  },

  // user
  {
    element: (
      <PrivateRoute>
        <MainLayoutUser />
      </PrivateRoute>
    ),
    children: [
      { path: "/home", element: <PageHome title="Home" /> },

      { path: "/attendance", element: <PageAttendance title="Absensi" /> },

      { path: "/notification", element: <PageNotification title="Notifikasi" /> },

      { path: "/leave", element: <PageLeave title="Cuti" /> },

      { path: "/permission", element: <PagePermission title="Pengajuan Izin" /> },
      { path: "/permission/leave", element: <PagePermissionLeave title="Izin Cuti" /> },
      { path: "/permission/sick", element: <PagePermissionSick title="Izin Sakit" /> },
      { path: "/permission/absent", element: <PagePermissionAbsent title="Izin Absen" /> },


      { path: "/salary", element: <PageSalary title="Slip Gaji" /> },

      { path: "/profile", element: <PageProfile title="Profile" /> },


    ],
  },

  // admin
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
      { path: 'employee', element: <PageEmployee title={"Karyawan"} /> },
      { path: 'employee/create', element: <CreateEmployee title={"Tambah Karyawan"} /> },

      // Gapok
      { path: 'base-salary', element: <ListGapok title={"Gaji Pokok"} /> },
      { path: 'employee/create', element: <CreateEmployee title={"Gaji Pokok"} /> },

      // Shift
      { path: 'shift', element: <ListShift title={"Shift"} /> },
      { path: 'shift/create', element: <CreateShift title={"Tambah Shift"} /> },

      // Jadwal Kerja
      { path: 'schedule-work', element: <ScheduleList title={"Jadwal Kerja"} /> },

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