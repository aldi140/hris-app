import api from ".";

export const login = async (email, password) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  // if (response.data.token) {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response;
};

export const register = async (name, email, password) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
  });
  return response;
};
