import { useEffect, useState } from "react";
import {
  addShift,
  deleteShift,
  getShift,
  updateShift,
} from "../service/shiftService";

export const useShift = () => {
  const [shiftList, setShiftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hanldeGetShift = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getShift();
      setShiftList(response.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getShiftName = (id) => {
    const shiftName = shiftList.find((item) => item.id === id);
    return shiftName ? shiftName.nama : "";
  };

  const handleAddShift = async ({ nama }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addShift({ nama });
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShift = async ({ id, name }) => {
    try {
      const response = await updateShift({ id, name });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteShift = async ({ id }) => {
    try {
      const response = await deleteShift({ id });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    shiftList,
    loading,
    error,
    hanldeGetShift,
    handleAddShift,
    handleUpdateShift,
    handleDeleteShift,
    getShiftName,
  };
};
