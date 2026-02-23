import { useState } from "react";

import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "./EmployeeService";

export const useEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const handleGetEmployee = async (params = {}) => {
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
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await addEmployee(data);
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmployee = async (id, data, values) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await updateEmployee({ id, data });
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
      const response = await deleteEmployee({ id });
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
    handleGetEmployee,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDetailEmployee,
    handleDeleteEmployee,
  };
};
