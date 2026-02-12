import { useState } from "react";
import {
  addJadwalKerja,
  deleteJadwalKerja,
  getJadwalKerja,
  updateJadwalKerja,
} from "../service/JadwalKerjaService";
import { toast } from "sonner";

export const useJadwalKerja = () => {
  const [jadwalKerjaList, setJadwalKerjaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetJadwalKerja = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getJadwalKerja();
      setJadwalKerjaList(response.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJadwalKerja = async (data) => {
    try {
      setLoading(true);
      const response = await addJadwalKerja(data);

      setJadwalKerjaList((prev) => [...prev, response.data.data]);
      toast.success(response.data.message);

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJadwalKerja = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateJadwalKerja({ id, data });

      setJadwalKerjaList((prev) =>
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

  const handleDeleteJadwalKerja = async (id) => {
    try {
      setLoading(true);
      const response = await deleteJadwalKerja({ id });

      setJadwalKerjaList((prev) => prev.filter((item) => item.id !== id));

      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    jadwalKerjaList,
    setJadwalKerjaList,
    loading,
    error,
    handleGetJadwalKerja,
    handleAddJadwalKerja,
    handleUpdateJadwalKerja,
    handleDeleteJadwalKerja,
  };
};
