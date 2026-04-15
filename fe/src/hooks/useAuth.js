import { useDispatch } from "react-redux";
import { login, register } from "../service/authService";
import {
  loginUser,
  logout,
  setAuthFromUrl,
  setInitialized,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    await dispatch(loginUser(data)).unwrap();
    navigate("/");
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      const response = await register(name, email, password);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAuthFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userParam = params.get("user");

    console.log("params", params);
    console.log("token", token);
    console.log("userParam", userParam);

    // if (token && userParam) {
    //   try {
    //     const user = JSON.parse(decodeURIComponent(userParam));
    //     dispatch(setAuthFromUrl({ user, token }));
    //     window.history.replaceState({}, "", window.location.pathname);
    //     navigate("/");
    //   } catch (err) {
    //     console.error("Gagal parse auth dari URL:", err);
    //     dispatch(setInitialized()); // ← tetap mark initialized meski error
    //   }
    // } else {
    //   dispatch(setInitialized()); // ← tidak ada params, langsung initialized
    // }
  };

  return { handleLogin, handleRegister, handleLogout, handleAuthFromUrl };
};
