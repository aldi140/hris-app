import api from "../../service";

export const getJabatan = async ({ search, filter } = {}) => {
  const params = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;

  const response = await api.get("/jabatan/listdata", { params });

  // console.log(response);
  return response;
};

export const addJabatan = async ({ nama }) => {
  const response = await api.post("/jabatan/posts", { nama });
  return response;
};

export const detailJabatan = async ({ id }) => {
  const response = await api.get(`/jabatan/show/${id}`);
  return response;
};

export const updateJabatan = async (data) => {
  const { id, ...payload } = data;
  const response = await api.post(`/jabatan/update/${id}`, payload);
  return response;
};

export const deleteJabatan = async ({ id }) => {
  const response = await api.delete(`/jabatan/delete/${id}`);
  return response;
};
