import api from ".";

export const getSurveyKunjungan = async ({
  search,
  id_kantor,
  start_date,
  end_date,
  page,
}) => {
  const params = {};
  if (search) params.search = search;
  if (id_kantor) params.id_kantor = id_kantor;
  if (start_date) params.start_date = start_date;
  if (end_date) params.end_date = end_date;
  if (page) params.page = page;
  const response = await api.get("/v1/survei/listdata", { params });
  return response;
};

export const getDetailSurvey = async ({ id_karyawan, tanggal, id_kantor }) => {
  const params = {};
  if (id_karyawan) params.id_karyawan = id_karyawan;
  if (tanggal) params.tanggal = tanggal;
  if (id_kantor) params.id_kantor = id_kantor;
  const response = await api.get("/v1/survei/listdata/survei", { params });
  return response;
};

export const getDetailKunjungan = async ({
  id_karyawan,
  tanggal,
  id_kantor,
}) => {
  const response = await api.get(
    `/v1/survei/listdata/kunjungan${(id_karyawan, tanggal, id_kantor)}`,
  );
  return response;
};
