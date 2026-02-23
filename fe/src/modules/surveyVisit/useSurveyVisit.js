import { useState } from "react";
import {
  getDetailSurvey,
  getDetailVisit,
  getSurveyVisit,
} from "./surveyVisitService";

export const useSurveyVisit = () => {
  //  LIST
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [surveyVisitList, setSurveyVisitList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  //  DETAIL
  const [detailSurvey, setDetailSurvey] = useState(null);
  const [detailVisit, SetdetailVisit] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  //  GET LIST
  const handleGetSurveyVisit = async (params = {}) => {
    try {
      setIsloading(true);
      setError(null);

      const response = await getSurveyVisit({ page, ...params });
      const { data, message, status, pagination } = response.data;

      if (!status) {
        setSurveyVisitList([]);
        setError(message);
        return;
      }

      setPage(pagination.current_page);
      setLastPage(pagination.last_page);
      setTotalData(pagination.total_records);
      setSurveyVisitList(data);
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
  const handleGetdetailVisit = async (params) => {
    try {
      setLoadingDetail(true);
      const res = await getDetailVisit(params);
      SetdetailVisit(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  return {
    // list
    surveyVisitList,
    handleGetSurveyVisit,
    isLoading,
    error,
    page,
    setPage,
    lastPage,
    totalData,

    // detail
    detailSurvey,
    detailVisit,
    loadingDetail,
    handleGetDetailSurvey,
    handleGetdetailVisit,
  };
};
