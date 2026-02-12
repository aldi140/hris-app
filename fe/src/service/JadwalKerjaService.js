import api from ".";

export const getJadwalKerja = async () => {
  const response = await api.get("/v1/jadwalkerja/listdata");
  return response;
};

export const addJadwalKerja = async (data) => {
  const response = await api.post("/v1/jadwalkerja/posts", data);
  return response;
};

export const updateJadwalKerja = async ({ id, data }) => {
  const response = await api.post(`/v1/jadwalkerja/update/${id}`, data);
  return response;
};

export const deleteJadwalKerja = async ({ id }) => {
  const response = await api.delete(`/v1/jadwalkerja/delete/${id}`);
  return response;
};

export const detailJadwalKerja = async ({ id }) => {
  const response = await api.get(`/v1/jadwalkerja/show/${id}`);
  return response;
};
