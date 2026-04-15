import api from "../../service";

export const getSalary = async () => {
  const response = await api.get("/gapok");
  return response;
};

export const addSalary = async (data) => {
  const response = await api.post("/gapok/posts", data);
  return response;
};

export const detailSalary = async ({ id }) => {
  const response = await api.get(`/gapok/show/${id}`);
  return response;
};

export const updateSalary = async ({ id, data }) => {
  const response = await api.post(`/gapok/update/${id}`, data);
  return response;
};

export const deleteSalary = async ({ id }) => {
  const response = await api.delete(`/gapok/delete/${id}`);
  return response;
};
