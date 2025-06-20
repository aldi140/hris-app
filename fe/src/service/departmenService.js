import api from ".";

export const departmen = async () => {
    const response = await api.get("/v1/departemen");
    return response;
}
