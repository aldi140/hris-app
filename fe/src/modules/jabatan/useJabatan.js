import { use, useEffect, useState } from "react";
import {
  addJabatan,
  deleteJabatan,
  getJabatan,
  updateJabatan,
} from "./jabatanService";

export const useJabatan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jabatanList, setJabatanList] = useState([]);

  const handleGetJabatan = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getJabatan(params);
      const { data, message, status } = response.data;

      if (!status) {
        setJabatanList([]);
        setError(message);
        return [];
      }

      setJabatanList(data);
      return data;
    } catch (error) {
      setError(error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getJabatanById = (id) => {
    return jabatanList.find((item) => item.id === id) || null;
  };
  const handleAddJabatan = async ({ nama }) => {
    try {
      const response = await addJabatan({ nama });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateJabatan = async ({ id, nama }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateJabatan({ id, nama });
      setJabatanList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, nama } : item)),
      );
      if (!response?.data) {
        throw new Error("Response tidak valid");
      }

      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteJabatan = async ({ id }) => {
    try {
      const response = await deleteJabatan({ id });
      setJabatanList((prev) => prev.filter((item) => item.id !== id));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    jabatanList,
    setJabatanList,
    getJabatanById,
    handleGetJabatan,
    handleAddJabatan,
    handleUpdateJabatan,
    handleDeleteJabatan,
  };
};
