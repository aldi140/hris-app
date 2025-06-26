import api from ".";

export const departmen = async () => {
    const response = await api.get("/v1/departemen");
    return response;
}

export const addDepertmen = async ({ nama }) => {
    const response = await api.post("/v1/departemen/posts", { nama });
    return response;
}

export const detailDepertmen = async ({ id }) => {
    const response = await api.get(`/v1/departemen/show/${id}`);
    return response;
}

export const updateDepertmen = async (data) => {
    const {id, ...payload} = data
    const response = await api.post(`/v1/departemen/update/${id}`, payload);
    return response;
}

export const deleteDepertmen = async ({ id }) => {
    const response = await api.delete(`/v1/departemen/delete/${id}`);
    return response;
}