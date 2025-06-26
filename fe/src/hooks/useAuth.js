import { useDispatch } from "react-redux";
import { login, register } from "../service/authService";
import { loginUser, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(response)) {
        navigate("/");
      } else {
        throw {
          success: false,
          message: response.payload?.message || "Login failed",
        };
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return { handleLogin, handleRegister, handleLogout };
};
