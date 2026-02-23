import { useEffect, useState } from "react";
import {
  addDepertmen,
  deleteDepertmen,
  getDepartmen,
  updateDepertmen,
} from "./departmenService";

export const useDepartmen = () => {
  const [departmenList, setDepartmenList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetDepartmen = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDepartmen(params);
      const { data, message, status } = response.data;
      if (!status) {
        setDepartmenList([]);
        setError(message);
        return [];
      }

      setDepartmenList(data);
      return data;
    } catch (error) {
      setError(error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getDepartmenById = (id) => {
    return departmenList.find((item) => item.id === id) || null;
  };

  const handleAddDepartmen = async ({ nama }) => {
    try {
      const response = await addDepertmen({ nama });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateDepartmen = async ({ id, nama }) => {
    try {
      const response = await updateDepertmen({ id, nama });
      setDepartmenList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, nama } : item)),
      );

      return response;
    } catch (error) {
      console.log(error);
      setError(error);
      throw error;
    }
  };

  const handleDeleteDepartmen = async ({ id }) => {
    try {
      const response = await deleteDepertmen({ id });
      setDepartmenList((prev) => prev.filter((item) => item.id !== id));
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    departmenList,
    isLoading,
    error,
    getDepartmenById,
    handleGetDepartmen,
    handleAddDepartmen,
    handleUpdateDepartmen,
    handleDeleteDepartmen,
  };
};
