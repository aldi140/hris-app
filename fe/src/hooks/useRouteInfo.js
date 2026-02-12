// hooks/useRuteInfo.js
import { useState, useEffect } from "react";
import { hitungRuteDanWaktuMap } from "../lib/utils";

export const useRuteInfo = (detailData, type = "survey") => {
  const [ruteInfo, setRuteInfo] = useState([]);
  const [loadingRute, setLoadingRute] = useState(false);
  const [errorRute, setErrorRute] = useState(null);

  useEffect(() => {
    const fetchRuteInfo = async () => {
      if (!detailData || detailData.length === 0) {
        setRuteInfo([]);
        return;
      }

      setLoadingRute(true);
      setErrorRute(null);
      const results = [];

      for (let i = 0; i < detailData.length - 1; i++) {
        try {
          // Ambil field sesuai type
          const lat1 =
            type === "survey"
              ? detailData[i].lat_rumah
              : detailData[i].latitude;
          const lng1 =
            type === "survey"
              ? detailData[i].long_rumah
              : detailData[i].long_rumah;
          const lat2 =
            type === "survey"
              ? detailData[i + 1].lat_rumah
              : detailData[i + 1].latitude;
          const lng2 =
            type === "survey"
              ? detailData[i + 1].long_rumah
              : detailData[i + 1].long_rumah;

          const info = await hitungRuteDanWaktuMap(lat1, lng1, lat2, lng2);
          results.push(info);
        } catch (error) {
          console.error("Error fetching route:", error);
          setErrorRute(error.message);
          results.push(null);
        }
      }

      setRuteInfo(results);
      setLoadingRute(false);
    };

    fetchRuteInfo();
  }, [detailData, type]);

  return { ruteInfo, loadingRute, errorRute };
};
