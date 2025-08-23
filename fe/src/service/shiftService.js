import api from ".";

export const getShift = async () => {
    const response = await api.get("/v1/shift");
    return response;
}

export const addShift = async ({ nama }) => {
    const response = await api.post("/v1/shift/posts", { nama });
    return response;
}

export const detailShift = async ({ id }) => {
    const response = await api.get(`/v1/shift/show/${id}`);
    return response;
}

export const updateShift = async (data) => {
    const {id, ...payload} = data
    const response = await api.post(`/v1/shift/update/${id}`, payload);
    return response;
}

export const deleteShift = async ({ id }) => {
    const response = await api.delete(`/v1/shift/delete/${id}`);
    return response;
}