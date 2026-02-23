import { useState } from "react";
import {
  addSalary,
  deleteSalary,
  detailSalary,
  getSalary,
  updateSalary,
} from "./salaryService";

export const useSallary = () => {
  const [salaryList, setSalaryList] = useState([]);

  const handleGetSalary = async () => {
    try {
      const response = await getSalary();
      setSalaryList(response.data.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getSalaryName = (id) => {
    const gapokName = salaryList.find((item) => item.id === id);
    return gapokName ? gapokName.nama : "";
  };

  const handleAddSalary = async ({ nama }) => {
    try {
      const response = await addSalary({ nama });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDetailSalary = async ({ id }) => {
    try {
      const response = await detailSalary({ id });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateSalary = async ({ id, name }) => {
    try {
      const response = await updateSalary({ id, name });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteSalary = async ({ id }) => {
    try {
      const response = await deleteSalary({ id });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    salaryList,
    handleGetSalary,
    handleAddSalary,
    handleUpdateSalary,
    handleDetailSalary,
    handleDeleteSalary,
    getSalaryName,
  };
};
