import { useEffect, useState } from "react";
import { addGapok, deleteGapok, getGapok, updateGapok } from "../service/gapokService";

export const useGapok = () => {
    const [gapokList, setGapokList] = useState([]);
    useEffect(() => {
        hanldeGetGapok();
    },[])
    const hanldeGetGapok = async () => {
        try {
            const response = await getGapok();
            setGapokList(response.data.data);
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }
    
    const getGapokName = (id) => {
        const gapokName = gapokList.find((item) => item.id === id);
        return gapokName ? gapokName.nama : "";
    }

    const handleAddGapok = async ({ nama }) => {
        try {
            const response = await addGapok({ nama })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleUpdateGapok = async ({ id, name }) => {
        try {
            const response = await updateGapok({ id, name })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleDeleteGapok = async ({ id }) => {
        try {
            const response = await deleteGapok({id});
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    return { hanldeGetGapok, handleAddGapok, handleUpdateGapok, handleDeleteGapok, getGapokName };
}