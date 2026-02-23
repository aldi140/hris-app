import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useApiError = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (error) => {
    if (error?.type === "SESSION_EXPIRED") {
      console.log("SESSION_EXPIRED" + error.type);
      toast.error("Session habis, silakan login ulang");
      setTimeout(() => {
        dispatch(logout());
        navigate("/login");
      }, 3000);
      return;
    }

    if (error?.type === "NETWORK_ERROR") {
      toast.error(error.message || "Terjadi kesalahan");
      return;
    }
  };
};
