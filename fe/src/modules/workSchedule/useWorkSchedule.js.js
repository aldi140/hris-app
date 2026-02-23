import { useState } from "react";

import { toast } from "sonner";
import {
  addSchedule,
  deleteSchedule,
  getSchedule,
  getScheduleByEmployee,
  updateSchedule,
} from "./scheduleWorkService";

export const useWorkSchedule = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [scheduleEmployee, setScheduleEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSchedule();
      setScheduleList(response.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetScheduleByEmployee = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getScheduleByEmployee(params);
      const { data, message, status } = response.data;

      if (!status) {
        setScheduleEmployee([]);
        setError(message);
        return [];
      }
      setScheduleEmployee(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Di useJadwalKerja.js
  const handleAddSchedule = async (data) => {
    try {
      setLoading(true);
      const response = await addSchedule(data);

      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateScheduleEmployee = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateSchedule({ id, data });

      setScheduleList((prev) =>
        prev.map((item) => (item.id === id ? response.data.data : item)),
      );

      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      setLoading(true);
      const response = await deleteSchedule({ id });

      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    scheduleList,
    scheduleEmployee,
    setScheduleList,
    loading,
    error,
    handleGetSchedule,
    handleAddSchedule,
    handleGetScheduleByEmployee,
    handleUpdateScheduleEmployee,
    handleDeleteSchedule,
  };
};
