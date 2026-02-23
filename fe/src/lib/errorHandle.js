// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { logout } from "../features/auth/authSlice";

// export const handleApiError = (error, navigate) => {
//   console.log(error, "error");
//   const dispatch = useDispatch();
//   if (error?.type === "SESSION_EXPIRED") {
//     toast.error("Session habis, silakan login ulang");
//     console.log("session expired");
//     dispatch(logout());

//     navigate("/login");
//     return;
//   }

//   if (!error?.response) {
//     toast.error("Koneksi bermasalah, coba lagi");
//     return;
//   }
// };
