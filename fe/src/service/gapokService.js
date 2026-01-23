import api from ".";

export const getGapok = async () => {
    const response = await api.get("/v1/gapok");
    return response;
}

export const addGapok = async (data) => {
    const response = await api.post("/v1/gapok/posts", data);
    return response;
}

export const detailGapok = async ({ id }) => {
    const response = await api.get(`/v1/gapok/show/${id}`);
    return response;
}

export const updateGapok = async ({ id, data }) => {
    const response = await api.post(`/v1/gapok/update/${id}`, data);
    return response;
}

export const deleteGapok = async ({ id }) => {
    const response = await api.delete(`/v1/gapok/delete/${id}`);
    return response;
}