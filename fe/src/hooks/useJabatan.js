import { useEffect, useState } from "react";
import { addJabatan, deleteJabatan, getJabatan, updateJabatan } from "../service/jabatanService";

export const useJabatan = () => {
    const [jabatanList, setJabatanList] = useState([]);
    useEffect(() => {
        hanldeGetJabatan();
    },[])
    const hanldeGetJabatan = async () => {
        try {
            const response = await getJabatan();
            setJabatanList(response.data.data);
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }
    
    const getJabatanName = (id) => {
        const jabatanName = jabatanList.find((item) => item.id === id);
        return jabatanName ? jabatanName.nama : "";
    }

    const handleAddJabatan = async ({ nama }) => {
        try {
            const response = await addJabatan({ nama })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleUpdateJabatan = async ({ id, name }) => {
        try {
            const response = await updateJabatan({ id, name })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleDeleteJabatan = async ({ id }) => {
        try {
            const response = await deleteJabatan({id});
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    return { hanldeGetJabatan, handleAddJabatan, handleUpdateJabatan, handleDeleteJabatan, getJabatanName };
}