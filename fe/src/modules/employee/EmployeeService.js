import api from "../../service";

export const getEmployee = async ({ search, filter, page } = {}) => {
  const params = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;
  if (page) params.page = page;
  const response = await api.get("/karyawan/listdata", { params });
  return response;
};

export const addEmployee = async (data) => {
  const response = await api.post("/karyawan/posts", data);
  return response;
};

export const detailEmployee = async ({ id }) => {
  const response = await api.get(`/karyawan/show/${id}`);
  return response;
};

export const updateEmployee = async ({ id, data }) => {
  const response = await api.post(`/karyawan/update/${id}`, data);
  return response;
};

export const deleteEmployee = async ({ id }) => {
  const response = await api.delete(`/karyawan/delete/${id}`);
  return response;
};
