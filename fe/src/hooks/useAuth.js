import { login, register } from "../service/authService";

export const useAuth = () => {
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      console.log( error);
      throw error
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      const response = await register(name, email, password);
      return response;
    } catch (error) {
        console.log( error);
      throw error
    }
  };

  return { handleLogin, handleRegister };
};
