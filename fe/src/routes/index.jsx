import MainLayout from "../Components/layouts/main.layout";
import Home from "../pages";
import PageLogin from "../pages/auth/login";
import PageRegister from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import Departmen from "../pages/departmen";

export const routes = [
    {
        path: "/login",
        element: <PageLogin title={"Login"}/>,
    },
    {
        path: "/register",
        element: <PageRegister title={"Register"} />,
    },
    {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard title={"Dashboard"} /> },
      { path: '/departmen', element: <Departmen title={"Departmen"} /> },
    ]
  }
    // {
    //     path: "/",
    //     element: <PageHome />,
    // }
]