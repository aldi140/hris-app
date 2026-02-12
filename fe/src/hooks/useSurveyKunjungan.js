import { useState } from "react";
import {
  getSurveyKunjungan,
  getDetailSurvey,
  getDetailKunjungan,
} from "../service/surveyKunjungan";

export const useSurveyKunjungan = () => {
  //  LIST
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [surveyKunjunganList, setSurveyKunjunganList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  //  DETAIL
  const [detailSurvey, setDetailSurvey] = useState(null);
  const [detailKunjungan, setDetailKunjungan] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  //  GET LIST
  const handleGetSurveyKunjungan = async (params = {}) => {
    try {
      setIsloading(true);
      setError(null);

      const response = await getSurveyKunjungan({ page, ...params });
      const { data, message, status, pagination } = response.data;

      if (!status) {
        setSurveyKunjunganList([]);
        setError(message);
        return;
      }

      setPage(pagination.current_page);
      setLastPage(pagination.last_page);
      setTotalData(pagination.total_records);
      setSurveyKunjunganList(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengambil data",
      );
    } finally {
      setIsloading(false);
    }
  };

  // GET DETAIL SURVEY
  const handleGetDetailSurvey = async (params = {}) => {
    console.log("params", params);
    try {
      setLoadingDetail(true);
      const res = await getDetailSurvey(params);
      setDetailSurvey(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  //  GET DETAIL KUNJUNGAN
  const handleGetDetailKunjungan = async (params) => {
    try {
      setLoadingDetail(true);
      const res = await getDetailKunjungan(params);
      setDetailKunjungan(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  return {
    // list
    surveyKunjunganList,
    handleGetSurveyKunjungan,
    isLoading,
    error,
    page,
    setPage,
    lastPage,
    totalData,

    // detail
    detailSurvey,
    detailKunjungan,
    loadingDetail,
    handleGetDetailSurvey,
    handleGetDetailKunjungan,
  };
};
