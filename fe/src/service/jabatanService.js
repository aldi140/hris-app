import api from ".";

export const getJabatan = async () => {
    const response = await api.get("/v1/jabatan");
    return response;
}

export const addJabatan = async ({ nama }) => {
    const response = await api.post("/v1/jabatan/posts", { nama });
    return response;
}

export const detailJabatan = async ({ id }) => {
    const response = await api.get(`/v1/jabatan/show/${id}`);
    return response;
}

export const updateJabatan = async (data) => {
    const {id, ...payload} = data
    const response = await api.post(`/v1/jabatan/update/${id}`, payload);
    return response;
}

export const deleteJabatan = async ({ id }) => {
    const response = await api.delete(`/v1/jabatan/delete/${id}`);
    return response;
}