import api from "../../service";

export const getSalary = async () => {
  const response = await api.get("/v1/gapok");
  return response;
};

export const addSalary = async (data) => {
  const response = await api.post("/v1/gapok/posts", data);
  return response;
};

export const detailSalary = async ({ id }) => {
  const response = await api.get(`/v1/gapok/show/${id}`);
  return response;
};

export const updateSalary = async ({ id, data }) => {
  const response = await api.post(`/v1/gapok/update/${id}`, data);
  return response;
};

export const deleteSalary = async ({ id }) => {
  const response = await api.delete(`/v1/gapok/delete/${id}`);
  return response;
};
