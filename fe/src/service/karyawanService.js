import api from ".";

export const getEmployee = async ({ search, filter, page } = {}) => {
  const params = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;
  if (page) params.page = page;
  const response = await api.get("/v1/karyawan/listdata", { params });
  return response;
};

export const addKaryawan = async (data) => {
  const response = await api.post("/v1/karyawan/posts", data);
  return response;
};

export const detailKaryawan = async ({ id }) => {
  const response = await api.get(`/v1/karyawan/show/${id}`);
  return response;
};

export const updateKaryawan = async ({ id, data }) => {
  const response = await api.post(`/v1/karyawan/update/${id}`, data);
  return response;
};

export const deleteKaryawan = async ({ id }) => {
  const response = await api.delete(`/v1/karyawan/delete/${id}`);
  return response;
};
