// hooks/useRuteInfo.js
import { useState, useEffect } from "react";
import { hitungRuteDanWaktuMap } from "../lib/utils";
import { data } from "react-router-dom";

export const useRuteInfo = (detailData, type = "survey") => {
  const [ruteInfo, setRuteInfo] = useState([]);
  const [isLoadingRute, setIsLoadingRute] = useState(false);
  const [errorRute, setErrorRute] = useState(null);

  useEffect(() => {
    const fetchRuteInfo = async () => {
      if (!detailData || detailData.length === 0) {
        setRuteInfo({});
        return;
      }
      setIsLoadingRute(true);
      setErrorRute(null);
      let results = [];
      let lat1 = null;
      let lng1 = null;
      let lat2 = null;
      let lng2 = null;
      const latCheckin = detailData[0]?.absensi.check_in_latitude;
      const longCheckin = detailData[0]?.absensi.check_in_longitude;

      // console.log("detailData", detailData);
      // console.log("latCheckin", latCheckin);
      // console.log("longCheckin", longCheckin);
      let total_jarakKm = 0;
      for (let i = 0; i < detailData.length; i++) {
        try {
          if (i == 0) {
            lat1 = latCheckin;
            lng1 = longCheckin;
            lat2 =
              type === "survey"
                ? detailData[i].lat_rumah
                : detailData[i].lat_lokasi;
            lng2 =
              type === "survey"
                ? detailData[i].long_rumah
                : detailData[i].long_lokasi;
          } else {
            lat1 =
              type === "survey"
                ? detailData[i - 1].lat_rumah
                : detailData[i - 1].lat_lokasi;
            lng1 =
              type === "survey"
                ? detailData[i - 1].long_rumah
                : detailData[i - 1].long_lokasi;
            lat2 =
              type === "survey"
                ? detailData[i].lat_rumah
                : detailData[i].lat_lokasi;
            lng2 =
              type === "survey"
                ? detailData[i].long_rumah
                : detailData[i].long_lokasi;
          }
          const info = await hitungRuteDanWaktuMap(lat1, lng1, lat2, lng2);
          const { jarakKm } = info;
          // console.log("jarakKm", parseFloat(jarakKm));
          total_jarakKm += parseFloat(jarakKm);
          results.push(info);
        } catch (error) {
          console.error("Error fetching route:", error);
          setErrorRute(error.message);
          results.push(null);
        }
      }
      // console.log("total_jarakKm", total_jarakKm);

      // console.log("results", results);
      setRuteInfo({
        dataRuteInfo: results,
        total_jarakKm,
      });

      setIsLoadingRute(false);
    };

    fetchRuteInfo();
  }, [detailData, type]);

  return { ruteInfo, isLoadingRute, errorRute };
};
