import { useState } from "react";
import { getAttendance } from "./AttendanceService";

export const useAttendance = () => {
  const [listAttendances, setListAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const handleGetAttendance = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAttendance(params);
      const { data, message, status, pagination } = response.data;

      if (!status) {
        setListAttendances([]);
        setError(message);
        return [];
      }

      setPage(pagination.current_page);
      setLastPage(pagination.last_page);
      setTotalData(pagination.total_records);
      setListAttendances(data);
    } catch (error) {
      // console.log(error, "error");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listAttendances,
    isLoading,
    error,
    page,
    setPage,
    lastPage,
    totalData,
    handleGetAttendance,
  };
};
