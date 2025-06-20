import api from "../service";
import { departmen } from "../service/departmenService";

export const useDepartmen = () => {
    
    const getDepartmen = async () => {
        try {
            const response = await departmen();
            return response;
        } catch (error) {
            console.log( error);
            throw error
        }
    }
    
    const addDepartmen = async ({ name }) => {
        try {
            const response = await api.post("/departmen", { name });
            return response;
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const updateDepartmen = async ({ id, name }) => {
        try {
            const response = await api.put(`/departmen/${id}`, { name });
            return response;
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const deleteDepartmen = async ({ id }) => {
        try {
            const response = await api.delete(`/departmen/${id}`);
            return response;
        } catch (error) {
            console.log( error);
            throw error
        }
    }
    
    return { getDepartmen, addDepartmen, updateDepartmen, deleteDepartmen };
}