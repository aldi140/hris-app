import { use, useEffect, useState } from "react";
import {
  addJabatan,
  deleteJabatan,
  getJabatan,
  updateJabatan,
} from "../service/jabatanService";

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
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
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
    try {
      setIsLoading(true);
      setError(null);
      const response = await updateJabatan({ id, nama });

      setJabatanList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, nama } : item)),
      );

      return response;
    } catch (error) {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
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
    getJabatanById,
    handleGetJabatan,
    handleAddJabatan,
    handleUpdateJabatan,
    handleDeleteJabatan,
  };
};
