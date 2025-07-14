import api from ".";

export const getKaryawan = async () => {
    const response = await api.get("/v1/karyawan");
    return response;
}

export const addKaryawan = async (data) => {
    const response = await api.post("/v1/karyawan/posts", data);
    return response;
}

export const detailKaryawan = async ({ id }) => {
    const response = await api.get(`/v1/karyawan/show/${id}`);
    return response;
}

export const updateKaryawan = async ({ id, data }) => {
    const response = await api.post(`/v1/karyawan/update/${id}`, data)
    return response;
}

export const deleteKaryawan = async ({ id }) => {
    const response = await api.delete(`/v1/karyawan/delete/${id}`);
    return response;
}