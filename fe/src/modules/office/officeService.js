import api from "../../service";

export const getOffice = async ({ search, filter, page } = {}) => {
  const params = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;
  if (page) params.page = page;

  const response = await api.get("/kantor/listdata", { params });
  return response;
};

export const getOfficeAll = async () => {
  const response = await api.get("/kantor");
  return response;
};

export const updateOffice = async ({ id, data }) => {
  const response = await api.post(`/kantor/update/${id}`, data);
  return response;
};

// export const getOfficeById = async ({ id }) => {
//   const response = await api.get(`/kantor/show/${id}`);
//   return response;
// };
