import api from "../../service";

export const getShift = async () => {
  const response = await api.get("/shift");
  return response;
};

export const addShift = async (data) => {
  const response = await api.post("/shift/posts", data);
  return response;
};

export const detailShift = async ({ id }) => {
  const response = await api.get(`/shift/show/${id}`);
  return response;
};

export const updateShift = async ({ id, data }) => {
  const response = await api.post(`/shift/update/${id}`, data);
  return response;
};

export const deleteShift = async ({ id }) => {
  const response = await api.delete(`/shift/delete/${id}`);
  return response;
};
