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
    const response = await api.get(`/v1/jabatan/${id}`);
    return response;
}

export const updateJabatan = async ({ id }) => {
    const response = await api.put(`/v1/jabatan/update/${id}`)
    return response;
}

export const deleteJabatan = async ({ id }) => {
    const response = await api.delete(`/v1/jabatan/delete/${id}`);
    return response;
}