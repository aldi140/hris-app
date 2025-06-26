import { useEffect, useState } from "react";
import api from "../service";
import {
  addDepertmen,
  deleteDepertmen,
  departmen,
  detailDepertmen,
  updateDepertmen,
} from "../service/departmenService";

export const useDepartmen = () => {
  const [departmenList, setDepartmenList] = useState([]);
  useEffect(() => {
    getDepartmen();
  }, []);
  const getDepartmen = async () => {
    try {
      const response = await departmen();
      setDepartmenList(response.data.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getDepartmenName = (id) => {
    const departmenName = departmenList.find((item) => item.id === id);
    return departmenName ? departmenName.nama : "";
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
  

  const handleUpdateDepartmen = async ({ id, name }) => {
    try {
      const response = await updateDepertmen({ id, name });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteDepartmen = async ({ id }) => {
    try {
      const response = await deleteDepertmen({ id });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    getDepartmen,
    getDepartmenName,
    handleAddDepartmen,
    handleUpdateDepartmen,
    handleDeleteDepartmen,
  };
};
