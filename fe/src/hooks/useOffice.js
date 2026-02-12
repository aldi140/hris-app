import { useState } from "react";
import { getOffice, getOfficeAll } from "../service/officeService";

export const useOffice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [officeList, setOfficeList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const handleGetOffice = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getOffice(params);
      const { data, message, status, pagination } = response.data;

      if (!status) {
        setOfficeList([]);
        setError(message);
        return [];
      }
      setPage(pagination.current_page);
      setLastPage(pagination.last_page);
      setTotalData(pagination.total_records);
      setOfficeList(data);
      return data;
    } catch {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlegetOfficeAll = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getOfficeAll({});
      const { data, message, status } = response.data;
      if (!status) {
        setOfficeList([]);
        setError(message);
        return [];
      }
      setOfficeList(data);
      return data;
    } catch {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
    } finally {
      setIsLoading(false);
    }
  };
  const getOfficeById = (id) => {
    return officeList.find((item) => item.id === id) || null;
  };

  const handleAddOffice = async ({ nama }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await addOffice({ nama });
      return response;
    } catch {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOffice = async ({ id, nama }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await updateOffice({ id, nama });
      return response;
    } catch {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOffice = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await deleteOffice(id);
      return response;
    } catch {
      setError(
        error?.response?.data?.message || error?.message || "Terjadi kesalahan",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    page,
    setPage,
    lastPage,
    totalData,
    officeList,
    handlegetOfficeAll,
    handleGetOffice,
    getOfficeById,
    handleAddOffice,
    handleUpdateOffice,
    handleDeleteOffice,
  };
};
