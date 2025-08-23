import { useEffect, useState } from "react";
import { addShift, deleteShift, getShift, updateShift } from "../service/shiftService";

export const useShift = () => {
    const [shiftList, setShiftList] = useState([]);
    useEffect(() => {
        hanldeGetShift();
    },[])
    const hanldeGetShift = async () => {
        try {
            const response = await getShift();
            setShiftList(response.data.data);
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }
    
    const getShiftName = (id) => {
        const shiftName = shiftList.find((item) => item.id === id);
        return shiftName ? shiftName.nama : "";
    }

    const handleAddShift = async ({ nama }) => {
        try {
            const response = await addShift({ nama })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleUpdateShift = async ({ id, name }) => {
        try {
            const response = await updateShift({ id, name })
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    const handleDeleteShift = async ({ id }) => {
        try {
            const response = await deleteShift({id});
            return response
        } catch (error) {
            console.log( error);
            throw error
        }
    }

    return { hanldeGetShift, handleAddShift, handleUpdateShift, handleDeleteShift, getShiftName };
}