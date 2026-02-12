import { useState } from "react";
import {
  deleteKaryawan,
  detailKaryawan,
  getEmployee,
  updateKaryawan,
} from "../service/karyawanService";

export const useEmploye = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const handleGetEmploye = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getEmployee({ page, ...params });
      const { data, message, status, pagination } = response.data;
      if (!status) {
        setEmployeeList([]);
        setError(message);
        return [];
      }
      setPage(pagination.current_page);
      setLastPage(pagination.last_page);
      setTotalData(pagination.total_records);
      setEmployeeList(data);
    } catch (error) {
      setEmployeeList([]);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengambil data karyawan",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmploye = async (id, data, values) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await updateKaryawan({ id, data });
      setEmployeeList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...values } : item)),
      );
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailEmployee = async (id) => {
    return employeeList.find((item) => item.id === id) || null;
  };

  const handleDeleteEmployee = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await deleteKaryawan({ id });
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    employeeList,
    setEmployeeList,
    isLoading,
    error,
    page,
    setPage,
    lastPage,
    totalData,
    handleGetEmploye,
    handleUpdateEmploye,
    handleDetailEmployee,
    handleDeleteEmployee,
  };
};
