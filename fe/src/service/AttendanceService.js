import api from ".";

export const checkin = async (data) => {
  const response = await api.post("/v1/absensi/check-in", data);
  return response;
};

export const chekout = async (data) => {
  const response = await api.post("/v1/absensi/check-out", data);
  return response;
};

export const getDetailAttendance = async () => {
  const response = await api.get("/v1/absensi");
  return response;
};

export const getAttendance = async ({ search, filter, tgl_absen, page }) => {
  const params = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;
  if (tgl_absen) params.tgl_absen = tgl_absen;
  if (page) params.page = page;

  const response = await api.get("/v1/absensi/listdata", { params });
  return response;
};
