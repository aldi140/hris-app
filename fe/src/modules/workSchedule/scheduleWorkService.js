import api from "../../service";

export const getSchedule = async () => {
  const response = await api.get("/jadwalkerja/listdata");
  return response;
};

export const getScheduleByEmployee = async ({ id_karyawan, bulan, tahun }) => {
  const params = {};

  if (id_karyawan) params.id_karyawan = id_karyawan;
  if (bulan) params.bulan = bulan;
  if (tahun) params.tahun = tahun;
  const response = await api.get("/jadwalkerja/data", { params });
  return response;
};

export const addSchedule = async (data) => {
  const response = await api.post("/jadwalkerja/posts", data);
  return response;
};

export const updateSchedule = async ({ id, data }) => {
  const response = await api.post(`/jadwalkerja/update/${id}`, data);
  return response;
};

export const deleteSchedule = async ({ id }) => {
  const response = await api.delete(`/jadwalkerja/delete/${id}`);
  return response;
};

// export const detailSchedule = async ({ id }) => {
//   const response = await api.get(`/jadwalkerja/show/${id}`);
//   return response;
// };
